using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class MaintenanceDetailType
    {
        public int Id { get; set; }
        public string uuId { get; set; }
        public string Details { get; set; }
        public int? TechnicianTypeId { get; set; }
        public virtual TechnicianType TechnicianType { get; set; }
        public string ParentId { get; set; }
        public virtual DetailTypeWithPrice detailTypeWithPrice { get; set; }
        
    }
}