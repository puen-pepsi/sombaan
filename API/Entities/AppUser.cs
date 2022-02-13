using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{ 
        public class AppUser : IdentityUser<int>
    {
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public DateTime LastActive { get; set; } = DateTime.UtcNow;
        public ICollection<Photo> Photos { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }

    }
}