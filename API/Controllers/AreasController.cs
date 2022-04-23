using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AreasController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public AreasController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }
        [HttpGet] // api/area
        public async Task<ActionResult<List<AreaDto>>> Get()
        {
            // var area = await _unitOfWork.Repository.SelectAll<tag>();
            var area = await _unitOfWork.Areas.GetAll();
            return _mapper.Map<List<AreaDto>>(area);
        }
        [HttpGet("{Id}")]
        // [HttpGet("{Id:int}", Name = "getGenre")] // api/area/example
        public async Task<ActionResult<AreaDto>> Get(int Id)
        {
            // var tag = await  _unitOfWork.Repository.SelectById<tag>(Id);
            var area = await _unitOfWork.Areas.Get(g => g.Id == Id);
            if (area == null)
            {
                return NotFound();
            }

            return _mapper.Map<AreaDto>(area);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody]  AreaCreateDto areaCreateDto)
        {
            var area = _mapper.Map<Area>(areaCreateDto);
            // await _unitOfWork.Repository.CreateAsync<tag>(tag);
            await _unitOfWork.Areas.Insert(area);
            await _unitOfWork.Complete();
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody]AreaCreateDto areaCreateDto )
        {
            var area = _mapper.Map<Area>(areaCreateDto);
            area.Id = id;
            _unitOfWork.Areas.Update(area);
            await _unitOfWork.Complete();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int Id)
        {
            // await _unitOfWork.Repository.DeleteAsync<tag>(tag);
            await _unitOfWork.Areas.Delete(Id);
            await _unitOfWork.Complete();
            return NoContent();

        }
    }
}