using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace API.Entities
{
    public class Maintenance
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public AppUser User { get; set; }
        public string Description { get; set; }
        //Time To Maintenance
        public DateTime CreateAt { get; set; } = DateTime.Now;
        public int AreaId { get; set; }
        public Area Area {get;set;}
        public virtual ICollection<MaintenanceTypes> Types { get; set; }
        public virtual ICollection<PictureWithDetails> Pictures { get; set; }
        // public Maintenance()
        // {
        //     Types = new Collection<MaintenanceTypes>();
        //     Pictures = new Collection<PictureWithDetails>();
        // }
    }
}