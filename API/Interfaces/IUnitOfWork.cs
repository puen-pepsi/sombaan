using System;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IUnitOfWork : IDisposable

    {
        IArticleRepository ArticleRepository{get;}
        ITagRepository TagRepository{get;}
        IGenericRepository<Genre> Genres{get;}
        IGenericRepository<Tag> Tags{get;}
        IGenericRepository<Article> Articles{get;}
         IUserRepository UserRepository {get; }
         IRepository Repository {get;}
        Task<bool> Complete();
        bool HasChanges();
    }
}