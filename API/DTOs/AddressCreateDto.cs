namespace API.DTOs
{
    public class AddressCreateDto
    {
        public string AddressAt { get; set; }
        public string Subdistrict { get; set; }
        public string District { get; set; }
        public string Province { get; set; }
        public string Postcode { get; set; }
        public int UserAddressId { get; set; }
    }
}