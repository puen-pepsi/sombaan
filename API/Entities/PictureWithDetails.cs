namespace API.Entities
{
    public class PictureWithDetails
    {
        public int Id { get; set; }
        public string PictureUrl { get; set; }
        public string Description { get; set; }
        public int MaintenanceId { get; set; }
        public Maintenance Maintenance { get; set; }
    }
}