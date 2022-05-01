using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AddressesController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public AddressesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<int>> Post([FromForm] AddressCreateDto addressCreateDto)
        {
            addressCreateDto.UserAddressId = User.GetUserId()??default(int);
            var address = _mapper.Map<Address>(addressCreateDto);
            await _unitOfWork.Addresses.Insert(address);
            if(await _unitOfWork.Complete()){
                return address.Id;
            }
            return BadRequest("Error Create Address");
        }
        [HttpGet("getProvince")]
        public async Task<ActionResult<List<MultiselectorDto>>> getProvince()
        {
            var province = await _unitOfWork.Provinces.GetAll();
            return _mapper.Map<List<MultiselectorDto>>(province);
        }
        [HttpGet("getAmphure/{provinceid}")]
        public async Task<ActionResult<List<MultiselectorDto>>> getAmphure(int provinceid)
        {
            var amphure = await _unitOfWork.Amphures.GetAll(q => q.ProvinceId == provinceid);
            return _mapper.Map<List<MultiselectorDto>>(amphure);
        }
        [HttpGet("getDistrict/{amphureid}")]
        public async Task<ActionResult<List<DistrictDto>>> getDistrict(int amphureid)
        {
            var district = await _unitOfWork.Districts.GetAll(q => q.AmphureId == amphureid);
            return _mapper.Map<List<DistrictDto>>(district);
        }


    }
}