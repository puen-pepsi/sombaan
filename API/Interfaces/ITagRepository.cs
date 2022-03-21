using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface ITagRepository
    {
         Task<List<Tag>> getTagsAll();
         Task<Tag> getTagByName(string name);
        void AddTag(Tag tag);
        Task<ArticleTag> GetArticleTagAsync(int TagId, int ArticleId);
    }
}