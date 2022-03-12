using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Tag
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "The field with {0} is required")]
        [StringLength(50)]
        public string Name { get; set; }
        public virtual ICollection<ArticleTag> ArticleATagList { get; set; }
        public Tag()
        {
            ArticleATagList = new Collection<ArticleTag>();
        }
    }
}