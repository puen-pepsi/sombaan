using System;
using API.Entities;

namespace API.DTOs
{
    public class NotificationDto
    {
        public DateTime CreateAt { get;private set; }
        public NotificationType Type { get; private set; }
        public DateTime? OriginalDateTime { get; private set; }
        public string Description { get; private set; }
        public MaintenanceNotificationDto Maintenance { get; private set; }
    }
}