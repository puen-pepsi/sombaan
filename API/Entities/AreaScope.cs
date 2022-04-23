namespace API.Entities
{
    public class AreaScope
    {
        public int AreaId { get; set; }
        public Area Area { get; set; }
        public int TechnicianId { get; set; }
        public Technician Technician { get; set; }
    }
}