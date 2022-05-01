using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class TechnicianDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Bio { get; set; }
        public string PhoneNumber { get; set; }
        public string LineId { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public DateTime CreateAt { get; set; }
        public string PictureUrl { get; set; }
        public List<MultiselectorDto> Types { get; set; }
        public List<MultiselectorDto> Areas { get; set; }
    }
}