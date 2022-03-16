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
        private IGenericRepository<Article> _articles;

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