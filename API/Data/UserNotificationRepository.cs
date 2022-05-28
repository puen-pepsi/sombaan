using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserNotificationRepository : IUserNotificationRepository
    {
        private readonly DataContext _context;
        public UserNotificationRepository(DataContext context)
        {
            _context = context;

        }
        public async Task<IEnumerable<UserNotification>> GetUserNotificationsFor(int userId)
        {
            return await _context.UserNotifications
                         .Where(un => un.UserId == userId && !un.IsRead)
                         .ToListAsync();
        }
    }
}