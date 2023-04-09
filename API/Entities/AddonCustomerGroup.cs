using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace API.Entities
{
    public class AddonCustomerGroup{
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<AddonCustomer>  AddonCustomers { get; set; }

        public AddonCustomerGroup()
        {
            AddonCustomers = new Collection<AddonCustomer>();
        }
    }
}