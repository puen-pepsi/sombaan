using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public string Bio { get; set; } = string.Empty;
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public DateTime LastActive { get; set; } = DateTime.UtcNow;
        public string LineId { get; set; }
        //PhoneNumber identityUser
        //technician
        public virtual Technician Technician { get; set; }
        public virtual ICollection<Address> Addresses { get; set; }
        public virtual ICollection<Maintenance> Maintenances { get; set; }
        public virtual ICollection<Photo> Photos { get; set; }
        public virtual ICollection<AppUserRole> UserRoles { get; set; }
        public virtual ICollection<LikedArticle> LikedArticles { get; set; }
        public virtual ICollection<UserLink> FollowedByUser { get; set; }
        public virtual ICollection<UserLink> FollowedUser { get; set; }
        public virtual ICollection<UserNotification> UserNotifications { get; set; }
        public AppUser()
        {
            FollowedByUser  = new Collection<UserLink>();
            FollowedUser = new Collection<UserLink>();
            LikedArticles = new Collection<LikedArticle>();
            UserRoles = new Collection<AppUserRole>();
            Photos = new Collection<Photo>();
            Addresses = new Collection<Address>();
            UserNotifications= new Collection<UserNotification>();
        }
         public void Notify(Notification notification)
        {
            UserNotifications.Add(new UserNotification(notification, this));
        }

    }
}