namespace API.Entities
{
    public class MatchTechnician
    {
        public int TechnicianId { get; set; }
        public Technician Technician { get; set; }
        public int MaintenanceId { get; set; }
        public Maintenance Maintenance { get; set; }
    }
}