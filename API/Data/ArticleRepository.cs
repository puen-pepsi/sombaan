using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ArticleRepository : IArticleRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ArticleRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }
        public void AddAritcle(Article article)
        {
            _context.Articles.Add(article);
        }
        public async Task<Article> GetArticle(int id)
        {
           return await  _context.Articles
            .Include(u => u.Author).ThenInclude(u => u.Photos)
            .Include(X => X.GenreList).ThenInclude(X => X.Genre)
            .Include(p => p.PhotoArticles)
            .Include(t => t.Taglist).ThenInclude(t => t.Tag)
            .SingleOrDefaultAsync(x => x.Id == id);

        }
         public async Task<PagedList<ArticleDto>> GetArticlesAsync(ArticleParams articleParams)
        {
            var query = _context.Articles.AsQueryable();
            // var query = _context.Articles.Select( x => x);
            if(articleParams.Genre != 0){
                query = query.Where(a => a.GenreList.Select(x => x.GenreId)
                            .Contains(articleParams.Genre));
            }
            
            if(articleParams.search != null){
                query = query.Where(s => s.Title.ToLower().Contains(articleParams.search) 
                    || s.Body.ToLower().Contains(articleParams.search.ToLower())
                    || s.Author.UserName.ToLower().Contains(articleParams.search.ToLower())
                    || s.Taglist.Select(x => x.Tag.Name).Contains(articleParams.search.ToLower()));
            }
            // query = query.Where(x => x.Taglist.Select(y => y.TagId)
            //             .Contains(articleParams.Tag));


            //query = query.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);

            query = articleParams.OrderBy switch
            {
                "created" => query.OrderByDescending(u => u.CreateAt),
                _ => query.OrderBy(u => u.Id)
            };
            query = query.Include(x => x.Author);
            if (articleParams.CurrentUsername is not null)
            {
                query = query.Include(x => x.Author)
                    .ThenInclude(x => x.FollowedUser
                    .Where(fu => fu.FollowedUser.UserName == articleParams.CurrentUsername));
            }
            
            query = query.Include(x => x.LikedArticles
               .Where( y => y.UserName == articleParams.CurrentUsername));

            return await PagedList<ArticleDto>.CreateAsync(query.ProjectTo<ArticleDto>(_mapper
                .ConfigurationProvider,new { CurrentUsername = articleParams.CurrentUsername }).AsNoTracking(), 
                    articleParams.PageNumber, articleParams.PageSize);

        }
        public async Task<Article> GetArticleBySlug(string slug, string username,bool includeRelated = false)
        {
        //   if(includeRelated){
        //     var article = await  _context.Articles
        //     .Include(u => u.Author).ThenInclude(x => x.FollowedUser.Where( fu => fu.FollowedUserId == userId))
        //     .Include(u => u.Author).ThenInclude(u => u.Photos)
        //     .Include(X => X.GenreList).ThenInclude(X => X.Genre)
        //     .Include(p => p.PhotoArticles)
        //     .Include(t => t.Taglist).ThenInclude(t => t.Tag)
        //     .SingleOrDefaultAsync(x => x.Slug == slug);
            
        //      if(userId != null){
        //         article.LikesCount = await _context.LikedArticles.CountAsync(x => x.ArticleId == article.Id);
        //         var Liked = await GetLikedArticleAsync(userId??default(int), article.Id);
        //         article.Liked = Liked != null ? true : false;
        //         article.Followed = await IsFollowingAsync(userId??default(int),article.Author.Id);
        //      }   

            // var comment = await GetCommentsBySlugAsync(slug,userId);
            // article.Comments = comment;

            // var article2 = await _context.Articles
            //                         .Include(x => x.LikedArticles
            //                         .Where( y=> y.UserId == userId)).ToListAsync();
           if(includeRelated){
            var article = await  _context.Articles
            .Include(p => p.PhotoArticles)
            .Include(u => u.Author).ThenInclude(u => u.Photos)
            .Include(X => X.GenreList).ThenInclude(X => X.Genre)
            .Include(t => t.Taglist).ThenInclude(t => t.Tag)
            .Include(u => u.Author).ThenInclude(x => x.FollowedUser.Where( fu => fu.FollowedUser.UserName == username))
            // .Include(x => x.LikedArticles.Where( y => y.UserName == username))
            .Include(x => x.LikedArticles.Where( y => y.UserName == username))
            .SingleOrDefaultAsync(x => x.Slug == slug);

            
            return article;
            // return await _context.Articles
            //         .Include(p => p.PhotoArticles)
            //         .Include(u => u.Author).ThenInclude(u => u.Photos)
            //         .Include(X => X.GenreList).ThenInclude(X => X.Genre)
            //         .Include(t => t.Taglist).ThenInclude(t => t.Tag)
            //         .Select( a => new Article{
            //             Id=a.Id,
            //             Slug=a.Slug,
            //             Title=a.Title,
            //             Description=a.Description,
            //             Body=a.Body,
            //             CreateAt=a.CreateAt,
            //             UpdateAt=a.UpdateAt,
            //             LikesCount=a.LikesCount,
            //             Author = a.Author.FollowedUser.Where( fu => fu.FollowedUser.UserName == username),
            //             GenreList=a.GenreList,
            //             Taglist =a.Taglist,



            //         }).FirstOrDefaultAsync(s => s.Slug == slug);
          }


            return await _context.Articles.SingleOrDefaultAsync(x => x.Slug == slug);
        }
        public void AddArticleComment(Article article,CommentArticle commentArticle)
        {
            article.Comments.Add(commentArticle);
        }   
        public async Task<LikedArticle> GetLikedArticleAsync(int userId, int articleId)
        {
            return await _context.LikedArticles
                .FirstOrDefaultAsync(x => x.UserId == userId && x.ArticleId == articleId);
        }
        public async Task<List<CommentArticle>> GetCommentsBySlugAsync(string slug, string username,int? parentId=null)
        {
            return await _context.CommentArticles.Where(x => x.Article.Slug == slug && x.ParentId == parentId)
                .Include(x => x.UserComment)
                .ThenInclude(x => x.FollowedByUser.Where(fu => fu.FollowedUser.UserName == username))
                .Include( x => x.UserComment)
                .ThenInclude( x => x.Photos.Where(x => x.IsMain))
                .Include( x => x.Liked)
                .ToListAsync();
        }
        public async Task<List<CommentArticle>> GetCommentsAllBySlug(string slug)
        {
            return await _context.CommentArticles.Where(x => x.Article.Slug == slug).ToListAsync();
        }
        public async Task<List<CommentArticle>> GetReplyCommentsBySlugAsync(string slug,string username,int commentId)
        {
            return  await _context.CommentArticles.Where(x=>x.Article.Slug==slug && x.Id == commentId)
                            .Include(x => x.UserComment).ThenInclude(x => x.FollowedByUser.Where(fu => fu.FollowedUser.UserName == username))
                            .Include(x => x.UserComment).ThenInclude(x => x.Photos.Where(x => x.IsMain))
                            .ToListAsync();
        }
        public async Task RemoveCommentAsync(string slug, int commentId, string username)
        {
            var article = await GetArticleBySlug(slug, username,false);

            var comments = await GetCommentsAllBySlug(slug);
            var comment = comments.FirstOrDefault(x => x.Id == commentId);
            article.TotalComments--;
            //comments.Remove(comment);
            _context.CommentArticles.Remove(comment);
            await _context.SaveChangesAsync();
        }


        public async Task<Article> AddFavoriteAsync(string slug, string username)
        {
            var article = await GetArticleBySlug(slug, username,false);

            var articleFavorite = await GetArticleFavoriteAsync(username, article.Id);

            var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == username);
            if (articleFavorite is null)
            {
                var articleliked = new LikedArticle{
                    UserId = user.Id,
                    ArticleId = article.Id,
                    UserName = user.UserName
                };
                _context.LikedArticles.Add(articleliked);
                article.LikesCount++;
                await _context.SaveChangesAsync();
            }

            return article!;
        }
         public async Task<Article> DeleteFavoriteAsync(string slug, string username)
        {
            var article = await GetArticleBySlug(slug, username,false);

            var articleFavorite = await GetArticleFavoriteAsync(username, article.Id);


            if (articleFavorite is not null)
            {

                _context.LikedArticles.Remove(articleFavorite);
                article.LikesCount--;
                await _context.SaveChangesAsync();
            }

            return article!;
        }
            public async Task<LikedArticle> GetArticleFavoriteAsync(string username, int articleId)
            {
                return await _context.LikedArticles
                    .FirstOrDefaultAsync(x => x.UserName == username && x.ArticleId == articleId);
            }
            public async Task<CommentArticle> GetCommentAsync(int commentId)
            {
                return await _context.CommentArticles.FirstOrDefaultAsync(x => x.Id ==commentId);
            }
            public void DeleteLikeComment(LikeCommentArticle likeCommentArticle)
                {
                    _context.LikeCommentArticles.Remove(likeCommentArticle);
                }
            public async Task<LikeCommentArticle> GetLikedCommentAsync(int commentId,int userId)
            {
                return await _context.LikeCommentArticles
                .SingleOrDefaultAsync(x => x.ParentId == commentId && x.UserLikeCommentId == userId);
            }

    }   
}