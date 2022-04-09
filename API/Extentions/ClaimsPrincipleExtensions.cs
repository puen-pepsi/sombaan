using System.Security.Claims;

namespace API.Extensions
{
    public static class ClaimsPrincipleExtensions
    {
        public static string GetUsername(this ClaimsPrincipal user)
        {
            return user.FindFirst(ClaimTypes.Name)?.Value;
        }

        public static int? GetUserId(this ClaimsPrincipal user)
        {
            var result = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if(result == null){
                return null;
            }
            return int.Parse(result);
        }
    }
}