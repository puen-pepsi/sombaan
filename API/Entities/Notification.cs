using System;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Notification
    {
        protected Notification()
        {

        }
        public int Id { get; private set; }
        public DateTime CreateAt { get;private set; }
        public NotificationType Type { get; private set; }
        public DateTime? OriginalDateTime { get; private set; }
        public string Description { get; private set; }
        [Required]
        public Maintenance Maintenance { get; private set; }

        private Notification(Maintenance maintenance, NotificationType type)
        {
            if (maintenance == null)
                throw new ArgumentNullException("Maintenance is null");

            Maintenance = maintenance;
            CreateAt = DateTime.Now;
            Type = type;

        }

        public static Notification MaintenanceCreate(Maintenance maintenance)
        {
            return new Notification(maintenance,NotificationType.MaintenanceCreate);
        }

        public static Notification MaintenanceUpdated(Maintenance editMaintenance, DateTime editDateTime)
        {
            var notification = new Notification(editMaintenance, NotificationType.MaintenanceUpdate)
            {
                OriginalDateTime = editDateTime,
            };
            return notification;
        }

        public static Notification MaintenanceCancel(Maintenance maintenance)
        {
            return new Notification(maintenance, NotificationType.MaintenanceDelete);
        }
    }
}