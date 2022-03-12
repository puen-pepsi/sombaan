using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class GenreCreateDto
    {
        [Required(ErrorMessage = "The field with {0} is required")]
        [StringLength(50)]
        public string Name { get; set; }
    }
}