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
        public ICollection<Photo> Photos { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
        public ICollection<LikedArticle> LikedArticles { get; set; }

        public ICollection<UserLink> FollowedByUser { get; set; }
        public ICollection<UserLink> FollowedUser { get; set; }
        public AppUser()
        {
            FollowedByUser  = new Collection<UserLink>();
            FollowedUser = new Collection<UserLink>();
            LikedArticles = new Collection<LikedArticle>();
            UserRoles = new Collection<AppUserRole>();
            Photos = new Collection<Photo>();
        }

    }
}