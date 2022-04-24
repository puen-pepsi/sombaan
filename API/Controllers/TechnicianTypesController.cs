using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TechnicianTypesController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public TechnicianTypesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;

        }
         [HttpGet] // api/categoryType
        public async Task<ActionResult<List<TechnicianTypeDto>>> Get()
        {
            // var categoryType = await _unitOfWork.Repository.SelectAll<tag>();
            var technicianTypes = await _unitOfWork.TechnicianTypes.GetAll(null,null,new List<string> { "CategoryType" });
            return _mapper.Map<List<TechnicianTypeDto>>(technicianTypes);
        }
        [HttpGet("{id}")]
        // [HttpGet("{Id:int}", Name = "getGenre")] // api/categoryType/example
        public async Task<ActionResult<TechnicianTypeDto>> Get(int id)
        {
            var technicianType = await _unitOfWork.TechnicianTypes.Get(g => g.Id == id);
            if (technicianType == null)
            {
                return NotFound();
            }

            return _mapper.Map<TechnicianTypeDto>(technicianType);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody]  TechnicianTypeCreateDto technicianTypeCreateDto)
        {
            var technicianType = _mapper.Map<TechnicianType>(technicianTypeCreateDto);
            await _unitOfWork.TechnicianTypes.Insert(technicianType);
            await _unitOfWork.Complete();
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody]TechnicianTypeCreateDto technicianTypeCreateDto )
        {
            var technicianType = _mapper.Map<TechnicianType>(technicianTypeCreateDto);
            technicianType.Id = id;
            _unitOfWork.TechnicianTypes.Update(technicianType);
            await _unitOfWork.Complete();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int Id)
        {
            // await _unitOfWork.Repository.DeleteAsync<tag>(tag);
            await _unitOfWork.TechnicianTypes.Delete(Id);
            await _unitOfWork.Complete();
            return NoContent();

        }

    }
}