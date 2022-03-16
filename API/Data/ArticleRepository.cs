using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ArticleRepository : IArticleRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ArticleRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }
        public void AddAritcle(Article article)
        {
            _context.Articles.Add(article);
        }
        public async Task<Article> GetArticle(int id)
        {
           return await  _context.Articles
            .Include(u => u.Author)
            .Include(X => X.GenreList).ThenInclude(X => X.Genre)
            .Include(p => p.PhotoArticles)
            .Include(t => t.Taglist).ThenInclude(t => t.Tag)
            .SingleOrDefaultAsync(x => x.Id == id);

        }
    }
}