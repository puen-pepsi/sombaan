using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class MaintenanceDto
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string Description { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime DueDate { get; set; }
        public int AreaId {get;set;}
        public string AreaName { get; set; }
        public List<MultiselectorDto> Types{get;set;}
        public List<PictureWithDetialsDto> Pictures { get; set; }
        public List<MathTechnicianDto> MatchTechnicians { get; set; }
    }
}