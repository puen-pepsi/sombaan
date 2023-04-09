using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public NotificationRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }

        public async Task<IEnumerable<Notification>> GetNewNotificationsFor(int userId)
        {
             return await _context.UserNotifications
                .Include(n => n.Notification.Maintenance.Area)
                .Include(n => n.Notification.Maintenance.User)
                .Where(u => u.UserId == userId && !u.IsRead)
                .Select(u => u.Notification)
                .ToListAsync();
        }
    }
}