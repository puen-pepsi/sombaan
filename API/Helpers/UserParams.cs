namespace API.Helpers
{
    public class UserParams : PaginationParams
    {
        public string CurrentUsername { get; set; }
        public int Genre { get; set; }
        public int Tag { get; set; }
        public string Author { get; set; }
        public string OrderBy { get; set; } = "lastActive";
    }
}