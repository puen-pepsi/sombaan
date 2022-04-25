using System.Collections.Generic;

namespace API.Helpers
{
    public class TechnicianParams : PaginationParams
    {
        public string CurrentUsername { get; set; }
        public List<int> Types { get; set; } = null;
        public int Areas { get; set; }
        public string OrderBy { get; set; } = "lastActive";
        public string search { get; set; } = null;
    }
}