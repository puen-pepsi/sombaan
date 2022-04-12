namespace API.Helpers
{
    public class ArticleParams : PaginationParams
    {
        public string CurrentUsername { get; set; }
        public int Genre { get; set; }
        public int Tag { get; set; }
        public string OrderBy { get; set; } = "lastActive";
        public string search { get; set; }
    }
}