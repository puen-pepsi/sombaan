using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class TechnicianPutGetDto
    {
        public TechnicianDto Technician { get; set; }
        public IEnumerable<MultiselectorDto> SelectedTypes  { get; set; }
        public IEnumerable<MultiselectorDto> SelectedAreas { get; set; }
        public List<CategoryTypeAllDto> GroupTypes{get;set;}
        public List<MultiselectorDto>  Areas { get; set; }

    }
}