using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class TechnicianPutGetDto
    {
        public TechnicianDto Technician { get; set; }
        public IEnumerable<TypeDto> SelectedTypes  { get; set; }
        public IEnumerable<AreaDto> SelectedAreas { get; set; }
        public List<CategoryTypeAllDto> GroupTypes{get;set;}
        public List<AreaDto>  Areas { get; set; }

    }
}