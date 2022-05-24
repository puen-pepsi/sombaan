using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

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
        public DateTime UpdateAt  { get; private set;}
        public DateTime DueDate { get; set; }
        public int AreaId { get; set; }
        public Area Area {get;set;}
        public bool IsCanceled { get; private set; }
        public bool IsCompleted { get; set; }
        public virtual ICollection<MaintenanceTypes> Types { get; set; }
        public virtual ICollection<PictureWithDetails> Pictures { get; set; }
        public virtual ICollection<MatchTechnician> MatchTechnicians { get; set; }
        public Maintenance()
        {
            Types = new Collection<MaintenanceTypes>();
            Pictures = new Collection<PictureWithDetails>();
            MatchTechnicians = new Collection<MatchTechnician>();
        }
        public void Create(){
            var notification = Notification.MaintenanceCreate(this);
            foreach ( var user in MatchTechnicians.Select(a => a.Technician.User))
            {
                user.Notify(notification);
            }
        }
        public void Cancel()
        {
            IsCanceled = true;

            var notification = Notification.MaintenanceCancel(this);

            foreach (var user in MatchTechnicians.Select(a => a.Technician.User))
            {
                user.Notify(notification);

            }
        }
        public void Modify(DateTime dateTime)
        {
            UpdateAt = dateTime;

            var notification = Notification.MaintenanceUpdated(this, dateTime);
            
            foreach (var user in MatchTechnicians.Select(a => a.Technician.User))
            {
                user.Notify(notification);
            }
        }
    }
}