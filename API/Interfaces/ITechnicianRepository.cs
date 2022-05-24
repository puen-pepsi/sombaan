using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ITechnicianRepository
    {
         void addTechnician(Technician techinician);
         Task<Technician> GetTechnician(int id);
         Task<PagedList<TechnicianDto>> GetTechnicianAsync(TechnicianParams technicianParams);
         Task<List<Technician>> GetTechniciansMatch(List<int> types);
    }
}