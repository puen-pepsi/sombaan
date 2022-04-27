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
        [Authorize]
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

            _unitOfWork.MaintenanceRepository.addmaintenance(maintenance);
            if (await _unitOfWork.Complete())
            {
                return maintenance.Id;
            }
            return BadRequest("Can not Create maintenance");
        }

    }
}