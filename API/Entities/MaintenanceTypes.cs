namespace API.Entities
{
    public class MaintenanceTypes
    {
        public int MaintenanceId { get; set; }
        public int TypeId { get; set; }
        public Maintenance Maintenance { get; set; }
        public TechnicianType Type { get; set; }
    }
}