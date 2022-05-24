using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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

        public void DeleteMatchTech(int maintenanceId)
        {
            var getMatchTechList = _context.MatchTechnicians.Where(x => x.MaintenanceId == maintenanceId).ToList();
            _context.MatchTechnicians.RemoveRange(getMatchTechList);
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
         public async Task<PagedList<MaintenanceDto>> GetMaintenanceAsync(MaintenanceParams maintenanceParams)
        {
            var query = _context.Maintenances.AsQueryable();
            // var query = _context.Technicians.Select( x => x);
            query = query.Include(x => x.Types);
            if(maintenanceParams.Types != null){
                maintenanceParams.Types.ForEach(ele => {
                    query = query.Where(a => a.Types.Select(x => x.TypeId)
                            .Contains(ele));
                });     
            }
              if(maintenanceParams.Areas != 0){
                query = query.Where( a => a.AreaId == maintenanceParams.Areas);
            }
            query = query.Include(y => y.MatchTechnicians);

            if(!string.IsNullOrEmpty(maintenanceParams.search)){
                query = query.Where(
                    s => s.User.UserName.ToLower().Contains(maintenanceParams.search) 
                    || s.Types.Select(x => x.Type.Name).Contains(maintenanceParams.search));
            }

            query = maintenanceParams.OrderBy switch
            {
                "created" => query.OrderByDescending(u => u.CreateAt),
                _ => query.OrderBy(u => u.Id)
            };
   

            return await PagedList<MaintenanceDto>.CreateAsync(query.ProjectTo<MaintenanceDto>(_mapper
                .ConfigurationProvider).AsNoTracking(), 
                    maintenanceParams.PageNumber, maintenanceParams.PageSize);

        }

        public async Task<Maintenance> GetMaintenanceWithTechnicians(int id)
        {
            return await _context.Maintenances
                            .Include(x => x.MatchTechnicians)
                            .ThenInclude(y => y.Technician)
                            .ThenInclude( u => u.User)
                            .SingleOrDefaultAsync( m => m.Id == id);
        }
    }
}