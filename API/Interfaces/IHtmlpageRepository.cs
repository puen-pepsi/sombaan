using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IHtmlpageRepository
    {
       void AddHtmlPage(HtmlPage htmlPage);
        Task<HtmlPage> GetHtmlPage(int id);
    }
}