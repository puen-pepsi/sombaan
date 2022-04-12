using System.Collections.Generic;
using System.Linq;
using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // string CurrentUsername = null;
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src =>
                    src.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<Photo, PhotoDto>();
            CreateMap<RegisterDto, AppUser>();
            CreateMap<HtmlPage,HtmlPageCreationDto>().ReverseMap();
            CreateMap<HtmlPage,HtmlPageDto>().ReverseMap();
            CreateMap<GenreDto, Genre>().ReverseMap();
            CreateMap<GenreCreateDto, Genre>();
            CreateMap<TagDto, Tag>().ReverseMap();
            CreateMap<TagCreateDto, Tag>();
            CreateMap<CommentArticle, ArticleCommentDto>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.UserComment.UserName))
                .ForMember(d => d.liked, o => o.MapFrom(s => s.Liked.Select(x => x.UserLikeComment.UserName)))
                .ForMember(d => d.Followed,o=> o.MapFrom( f => f.UserComment.FollowedByUser.Any()))
                .ForMember(d => d.Image, ex => ex.MapFrom(src => src.UserComment.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<ArticleCommentCreateDto,CommentArticle>().ReverseMap();    
            CreateMap<ArticleCreationDto,Article>()
                .ForMember(dest => dest.PhotoArticles,opt => opt.Ignore())
                .ForMember(dest => dest.Slug,opt => opt.MapFrom(MapSlug))
                .ForMember(dest => dest.GenreList,opt => opt.MapFrom(MapArticleGenre))
                .ForMember(dest => dest.Taglist,opt => opt.Ignore());
            CreateMap<Article,ArticleDto>()
                .ForMember(dest => dest.Liked,opt => opt.MapFrom(src => src.LikedArticles.Any()))
                .ForMember(dest => dest.Genres,opt => opt.MapFrom(src => src.GenreList))
                .ForMember(dest => dest.Tags,opt => opt.MapFrom(src => src.Taglist))
                .ForMember(dest => dest.Photos,opt=> opt.MapFrom(src => src.PhotoArticles))
                .ForMember(dest => dest.Author,opt => opt.MapFrom(src => src.Author));
                
            CreateMap<ArticleGenre, GenreDto>()
                .ForMember(dest => dest.Id,opt => opt.MapFrom(src => src.GenreId))
                .ForMember(dest => dest.Name,opt => opt.MapFrom(src => src.Genre.Name));
            CreateMap<ArticleTag, TagDto>()
                .ForMember(dest => dest.Id,opt => opt.MapFrom(src => src.TagId))
                .ForMember(dest => dest.Name,opt => opt.MapFrom(src => src.Tag.Name));
            CreateMap<PhotoArticle,PhotoDto>()
                .ForMember(dest => dest.Id,opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Url,opt => opt.MapFrom(src => src.Url))
                .ForMember(dest => dest.IsMain,opt => opt.MapFrom(src => src.IsMain));
            CreateMap<AppUser,ProfileDto>()
                .ForMember(dest =>dest.Username,opt=>opt.MapFrom(y=>y.UserName))
                .ForMember(dest=>dest.Bio,opt=>opt.MapFrom(y => y.Bio))
                .ForMember(dest => dest.Image,opt=>opt.MapFrom(y=> y.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(dest => dest.Following,opt => opt.MapFrom(y=>y.FollowedUser.Any()));
        }   
        private List<TagDto> MapTagDto(Article article,ArticleDto articledto)
        {
            var result = new List<TagDto>();
            if(article.Taglist != null){
                foreach(var tag in article.Taglist){
                    result.Add(new TagDto(){
                        Id=tag.TagId,Name=tag.Tag.Name
                    });
                }
            }
            return result;
        }
        private ProfileDto MapAuthorDto(Article article ,ArticleDto articledto)
        {
            // return  new ProfileDto(
            //           article.Author.UserName,
            //           article.Author.Bio,
            //           article.Author.Photos.FirstOrDefault(x => x.IsMain).Url,
            //           article.Followed
            // );
            return new ProfileDto(){
                Username= article.Author.UserName,
                Bio=article.Author.Bio,
                Image=article.Author.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                Following = article.Author.FollowedUser.Any()
            };
        }
        private List<PhotoDto> MapPhotoDto(Article article ,ArticleDto articledto)
        {
            var result = new List<PhotoDto>();
                if(article.PhotoArticles != null){
                    foreach(var photo in article.PhotoArticles){
                        result.Add(new PhotoDto(){
                            Id=photo.Id,Url=photo.Url,IsMain=photo.IsMain
                        });
                    }
                }
            return result;
        }
        private List<GenreDto> MapGenresDto(Article article , ArticleDto articledto)
        {
            var result = new List<GenreDto>();
                if(article.GenreList != null){
                    foreach(var genre in article.GenreList){
                        result.Add(new GenreDto(){ 
                            Id=genre.GenreId,Name=genre.Genre.Name
                        });
                    }
                }
            return result;
        }
        private List<ArticleGenre> MapArticleGenre(ArticleCreationDto articleCreationDto, Article article)
        {
            var result = new List<ArticleGenre>();

            if (articleCreationDto.GenresIds == null) { return result; }

            foreach (var id in articleCreationDto.GenresIds)
            {
                result.Add(new ArticleGenre() { GenreId = id });
            }

            return result;
        }
        private string MapSlug(ArticleCreationDto articleCreationDto,Article article)
        {
            string result = "";
            if(articleCreationDto.Title == null){return result;}
            result = articleCreationDto.Title.GenerateSlug();
            return result; 
        }
    }
}