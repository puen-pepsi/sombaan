using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class HtmlPageRepository : IHtmlpageRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public HtmlPageRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }
        public void AddHtmlPage(HtmlPage htmlPage)
        {
            _context.HtmlPages.Add(htmlPage);
        }

        public async Task<HtmlPage> GetHtmlPage(int id)
        {
            return await _context.HtmlPages
                        .SingleOrDefaultAsync( X => X.Id == id);
        }
    }
}