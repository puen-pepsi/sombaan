using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class DetailTypeWithPriceArray
    {
        public int TechnicianTypeId { get; set; }
        public string Detail { get; set; }
        public string uuId { get; set; }
        public string parentId { get; set; }
        public double Price { get; set; }
        public string Desc { get; set; }
        public List<DetailTypeWithPriceArray> SubDetail { get; set; }
    }
}