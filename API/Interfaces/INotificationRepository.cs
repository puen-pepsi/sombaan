using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface INotificationRepository
    {
         Task<IEnumerable<Notification>> GetNewNotificationsFor(int userId);
    }
}