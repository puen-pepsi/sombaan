using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class DetailTypeWithPriceDto
    {
        public int Id { get; set; }
        public string uuId { get; set; }
        public string Details { get; set; }
        public int? TechnicianTypeId { get; set; }
        public string ParentId { get; set; }
        public double? Price { get; set; }
        public string Desc { get; set; }
    }
}