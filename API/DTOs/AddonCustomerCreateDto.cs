namespace API.DTOs
{
    public class AddonCustomerCreateDto
    {
        public string Name { get; set; }
        public string Descriptions{ get; set; }
        public int  Price { get; set; }
        public int AddonStateId { get; set; }
    }
}