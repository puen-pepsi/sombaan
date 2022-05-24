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
    public class TechnicianRepository : ITechnicianRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public TechnicianRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }
        public void addTechnician(Technician techinician)
        {
            _context.Add(techinician);
        }
        public async Task<Technician> GetTechnician(int id)
        {
           return await  _context.Technicians
                        .Include(x => x.TechType).ThenInclude( y => y.Type)
                        .Include( x => x.AreaScopes).ThenInclude( y => y.Area)
                        .SingleOrDefaultAsync(x => x.Id == id);
        }
        public async Task<PagedList<TechnicianDto>> GetTechnicianAsync(TechnicianParams technicianParams)
        {
            var query = _context.Technicians.AsQueryable();
            // var query = _context.Technicians.Select( x => x);
            query = query.Include(x => x.TechType);
            query = query.Include(x => x.AreaScopes);
            if(technicianParams.Types != null){
                // query = query.Where(a => a.TechType.Select(x => x.TypeId)
                //             .Contains(technicianParams.Types));
                // query = query.Where( t => t.TechType
                //         .Any(c => technicianParams.Types.Contains(c.TypeId)));
                technicianParams.Types.ForEach(ele => {
                    query = query.Where(a => a.TechType.Select(x => x.TypeId)
                            .Contains(ele));
                });     
            }
              if(technicianParams.Areas != 0){
                query = query.Where( a => a.AreaScopes.Select(x => x.AreaId)
                     .Contains(technicianParams.Areas));
            }
            if(!string.IsNullOrEmpty(technicianParams.search)){
                query = query.Where(s => s.FullName.ToLower().Contains(technicianParams.search) 
                    || s.TechType.Select(x => x.Type.Name).Contains(technicianParams.search));
            }

            query = technicianParams.OrderBy switch
            {
                "created" => query.OrderByDescending(u => u.CreateAt),
                _ => query.OrderBy(u => u.Id)
            };
   
            // query = query.Include(x => x.Author);
            // if (articleParams.CurrentUsername is not null)
            // {
            //     query = query.Include(x => x.Author)
            //         .ThenInclude(x => x.FollowedUser
            //         .Where(fu => fu.FollowedUser.UserName == articleParams.CurrentUsername));
            // }
            
            // query = query.Include(x => x.LikedArticles
            //    .Where( y => y.UserName == articleParams.CurrentUsername));

            return await PagedList<TechnicianDto>.CreateAsync(query.ProjectTo<TechnicianDto>(_mapper
                .ConfigurationProvider,new { CurrentUsername = technicianParams.CurrentUsername }).AsNoTracking(), 
                    technicianParams.PageNumber, technicianParams.PageSize);

        }

        public Task<List<Technician>> GetTechniciansMatch(List<int> types)
        {
            var query = _context.Technicians.AsQueryable();
            // var query = _context.Technicians.Select( x => x);
            query = query.Include(u => u.User);
            query = query.Include(x => x.TechType);
            if(types != null){
                types.ForEach(ele => {
                    query = query.Where(a => a.TechType.Select(x => x.TypeId)
                            .Contains(ele));
                }); 
            }    
            return query.ToListAsync();
        }
    }
}