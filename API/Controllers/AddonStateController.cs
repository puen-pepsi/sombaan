using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AddonStateController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public AddonStateController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;

        }
        [HttpGet] // api/AddonState
        public async Task<ActionResult<List<AddonStateDto>>> Get()
        {
            var addonStates = await _unitOfWork.AddonState.GetAll();
            return _mapper.Map<List<AddonStateDto>>(addonStates);
        }
        [HttpGet("{Id}")]
        // [HttpGet("{Id:int}", Name = "getGenre")] // api/genres/example
        public async Task<ActionResult<AddonStateDto>> Get(int Id)
        {
            // var genre = await  _unitOfWork.Repository.SelectById<Genre>(Id);
            var addonState = await _unitOfWork.AddonState.Get(g => g.Id == Id);
            if (addonState == null)
            {
                return NotFound();
            }

            return _mapper.Map<AddonStateDto>(addonState);
        }
         [HttpPost]
        public async Task<ActionResult> Post([FromBody] AddonStateCreateDto addonStateCreateDto)
        {
            var addonStateCreate = _mapper.Map<AddonState>(addonStateCreateDto);
            await _unitOfWork.AddonState.Insert(addonStateCreate);
            await _unitOfWork.Complete();
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody] AddonStateCreateDto addonStateCreateDto)
        {
            var addonState = _mapper.Map<AddonState>(addonStateCreateDto);
            addonState.Id = id;
            _unitOfWork.AddonState.Update(addonState);
            await _unitOfWork.Complete();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int Id)
        {
            var addonState =  _unitOfWork.AddonState.Delete(Id);
            await _unitOfWork.Complete();
            return NoContent();

        }
    }
}