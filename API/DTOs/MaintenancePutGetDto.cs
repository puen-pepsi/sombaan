using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class MaintenancePutGetDto
    {
        public MaintenanceDto Maintenance { get; set; }
        public IEnumerable<MultiselectorDto> SelectedTypes { get; set; }
        public MultiselectorDto SelectedAreas{get;set;}
        public List<CategoryTypeAllDto> GroupTypes{get;set;}
        public List<MultiselectorDto>  Areas { get; set; }

    }
}