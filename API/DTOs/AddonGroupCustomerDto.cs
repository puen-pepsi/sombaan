using System.Collections.Generic;

namespace API.DTOs
{
    public class AddonGroupCustomerDto
    {
         public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<AddonCustomerDto>  AddonCustomers { get; set; }
    }
}