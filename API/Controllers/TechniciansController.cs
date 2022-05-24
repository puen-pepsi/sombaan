using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class TechniciansController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private string container = "technicians";
        private readonly IFileStorageService _fileStorageService;
        private readonly DataContext _context;
        public TechniciansController(DataContext context, IUnitOfWork unitOfWork, IMapper mapper, IFileStorageService fileStorageService)
        {
            _context = context;
            _fileStorageService = fileStorageService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;

        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TechnicianDto>>> GetTechniciansAsync([FromQuery] TechnicianParams technicianParams)
        {
            // var gender = await _unitOfWork.UserRepository.GetUserGender(User.GetUsername());
            technicianParams.CurrentUsername = User.GetUsername();

            var technicians = await _unitOfWork.TechnicianRepository.GetTechnicianAsync(technicianParams);

            Response.AddPaginationHeader(technicians.CurrentPage, technicians.PageSize,
                technicians.TotalCount, technicians.TotalPages);

            return Ok(technicians);
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<TechnicianDto>> Get(int id)
        {
            var technician = await _unitOfWork.TechnicianRepository.GetTechnician(id);
            if (technician == null)
            {
                return NotFound();
            }
            var averageVote = 0.0;
            var userVote = 0;

            if (await _context.Ratings.AnyAsync(x => x.TechnicianId == id))
            {
                averageVote = await _context.Ratings.Where(x => x.TechnicianId == id)
                    .AverageAsync(x => x.Rate);
                
                    var userId = User.GetUserId()??default(int);
                if(userId > 0){
                    var ratingDb = await _context.Ratings.FirstOrDefaultAsync(x => x.TechnicianId == id
                    && x.UserId == userId);

                    if (ratingDb != null)
                    {
                        userVote = ratingDb.Rate;
                    }
                }
            }
            var dto = _mapper.Map<TechnicianDto>(technician);
            dto.AverageVote = averageVote;
            dto.UserVote = userVote;
            return dto;
        }
        [HttpGet("PostGet")]
        public async Task<ActionResult<TechnicianPostGetDto>> PostGet()
        {
            var groupTypes = await getCategory();
            var areas = await _unitOfWork.Areas.GetAll();
            var areasDto = _mapper.Map<List<MultiselectorDto>>(areas);

            return new TechnicianPostGetDto()
            {
                GroupTypes = groupTypes,
                Areas = areasDto
            };
        }
        [HttpPost]
        public async Task<ActionResult<int>> Post([FromForm] TechnicianCreateDto technicianCreateDto)
        {
            var technician = _mapper.Map<Technician>(technicianCreateDto);
            technician.CreateAt = DateTime.Now;
            technician.UserId = User.GetUserId() ?? default(int);
            if (technicianCreateDto.PictureUrl != null)
            {
                technician.PictureUrl = await _fileStorageService.SaveFile(container, technicianCreateDto.PictureUrl);
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
            var categoryList = await _unitOfWork.CategoryTypes.GetAll(null, null, new List<string> { "TechnicianTypes" });
            return _mapper.Map<List<CategoryTypeAllDto>>(categoryList);
        }
    }
}