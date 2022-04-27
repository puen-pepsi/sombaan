using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IMaintenanceRepository
    {
          void addmaintenance(Maintenance maintenance);
         Task<Maintenance> GetMaintenance(int id);
    }
}