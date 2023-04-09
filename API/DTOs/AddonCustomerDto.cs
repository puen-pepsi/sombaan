namespace API.DTOs
{
    public class AddonCustomerDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Descriptions{ get; set; }
        public int  Price { get; set; }
        public int AddonStateId { get; set; }
    }
}