using System.Collections.Generic;

namespace API.DTOs
{
    public class TechnicianPostGetDto
    {
         public List<TypeDto> Types { get; set; }
        public List<AreaDto>  Areas { get; set; }
    }
}