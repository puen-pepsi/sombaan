using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class MaintenancesController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IFileStorageService _fileStorageService;
        private string container = "maintenance";
        public MaintenancesController(IUnitOfWork unitOfWork, IMapper mapper, IFileStorageService fileStorageService)
        {
            _fileStorageService = fileStorageService;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MaintenanceDto>>> GetMaintenanceAsync([FromQuery] MaintenanceParams maintenanceParams)
        {
            // var gender = await _unitOfWork.UserRepository.GetUserGender(User.GetUsername());
            maintenanceParams.CurrentUsername = User.GetUsername();

            var maintenances = await _unitOfWork.MaintenanceRepository.GetMaintenanceAsync(maintenanceParams);

            Response.AddPaginationHeader(maintenances.CurrentPage, maintenances.PageSize,
                maintenances.TotalCount, maintenances.TotalPages);

            return Ok(maintenances);
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<MaintenanceDto>> Get(int id)
        {   
            var maintenance = await  _unitOfWork.MaintenanceRepository.GetMaintenance(id);
            if(maintenance == null){
                return NotFound();
            }
            
            var dto = _mapper.Map<MaintenanceDto>(maintenance);
            
            return dto;
        }
        [HttpGet("PostGet")]
        public async Task<ActionResult<MaintenancePostGetDto>> PostGet()
        {
            var groupTypes = await getCategory();
            var areas = await _unitOfWork.Areas.GetAll();
            var areasDto = _mapper.Map<List<MultiselectorDto>>(areas);

            return new MaintenancePostGetDto() { 
                GroupTypes = groupTypes,
                Areas = areasDto
            };
        }
        [HttpPost]
        public async Task<ActionResult<int>> Post([FromForm] MaintenanceCreateDto maintenanceCreateDto)
        {   
             
            maintenanceCreateDto.UserId = User.GetUserId()??default(int);
            var maintenance = _mapper.Map<Maintenance>(maintenanceCreateDto);
            if (maintenanceCreateDto.Pictures != null)
            {
                var listImage = new List<PictureWithDetails>();
                foreach(var file in maintenanceCreateDto.Pictures){
                    var pathDb = await _fileStorageService.SaveFile(container,file);
                    listImage.Add(new PictureWithDetails{PictureUrl=pathDb });
                }
                maintenance.Pictures = listImage;
            }

                   //match technician by types => add to MatchTechnician
                var techMatch = await _unitOfWork.TechnicianRepository.GetTechniciansMatch(maintenanceCreateDto.TypeIds);
                foreach(var math in techMatch){
                     maintenance.MatchTechnicians.Add(new MatchTechnician(){
                            Maintenance = maintenance,
                            Technician = math
                    });
                }        
                
            _unitOfWork.MaintenanceRepository.addmaintenance(maintenance);
            maintenance.Create();
            if (await _unitOfWork.Complete())
            {

                return maintenance.Id;
            }
            return BadRequest("Can not Create maintenance");
        }
       [HttpGet("putget/{id:int}")]
        public async Task<ActionResult<MaintenancePutGetDto>> PutGet(int id)
        {
            var maintenanceResult = await Get(id);
            if (maintenanceResult == null) { return NotFound(); }
            var maintenance = maintenanceResult.Value;
            var postgetDto = await PostGet();
            var response = new MaintenancePutGetDto();
            response.Maintenance = maintenance;
            response.SelectedTypes = maintenance.Types;
            response.GroupTypes = postgetDto.Value.GroupTypes;
            response.SelectedAreas = new MultiselectorDto(){
                Id=maintenance.AreaId,
                Name=maintenance.AreaName
            };
            response.Areas = postgetDto.Value.Areas;
            return response;
        }
       [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] MaintenanceCreateDto maintenanceCreateDto)
        {
            var maintenance  = await _unitOfWork.MaintenanceRepository.GetMaintenance(id);

            if (maintenance == null)
            {
                return NotFound();
            }
            maintenanceCreateDto.UserId = maintenance.UserId;
            
            maintenance = _mapper.Map(maintenanceCreateDto, maintenance);
              //remove ole photolist
            if(maintenance.Pictures != null && maintenanceCreateDto.Pictures != null){
                foreach(var file in maintenance.Pictures){
                  await  _fileStorageService.DeleteFile(file.PictureUrl,container);
                }
                maintenance.Pictures = null;
            }
            
            if (maintenanceCreateDto.Pictures != null)
            {
                var listImage = new List<PictureWithDetails>();
                foreach(var file in maintenanceCreateDto.Pictures){
                    var getUrl = await _fileStorageService
                        .EditFile(container,file,file.FileName);
                    listImage.Add(new PictureWithDetails{
                        MaintenanceId=maintenance.Id,
                        PictureUrl=getUrl,
                        Description = null
                    });  
                }
                maintenance.Pictures = listImage;
            }
               _unitOfWork.MaintenanceRepository.DeleteMatchTech(maintenance.Id);
                var techMatch = await _unitOfWork.TechnicianRepository.GetTechniciansMatch(maintenanceCreateDto.TypeIds);
                foreach(var math in techMatch){
                     maintenance.MatchTechnicians.Add(new MatchTechnician(){
                            Maintenance = maintenance,
                            Technician = math
                    });
                }  
            if(await _unitOfWork.Complete()){
                 DateTime localDate = DateTime.Now;
                 maintenance.Modify(localDate);
                 if(await _unitOfWork.Complete())return Ok();
            }

            return BadRequest("Maintenance Update Error");
        }
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> cancel(int id)
        {
             var userId = User.GetUserId();

            var maintenance = await _unitOfWork.MaintenanceRepository
                                .GetMaintenanceWithTechnicians(id);

            if (maintenance == null || maintenance.IsCanceled)
                return NotFound();

            maintenance.Cancel();
            if(await _unitOfWork.Complete())return Ok();

            return BadRequest("Can not Cancel Maintenace");
        }
        [HttpGet("Category")]
        public async Task<List<CategoryTypeAllDto>> getCategory()
        {
            var categoryList =  await _unitOfWork.CategoryTypes.GetAll(null,null,new List<string> {"TechnicianTypes"});
            return _mapper.Map<List<CategoryTypeAllDto>>(categoryList);
        } 
    }
}