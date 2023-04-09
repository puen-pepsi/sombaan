using System.Collections.Generic;

namespace API.Entities
{
    public class AddonState{
    
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<AddonCustomer> AddonCustomers { get; set; }
        public virtual ICollection<AddonTechnicial> AddonTechnicials { get; set; }
    }
}