using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace API.Entities
{
    public class CategoryType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<TechnicianType> TechnicianTypes { get; set; }
        public CategoryType()
        {
            TechnicianTypes = new Collection<TechnicianType>();
        }
    }
}