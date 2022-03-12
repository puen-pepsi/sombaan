using System;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IUnitOfWork : IDisposable

    {
        IGenericRepository<Genre> Genres{get;}
        IGenericRepository<Tag> Tags{get;}
         IUserRepository UserRepository {get; }
         IRepository Repository {get;}
        Task<bool> Complete();
        bool HasChanges();
    }
}