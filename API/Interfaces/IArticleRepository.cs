using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IArticleRepository
    {
        void AddAritcle(Article article);
        void AddArticleComment(Article article, CommentArticle commentArticle);
        Task<Article> GetArticle(int id);
        Task<PagedList<ArticleDto>> GetArticlesAsync(ArticleParams articleParams);
        Task<Article> GetArticleBySlug(string slug,string username,bool includeRelated);
        Task<List<CommentArticle>> GetReplyCommentsBySlugAsync(string slug,string username,int commentId);
        Task<List<CommentArticle>> GetCommentsBySlugAsync(string slug, string username,int? parentId);
        Task<List<CommentArticle>> GetCommentsAllBySlug(string slug);
        Task<LikedArticle> GetLikedArticleAsync(int userId, int articleId);
        Task<bool> IsFollowingAsync(int userId, int followerUserId);
        Task RemoveCommentAsync(string slug, int commentId, string username);
        Task<LikedArticle> GetArticleFavoriteAsync(string username, int articleId);
        Task<Article> AddFavoriteAsync(string slug, string username);
        Task<Article> DeleteFavoriteAsync(string slug, string username);
        Task<CommentArticle> GetCommentAsync(int commentId);
        Task<LikeCommentArticle> GetLikedCommentAsync(int commentId, int userId);
        void DeleteLikeComment(LikeCommentArticle likeCommentArticle);

    }
}