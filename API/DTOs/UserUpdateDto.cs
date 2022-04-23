using Microsoft.AspNetCore.Http;

namespace API.DTOs
{
    public class UserUpdateDto
    {
        public string Username { get; set; }
        public string Bio { get; set; }
        public  IFormFile Image { get; set; }
    }
}