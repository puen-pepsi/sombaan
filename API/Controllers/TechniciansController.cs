using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TechniciansController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private string container = "technicians";
        private readonly IFileStorageService _fileStorageService;
        public TechniciansController(IUnitOfWork unitOfWork, IMapper mapper, IFileStorageService fileStorageService)
        {
            _fileStorageService = fileStorageService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;

        }
        [HttpGet("PostGet")]
        public async Task<ActionResult<TechnicianPostGetDto>> PostGet()
        {

            var types = await _unitOfWork.TechnicianTypes.GetAll();
            var areas = await _unitOfWork.Areas.GetAll();
            var typesDto = _mapper.Map<List<TypeDto>>(types);
            var areasDto = _mapper.Map<List<AreaDto>>(areas);

            return new TechnicianPostGetDto() { Types = typesDto, Areas = areasDto };
        }
        [HttpPost]
        public async Task<ActionResult<int>> Post([FromForm] TechnicianCreateDto technicianCreateDto)
        {
            var technician = _mapper.Map<Technician>(technicianCreateDto);
            technician.CreateAt = DateTime.Now;
            technician.UserId = User.GetUserId()??default(int);
            if (technicianCreateDto.PictureUrl != null)
            {
                technician.PictureUrl = await _fileStorageService.SaveFile(container,technicianCreateDto.PictureUrl);
            }
            _unitOfWork.TechnicianRepository.addTechnician(technician);
            if (await _unitOfWork.Complete())
            {
                return technician.Id;
            }
            return BadRequest("Can not Create Technician");
        }
    }
}