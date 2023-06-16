using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class DetailTypeCreateDto
    {
        public string uuId { get; set; }
        public string Details { get; set; }
        public int? TechnicianTypeId { get; set; }
        public string ParentId { get; set; }
    }
}