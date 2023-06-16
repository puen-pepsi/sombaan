using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class DetailTypeWithPrice
    {
        public int Id { get; set; }
        public double Price { get; set; }
        public string Desc { get; set; }
        public int MaintenanceDetailTypeId { get; set; }
        public virtual MaintenanceDetailType MaintenanceDetailType { get; set; }

    }
}