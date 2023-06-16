using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class DetailsTypeCreateDto
    {
        public int TechnicianTypeId { get; set; }
        public string Detail { get; set; }
        public string uuId { get; set; }
        public string parentId { get; set; }
        public List<DetailsTypeCreateDto> SubDetail { get; set; }
    }
}