using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Rating
    {
        public int Id { get; set; }
        
        [Range(1, 5)]
        public int Rate { get; set; }
        public int TechnicianId { get; set; }
        public Technician Technician { get; set; }
        public int UserId { get; set; }
        public AppUser User { get; set; }
    }
}