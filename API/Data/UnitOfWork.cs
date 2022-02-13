using System.Threading.Tasks;
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
        public UnitOfWork(DataContext context, IMapper mapper, IConfiguration config)
        {
            _config = config;
            _context = context;
            _mapper = mapper;
        }

        public IUserRepository UserRepository => new UserRepository(_context, _mapper);

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }
    }
}