using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IMaintenanceRepository
    {
          void addmaintenance(Maintenance maintenance);
         Task<Maintenance> GetMaintenance(int id);
         Task<Maintenance> GetMaintenanceWithTechnicians(int id);
         Task<PagedList<MaintenanceDto>> GetMaintenanceAsync(MaintenanceParams maintenanceParams);
        void DeleteMatchTech(int maintenanceId);
    }
}