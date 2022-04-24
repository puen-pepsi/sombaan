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
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TechnicianDto>>> GetTechniciansAsync([FromQuery] TechnicianParams technicianParams)
        {
            // var gender = await _unitOfWork.UserRepository.GetUserGender(User.GetUsername());
            technicianParams.CurrentUsername = User.GetUsername();

            var articles = await _unitOfWork.TechnicianRepository.GetTechnicianAsync(technicianParams);

            Response.AddPaginationHeader(articles.CurrentPage, articles.PageSize,
                articles.TotalCount, articles.TotalPages);

            return Ok(articles);
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<TechnicianDto>> Get(int id)
        {   
            var technician = await  _unitOfWork.TechnicianRepository.GetTechnician(id);
            if(technician == null){
                return NotFound();
            }
            
            var dto = _mapper.Map<TechnicianDto>(technician);
            
            return dto;
        }
        [HttpGet("PostGet")]
        public async Task<ActionResult<TechnicianPostGetDto>> PostGet()
        {
            var groupTypes = await getCategory();
            var areas = await _unitOfWork.Areas.GetAll();
            var areasDto = _mapper.Map<List<AreaDto>>(areas);

            return new TechnicianPostGetDto() { 
                GroupTypes = groupTypes,
                Areas = areasDto
            };
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
         [HttpGet("putget/{id:int}")]
        public async Task<ActionResult<TechnicianPutGetDto>> PutGet(int id)
        {
            var technicianResult = await Get(id);
            if (technicianResult.Result is NotFoundResult) { return NotFound(); }

            var techinician = technicianResult.Value;

            var postgetDto = await PostGet();

            var response = new TechnicianPutGetDto();
            response.Technician = techinician;
            response.SelectedTypes = techinician.Types;
            response.GroupTypes = postgetDto.Value.GroupTypes;
            response.SelectedAreas = techinician.Areas;
            response.Areas = postgetDto.Value.Areas;
            return response;
        }
        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] TechnicianCreateDto technicianCreateDto)
        {
            var technician = await _unitOfWork.TechnicianRepository.GetTechnician(id);

            if (technician == null)
            {
                return NotFound();
            }

            technician = _mapper.Map(technicianCreateDto, technician);
             
            if (technicianCreateDto.PictureUrl != null)
            {
                technician.PictureUrl = await _fileStorageService.EditFile(container, technicianCreateDto.PictureUrl,
                    technician.PictureUrl);
            }

            await _unitOfWork.Complete();
            return NoContent();
        }
        [HttpGet("Category")]
        public async Task<List<CategoryTypeAllDto>> getCategory()
        {
            var categoryList =  await _unitOfWork.CategoryTypes.GetAll(null,null,new List<string> {"TechnicianTypes"});
            return _mapper.Map<List<CategoryTypeAllDto>>(categoryList);
        } 
    }
}