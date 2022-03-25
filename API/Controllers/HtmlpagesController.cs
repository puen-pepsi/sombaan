using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class HtmlpagesController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public HtmlpagesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;

        }
        [HttpGet("putget/{id:int}")]
        public async Task<ActionResult<HtmlPageDto>> putget(int id)
        {
            var htmlpage = await  _unitOfWork.HtmlpageRepository.GetHtmlPage(id);
            if(htmlpage == null){
                return NotFound();
            }
            var dto = _mapper.Map<HtmlPageDto>(htmlpage);

            return dto;
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post([FromForm] HtmlPageCreationDto htmlPageCreationDto)
        {
           
            var htmlpage = _mapper.Map<HtmlPage>(htmlPageCreationDto);
            //Add Author
             _unitOfWork.HtmlpageRepository.AddHtmlPage(htmlpage);
             await _unitOfWork.Complete();
             return htmlpage.Id;
        }

         [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] HtmlPageCreationDto htmlPageCreationDto)
        {
            var htmlpage = await _unitOfWork.HtmlpageRepository.GetHtmlPage(id);
            if (htmlpage == null)
            {
                return NotFound();
            }

            htmlpage = _mapper.Map(htmlPageCreationDto, htmlpage);
            await _unitOfWork.Complete();
            return NoContent();
        }
    }
}