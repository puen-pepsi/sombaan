namespace API.Entities
{
    public class Address{
    
        public int Id { get; set; }
        public string AddressAt { get; set; }
        public string Subdistrict { get; set; }
        public string District { get; set; }
        public string Province { get; set; }
        public string Postcode { get; set; }
        public int UserAddressId { get; set; }
        public AppUser UserAddress { get; set; }
    }
}