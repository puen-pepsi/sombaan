using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RatingDto
    {
        [Range(1, 5)]
        public int Rating { get; set; }
        public int TechnicianId { get; set; }
    }
}