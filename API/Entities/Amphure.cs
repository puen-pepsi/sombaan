using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Amphure
    {
        public int Id { get; set; }
        public int  Code { get; set; }
        [StringLength(150)]
        public string Name_th { get; set; }
        [StringLength(150)]
        public string Name_en { get; set; }
        public int ProvinceId { get; set; }
        public Province Province { get; set; }
    }
}