using System.Collections.Generic;

namespace API.Entities
{
    public class TechnicianTeam
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string HeadOffice { get; set; }
        public int ContractPersonId { get; set; }
        public ICollection<TeamType> TeamTypes { get; set; }
        public ICollection<TechTeams> TechTeams { get; set; }
    }
}