namespace API.DTOs
{
    public class TechnicianTypeDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CategoryTypeId { get; set; }
        public string CategoryTypeName { get; set; }
    }
}