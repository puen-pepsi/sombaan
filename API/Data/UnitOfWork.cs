using System;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.Extensions.Configuration;

namespace API.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IConfiguration _config;
        private IGenericRepository<Genre> _genres;
        private IGenericRepository<Tag> _tags;
        private IGenericRepository<Address> _Addresses;
        private IGenericRepository<Province> _Provinces;
        private IGenericRepository<Amphure> _Amphures;
        private IGenericRepository<District> _Districts;
        private IGenericRepository<Area> _Areas;
        private IGenericRepository<CategoryType> _CategoryTypes;
        private IGenericRepository<TechnicianType> _TechnicianTypes;
        private IGenericRepository<Article> _articles;
        private GenericRepository<Rating> _Ratings;

        public UnitOfWork(DataContext context, IMapper mapper, IConfiguration config)
        {
            _config = config;
            _context = context;
            _mapper = mapper;
        }

        public IUserRepository UserRepository => new UserRepository(_context, _mapper);
        public IRepository Repository => new Repository<DataContext>(_context);

        public IGenericRepository<Genre> Genres=> _genres ??= new GenericRepository<Genre>(_context);
        public IGenericRepository<Tag> Tags=> _tags ??= new GenericRepository<Tag>(_context);

        public IGenericRepository<Article> Articles => _articles ??=new GenericRepository<Article>(_context);

        public IArticleRepository ArticleRepository => new ArticleRepository(_context,_mapper);

        public ITagRepository TagRepository =>  new TagRepository(_context,_mapper);

        public IHtmlpageRepository HtmlpageRepository =>  new HtmlPageRepository(_context,_mapper);

        public IGenericRepository<Address> Addresses => _Addresses ??= new GenericRepository<Address>(_context);
        public IGenericRepository<Area> Areas => _Areas ??= new GenericRepository<Area>(_context);

        public IGenericRepository<CategoryType> CategoryTypes => _CategoryTypes ??= new GenericRepository<CategoryType>(_context);

        public IGenericRepository<TechnicianType> TechnicianTypes => _TechnicianTypes??= new GenericRepository<TechnicianType>(_context);

        public ITechnicianRepository TechnicianRepository =>  new TechnicianRepository(_context,_mapper);

        public IMaintenanceRepository MaintenanceRepository => new MaintenanceRepository(_context,_mapper);
        public IGenericRepository<Province> Provinces => _Provinces ??=new GenericRepository<Province>(_context);

        public IGenericRepository<Amphure> Amphures => _Amphures?? new GenericRepository<Amphure>(_context);
        public IGenericRepository<District> Districts => _Districts?? new GenericRepository<District>(_context);

        public IGenericRepository<Rating> Ratings => _Ratings?? new GenericRepository<Rating>(_context);

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Dispose()
        {
             _context.Dispose();
            GC.SuppressFinalize(this);
        }

        public bool HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }
    }
}