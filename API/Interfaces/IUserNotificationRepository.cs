using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserNotificationRepository
    {
        Task<IEnumerable<UserNotification>> GetUserNotificationsFor(int userId);
    }
}