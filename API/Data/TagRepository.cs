using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class TagRepository : ITagRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public TagRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }
        public void AddTag(Tag tag){
            _context.Tags.Add(tag);
        }
        public async Task<Tag> getTagByName(string name)
        {
            return await _context.Tags.SingleOrDefaultAsync(s => s.Name == name);
        }

        public async Task<List<Tag>> getTagsAll()
        {
            return await _context.Tags.ToListAsync();
        }

        public async Task<ArticleTag> GetArticleTagAsync(int TagId,int ArticleId){
            return await _context.ArticleTags
                    .FirstOrDefaultAsync(x => x.TagId == TagId && x.ArticleId == ArticleId);
        }
    }
}