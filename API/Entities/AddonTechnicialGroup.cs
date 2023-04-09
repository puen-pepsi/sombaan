using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace API.Entities
{
    public class AddonTechnicialGroup
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<AddonTechnicial>  AddonTechnicials { get; set; }

        public AddonTechnicialGroup()
        {
            AddonTechnicials = new Collection<AddonTechnicial>();
        }
    }
}