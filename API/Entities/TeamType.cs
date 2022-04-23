namespace API.Entities
{
    public class TeamType
    {
        public int TeamId { get; set; }
        public TechnicianTeam Team { get; set; }
        public int TypeId { get; set; }
        public TechnicType Type { get; set; }
    }
}