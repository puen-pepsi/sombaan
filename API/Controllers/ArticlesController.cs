using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    public class ArticlesController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly ILogger<GenresController> _logger;
        private readonly IFileStorageService _fileStorageService;
        private string container = "articles";
        public ArticlesController(ILogger<GenresController> logger,
        IFileStorageService fileStorageService,
        IUnitOfWork unitOfWork, IMapper mapper,
        DataContext context)
        {
            _fileStorageService = fileStorageService;
            _mapper = mapper;
            _context = context;
            _logger = logger;
            _unitOfWork = unitOfWork;

        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArticlesDto>>> GetArtilcesAsync([FromQuery] ArticleParams articleParams)
        {
            // var gender = await _unitOfWork.UserRepository.GetUserGender(User.GetUsername());
            articleParams.CurrentUsername = User.GetUsername();

            var articles = await _unitOfWork.ArticleRepository.GetArticlesAsync(articleParams);

            Response.AddPaginationHeader(articles.CurrentPage, articles.PageSize,
                articles.TotalCount, articles.TotalPages);

            return Ok(articles);
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<ArticleDto>> Get(int id)
        {   
            var article = await  _unitOfWork.ArticleRepository.GetArticle(id);
            if(article == null){
                return NotFound();
            }
            
            var dto = _mapper.Map<ArticleDto>(article);
            
            return dto;
        }
        [HttpGet("{slug}")]
        public async Task<ActionResult<ArticleDto>> getslug(string slug)
        {
            var username = User.GetUsername()??"lisa";
            var article = await  _unitOfWork.ArticleRepository.GetArticleBySlug(slug,username,true);
            if(article == null){
                return NotFound();
            }

            var dto = _mapper.Map<ArticleDto>(article);

            return dto;
        }
        [HttpGet("PostGet")]
        public async Task<ActionResult<ArticlePostGetDto>> PostGet()
        {

            var genres = await _unitOfWork.Genres.GetAll();
            var tags = await _unitOfWork.TagRepository.getTagsAll();
            var TagDto = _mapper.Map<List<TagDto>>(tags);
            var genresDTO = _mapper.Map<List<GenreDto>>(genres);

            return new ArticlePostGetDto() { Genres = genresDTO, Tags = TagDto };
        }
        [HttpPost]
        public async Task<ActionResult<int>> Post([FromForm] ArticleCreationDto articleCreationDto)
        {
            var article = _mapper.Map<Article>(articleCreationDto);
            article.CreateAt = DateTime.Now;
            article.AuthorId = User.GetUserId()??default(int);
            //Add Author
            
            var Taglist = new List<ArticleTag>();

            if (articleCreationDto.PhotoList != null)
            {
                var listImage = new List<PhotoArticle>();
                listImage = await _fileStorageService.SaveMultiFile(container, articleCreationDto.PhotoList);
                article.PhotoArticles = listImage;
                // foreach(var image in listImage){
                //     article.PhotoArticles.Add(image);
                // }
            }

            _unitOfWork.ArticleRepository.AddAritcle(article);
           if(await _unitOfWork.Complete()) {
                article.Taglist = await getTag(articleCreationDto.TagsIds,article);
                await _unitOfWork.Complete();
            }
                return article.Id;
        }
        [HttpGet("putget/{id:int}")]
        public async Task<ActionResult<ArticlePutGetDto>> PutGet(int id)
        {
            var ArticleResult = await Get(id);
            if (ArticleResult.Result is NotFoundResult) { return NotFound(); }

            var article = ArticleResult.Value;

            var genresSelectedIds = article.Genres.Select(x => x.Id).ToList();
            var nonSelectedGenres = await _context.Genres.Where( x => 
                     !genresSelectedIds.Contains(x.Id))
                     .ToListAsync();
        
            var tagsSelectedIds = article.Tags.Select(x => x.Id).ToList();
            var nonSelectedTags = await _context.Tags.Where( x => 
                    !tagsSelectedIds.Contains(x.Id))
                    .ToListAsync();
            //Photolist 

            var nonSelectedGenresDTOs = _mapper.Map<List<GenreDto>>(nonSelectedGenres);
            var nonSelectedTagsDTOs  =  _mapper.Map<List<TagDto>>(nonSelectedTags);

            var response = new ArticlePutGetDto();
            response.Article = article;
            response.SelectedGenres = article.Genres;
            response.NonSelectedGenres = nonSelectedGenresDTOs;
            response.SelectedTags = article.Tags.Select(x => x.Name).ToList();
            response.NonSelectedTags = nonSelectedTagsDTOs.Select(x => x.Name).ToList();
            return response;
        }
        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] ArticleCreationDto articleCreationDto)
        {
            var article = await _unitOfWork.ArticleRepository.GetArticle(id);
            if (article == null)
            {
                return NotFound();
            }

            article = _mapper.Map(articleCreationDto, article);
            article.AuthorId = 1;
            //remove ole photolist
            if(article.PhotoArticles != null && articleCreationDto.PhotoList == null){
                foreach(var file in article.PhotoArticles){
                  await  _fileStorageService.DeleteFile(file.Url,container);
                }
                article.PhotoArticles = null;
            }
            
            if (articleCreationDto.PhotoList != null)
            {
                var listImage = new List<PhotoArticle>();
                foreach(var file in articleCreationDto.PhotoList){
                    var getUrl = await _fileStorageService
                        .EditFile(container,file,file.FileName);
                    listImage.Add(new PhotoArticle{
                        ArticleId=article.Id,
                        Url=getUrl
                    });  
                }
                article.PhotoArticles = listImage;
            }
            article.Taglist = await getTag(articleCreationDto.TagsIds,article);

            await _unitOfWork.Complete();
            return NoContent();
        }
        
       [Authorize]
        [HttpPost("{slug}/favorite")]
        public async Task<ActionResult> FavoriteBySlugAsync(string slug)
        {
            var username = User.GetUsername();
            var article = await _unitOfWork.ArticleRepository.AddFavoriteAsync(slug,username);
            return Ok();
        }

        [Authorize]
        [HttpDelete("{slug}/favorite")]
        public async Task<ActionResult> UnFavoriteBySlugAsync(string slug)
        {
            var username = User.GetUsername();
            var article = await _unitOfWork.ArticleRepository.DeleteFavoriteAsync(slug, username);
            return Ok();
        }
        private async Task<List<ArticleTag>> getTag(List<string> tagList,Article article){
               var TagList = new List<ArticleTag>();
               if(tagList.Count == 0){
                   return TagList;
               }
                //var Alltag = await _unitOfWork.TagRepository.getTagsAll();
                var dbTags = await _unitOfWork.TagRepository.getDbTags(tagList);
                foreach (string tag in tagList)
                {
                    if(!dbTags.Exists(t => t.Name.ToLower().Trim() == tag.ToLower().Trim())){
                        var addTag = new Tag{Name = tag};
                            _unitOfWork.TagRepository.AddTag(addTag);
                        //Add article
                        TagList.Add( new ArticleTag{
                            Tag = addTag,
                            Article = article
                        });
                    }else{
                    
                        var tagAdd = await _unitOfWork.TagRepository.getTagByName(tag);
                        TagList.Add(new ArticleTag{
                            Tag = tagAdd,
                            Article = article
                        });
                    }
                }
                return TagList;
        }


    }

}