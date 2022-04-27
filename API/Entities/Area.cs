using System.Collections.Generic;

namespace API.Entities
{
    public class Area
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Maintenance> Maintenances { get; set; }
        
    }
}