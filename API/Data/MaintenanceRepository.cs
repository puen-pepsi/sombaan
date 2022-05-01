using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class MaintenanceRepository : IMaintenanceRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public MaintenanceRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }
        public void addmaintenance(Maintenance maintenance)
        {
            _context.Maintenances.Add(maintenance);
        }

        public async Task<Maintenance> GetMaintenance(int id)
        {
            return await _context.Maintenances
                        .Include(x=>x.Area)
                        .Include(a=> a.User)
                        .Include(t=>t.Types).ThenInclude( y => y.Type)
                        .Include(p=>p.Pictures)
                        .SingleOrDefaultAsync(m => m.Id==id);
        }
    }
}