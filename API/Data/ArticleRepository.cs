using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using AutoMapper;
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
            .Include(u => u.Author)
            .Include(X => X.GenreList).ThenInclude(X => X.Genre)
            .Include(p => p.PhotoArticles)
            .Include(t => t.Taglist).ThenInclude(t => t.Tag)
            .SingleOrDefaultAsync(x => x.Id == id);

        }
        public async Task<Article> GetArticleBySlug(string slug, int userId,bool includeRelated = false)
        {
          if(includeRelated){
            var article = await  _context.Articles
            .Include(u => u.Author).ThenInclude(u => u.Photos)
            .Include(X => X.GenreList).ThenInclude(X => X.Genre)
            .Include(p => p.PhotoArticles)
            .Include(t => t.Taglist).ThenInclude(t => t.Tag)
            .SingleOrDefaultAsync(x => x.Slug == slug);
             if(userId > 0){
                article.LikesCount = await _context.LikedArticles.CountAsync(x => x.ArticleId == article.Id);
                var Liked = await GetLikedArticleAsync(userId, article.Id);
                article.Liked = Liked != null ? true : false;
                article.Followed = await IsFollowingAsync(userId,article.Author.Id);
                
             }   

            // var comment = await GetCommentsBySlugAsync(slug,userId);
            // article.Comments = comment;
            return article;
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
        public async Task<List<CommentArticle>> GetCommentsBySlugAsync(string slug, int userId,int? parentId)
        {
            return await _context.CommentArticles.Where(x => x.Article.Slug == slug && x.ParentId == parentId)
                .Include(x => x.UserComment)
                .ThenInclude(x => x.FollowedByUser.Where(fu => fu.FollowedUserId == userId))
                .Include( x => x.UserComment)
                .ThenInclude( x => x.Photos.Where(x => x.IsMain))
                .Include( x => x.Liked)
                .ToListAsync();
        }
        public async Task<List<CommentArticle>> GetReplyCommentsBySlugAsync(string slug,int userId,int commentId)
        {
            return  await _context.CommentArticles.Where(x=>x.Article.Slug==slug && x.Id == commentId)
                            .Include(x => x.UserComment).ThenInclude(x => x.FollowedByUser.Where(fu => fu.FollowedUserId == userId))
                            .Include(x => x.UserComment).ThenInclude(x => x.Photos.Where(x => x.IsMain))
                            .ToListAsync();
        }
        public async Task RemoveCommentAsync(string slug, int commentId, int userId,int? parentId)
        {
            var article = await GetArticleBySlug(slug, userId,false);

            var comments = await GetCommentsBySlugAsync(slug, userId, parentId);
            var comment = comments.FirstOrDefault(x => x.Id == commentId);

            //comments.Remove(comment);
            _context.CommentArticles.Remove(comment);
            await _context.SaveChangesAsync();
        }
        public Task<bool> IsFollowingAsync(int userId, int followerUserId)
        {
            return _context.FollowedUser.AnyAsync(
                x => x.SourceUserId == userId && x.FollowedUserId == followerUserId);
        }

        public async Task<Article> AddFavoriteAsync(string slug, int userId)
        {
            var article = await GetArticleBySlug(slug, userId,false);

            var articleFavorite = await GetArticleFavoriteAsync(userId, article.Id);


            if (articleFavorite is null)
            {
                var articleliked = new LikedArticle{
                    UserId = userId,
                    ArticleId = article.Id,
                };
                _context.LikedArticles.Add(articleliked);
                article.LikesCount++;
                await _context.SaveChangesAsync();
            }

            return article!;
        }
         public async Task<Article> DeleteFavoriteAsync(string slug, int userId)
        {
            var article = await GetArticleBySlug(slug, userId,false);

            var articleFavorite = await GetArticleFavoriteAsync(userId, article.Id);


            if (articleFavorite is not null)
            {

                _context.LikedArticles.Remove(articleFavorite);
                article.LikesCount--;
                await _context.SaveChangesAsync();
            }

            return article!;
        }
            public async Task<LikedArticle> GetArticleFavoriteAsync(int userId, int articleId)
            {
                return await _context.LikedArticles
                    .FirstOrDefaultAsync(x => x.UserId  == userId && x.ArticleId == articleId);
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