using System.Collections.Generic;

namespace API.DTOs
{
    public class TechnicianPostGetDto
    {
        public List<CategoryTypeAllDto> GroupTypes{get;set;}
        public List<MultiselectorDto>  Areas { get; set; }
    }
}