using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using AutoMapper;

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

        public Task<Maintenance> GetMaintenance(int id)
        {
            throw new System.NotImplementedException();
        }
    }
}