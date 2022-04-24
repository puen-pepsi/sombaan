namespace API.Helpers
{
    public class TechnicianParams : PaginationParams
    {
        public string CurrentUsername { get; set; }
        public int Type { get; set; }
        public int Area { get; set; }
        public string OrderBy { get; set; } = "lastActive";
        public string search { get; set; }
    }
}