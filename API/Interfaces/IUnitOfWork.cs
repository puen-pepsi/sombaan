using System;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IUnitOfWork : IDisposable

    {
        IArticleRepository ArticleRepository{get;}
        ITagRepository TagRepository{get;}
        IHtmlpageRepository HtmlpageRepository{get;}
        IGenericRepository<Address> Addresses{get;}
        IGenericRepository<Genre> Genres{get;}
        IGenericRepository<Tag> Tags{get;}
        IGenericRepository<Article> Articles{get;}
        IGenericRepository<Area> Areas{get;}
        IGenericRepository<Province> Provinces{get;}
        IGenericRepository<Amphure> Amphures{get;}
        IGenericRepository<District> Districts{get;}
        IGenericRepository<CategoryType> CategoryTypes{get;}
        IGenericRepository<TechnicianType> TechnicianTypes{get;}
        IGenericRepository<Rating> Ratings{get;}
        ITechnicianRepository TechnicianRepository{get;}
        IMaintenanceRepository MaintenanceRepository{get;}
        IUserRepository UserRepository {get; }
         IRepository Repository {get;}
        Task<bool> Complete();
        bool HasChanges();
    }
}