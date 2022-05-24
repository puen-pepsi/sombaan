using System;

namespace API.Entities
{
    public class UserNotification
    {
        public int UserId { get; set; }
        //Link Technician
        public AppUser User { get; set; }
        public int NotificationId { get; set; }
        public Notification Notification { get; set; }
        public bool  IsRead { get; set; }

        protected UserNotification()
        {

        }

        public UserNotification(Notification notification, AppUser user)
        {
            if (notification == null)
                throw new ArgumentNullException("User");
            if (user == null)
                throw new ArgumentNullException("Notification");

            Notification = notification;
            User = user;
        }

        public void Read()
        {
            IsRead = true;
        }
    }
}