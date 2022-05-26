using System;

namespace API.DTOs
{
    public class MaintenanceNotificationDto
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string Description { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
        public DateTime DueDate { get; set; }
        public string AreaName { get; set; }
        public bool IsCanceled { get; set; }
        public bool IsCompleted { get; set; }
    }
}