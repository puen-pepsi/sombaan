using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class DetailTypeWithPriceCreateDto
    {
        public double Price { get; set; }
        public string Desc { get; set; }
        public int MaintenanceDetailTypeId { get; set; }
    }
}