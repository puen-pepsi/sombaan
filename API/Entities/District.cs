using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class District
    {
        public int Id { get; set; }
        public int ZipCode { get; set; }
        [StringLength(150)]
        public string Name_th { get; set; }
        [StringLength(150)]
        public string Name_en { get; set; }
        public int AmphureId { get; set; }
        public Amphure Amphure { get; set; }
    }
}