using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class TechnicianType
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int CategoryTypeId { get; set; }
        public CategoryType CategoryType { get; set; }
    }
}