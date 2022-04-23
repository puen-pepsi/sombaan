namespace API.Entities
{
    public class TechType
    {
        public int TechnicianId { get; set; }
        public Technician Technician { get; set; }
        public int TypeId { get; set; }
        public TechnicianType Type { get; set; }
    }
}