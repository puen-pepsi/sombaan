namespace API.Entities
{
    public class TechTeams
    {
        public int TechnicianId { get; set; }
        public Technician Technician{get;set;}
        public int TeamId { get; set; }
        public TechnicianTeam Team { get; set; }
    }
}