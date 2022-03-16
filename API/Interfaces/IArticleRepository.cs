using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IArticleRepository
    {
        void AddAritcle(Article article);
        Task<Article> GetArticle(int id);
    }
}