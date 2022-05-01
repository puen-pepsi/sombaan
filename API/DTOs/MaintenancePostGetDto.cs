using System.Collections.Generic;

namespace API.DTOs
{
    public class MaintenancePostGetDto
    {
        public List<CategoryTypeAllDto> GroupTypes{get;set;}
        public List<MultiselectorDto>  Areas { get; set; }
    }
}