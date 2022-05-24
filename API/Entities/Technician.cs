using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Technician
    {
        public int UserId { get; set; }
        public virtual AppUser User { get; set; }
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Bio { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string PhoneNumber { get; set; }
        public string LineId { get; set; }
        public DateTime CreateAt { get; set; }
        public string PictureUrl { get; set; }
        public ICollection<TechType> TechType { get; set; }
        //Area
        public ICollection<AreaScope> AreaScopes { get; set; }
        //public ICollection<TechTeams> TechTeams { get; set; }
        public ICollection<MatchTechnician> MatchTechnicians { get; set; }
        public Technician()
        {
            TechType = new Collection<TechType>();
            AreaScopes = new Collection<AreaScope>();
            MatchTechnicians = new Collection<MatchTechnician>();
        }
    }
}