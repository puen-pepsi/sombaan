using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IArticleRepository
    {
        void AddAritcle(Article article);
        void AddArticleComment(Article article, CommentArticle commentArticle);
        Task<Article> GetArticle(int id);
        Task<Article> GetArticleBySlug(string slug,int userId,bool includeRelated);
        Task<List<CommentArticle>> GetReplyCommentsBySlugAsync(string slug,int userId,int commentId);
        Task<List<CommentArticle>> GetCommentsBySlugAsync(string slug, int userId,int? parentId);
        Task<LikedArticle> GetLikedArticleAsync(int userId, int articleId);
        Task<bool> IsFollowingAsync(int userId, int followerUserId);
        Task RemoveCommentAsync(string slug, int commentId, int userId,int? parentId);
        Task<LikedArticle> GetArticleFavoriteAsync(int userId, int articleId);
        Task<Article> AddFavoriteAsync(string slug, int userId);
        Task<Article> DeleteFavoriteAsync(string slug, int userId);
        Task<CommentArticle> GetCommentAsync(int commentId);
        Task<LikeCommentArticle> GetLikedCommentAsync(int commentId, int userId);
        void DeleteLikeComment(LikeCommentArticle likeCommentArticle);

    }
}