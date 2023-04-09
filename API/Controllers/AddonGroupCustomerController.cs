using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AddonGroupCustomerController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public AddonGroupCustomerController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;

        }
         [HttpGet] 
        public async Task<ActionResult<List<AddonCustomerDto>>> Get()
        {
            var addonCustomer = await _unitOfWork.AddonCustomer.GetAll();
            return _mapper.Map<List<AddonCustomerDto>>(addonCustomer);
        }
        [HttpGet("{Id}")]
        public async Task<ActionResult<AddonCustomerDto>> Get(int Id)
        {
            var addonCustomer = await _unitOfWork.AddonCustomer.Get(g => g.Id == Id);
            if (addonCustomer == null)
            {
                return NotFound();
            }

            return _mapper.Map<AddonCustomerDto>(addonCustomer);
        }
         [HttpPost]
        public async Task<ActionResult> Post([FromBody] AddonCustomerCreateDto addonCustomerCreateDto)
        {
            var addonCustomerCreate = _mapper.Map<AddonCustomer>(addonCustomerCreateDto);
            await _unitOfWork.AddonCustomer.Insert(addonCustomerCreate);
            await _unitOfWork.Complete();
            return NoContent();
        }
        [HttpPost("searchByName")]
        public async Task<ActionResult<List<AddonCustomerDto>>> SearchByName([FromBody] string name)
        {
            if (string.IsNullOrWhiteSpace(name)) { return new List<AddonCustomerDto>(); }
            // return await context.Actors
            //     .Where(x => x.Name.Contains(name))
            //     .OrderBy(x => x.Name)
            //     .Select(x => new ActorsMovieDTO { Id = x.Id, Name = x.Name, Picture = x.Picture })
            //     .Take(5)
            //     .ToListAsync();
            var addonCustomer = await _unitOfWork.AddonCustomer.Get(g => g.Name.Contains(name));
            return _mapper.Map<List<AddonCustomerDto>>(addonCustomer);
        }
        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody] AddonCustomerCreateDto addonCustomerCreateDto)
        {
            var addonCustomerEdit = _mapper.Map<AddonCustomer>(addonCustomerCreateDto);
            addonCustomerEdit.Id = id;
            _unitOfWork.AddonCustomer.Update(addonCustomerEdit);
            await _unitOfWork.Complete();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int Id)
        {
            var addonCustomer =  _unitOfWork.AddonCustomer.Delete(Id);
            await _unitOfWork.Complete();
            return NoContent();

        }
    }
}