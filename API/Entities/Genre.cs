using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Genre
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "The field with {0} is required")]
        [StringLength(10)]
        public string Name { get; set; }
    }
}