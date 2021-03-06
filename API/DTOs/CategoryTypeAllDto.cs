using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class CategoryTypeAllDto
    {
        public string Name { get; set; }
        public List<MultiselectorDto> types { get; set; }
    }
}