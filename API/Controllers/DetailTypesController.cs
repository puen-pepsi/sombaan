using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class DetailTypesController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public DetailTypesController(IUnitOfWork unitOfWork,IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<TechnicianType>> Get(int id)
        {
            return await _unitOfWork.DetailTypesRepository.GetTechnicianType(id);
        }
        [HttpGet("getDetailPrice/{id}")]
        public async Task<ActionResult<DetailTypeWithPrice>> GetDetailPrice(int id)
        {
           return await _unitOfWork.DetailTypesRepository.GetDetailTypeWithPrice(id);
        }
        [HttpGet("group/{typeId}")]
        public async Task<IEnumerable<DetailTypeWithPriceDto>> GetGroup(int typeId)
        {
            return await _unitOfWork.DetailTypesRepository.GetMaintenanceDetailTypeGroup(typeId);
        }
        // [HttpGet("groupwithprice/{typeId}")]
        // public async Task<IEnumerable<DetailTypeWithPriceDto>> GetGroupWithPrice(int typeId)
        // {
        //     var maintenanceGroup = await _unitOfWork.DetailTypesRepository.GetMaintenanceDetailTypeGroup(typeId);
        //     return  _mapper.Map<IEnumerable<DetailTypeWithPriceDto>>(maintenanceGroup);
            
        // }
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] DetailsTypeCreateDto detailsTypeCreateDto)
        {
            //delete Old technicialTypeId
            _unitOfWork.DetailTypesRepository.deleteAllTypeId(detailsTypeCreateDto.TechnicianTypeId);

            foreach(var detail in detailsTypeCreateDto.SubDetail)
            {
                await getChild(detail);
            }

            return Ok();
        }
        [HttpPost("CreatePrice")]
        public async Task<ActionResult> Post([FromBody] DetailTypeWithPriceArray detailTypeWithPriceArray)
        {
            foreach(var detail in detailTypeWithPriceArray.SubDetail)
            {
                await getPriceDesc(detail);
            }
            return Ok();
        }
        private async Task getChild(DetailsTypeCreateDto Detail)
        {
            //add Parent get Id
            var parent = new MaintenanceDetailType{
                uuId = Detail.uuId,
                Details = Detail.Detail,
                TechnicianTypeId = Detail.TechnicianTypeId,
                ParentId = Detail.parentId
            };
            _unitOfWork.DetailTypesRepository.addDetailType(parent);
            if( await _unitOfWork.Complete()){
                if(Detail.SubDetail.Count() > 0){
                    foreach(var item in Detail.SubDetail)
                    {
                        //add child by this.parentId
                        await getChild(item);
                    }
                }
            }
        }
        private async Task getPriceDesc(DetailTypeWithPriceArray detail)
        {
            //check MaintenanceTypeDetailid  in DetailTypewithPrice
            //check price != 0
            if(detail.Price > 0 || detail.Desc != ""){
                var maintenanceDetailType = await _unitOfWork.DetailTypesRepository.GetMaintenanceDetailType(detail.uuId);
                var detailTypeWithPrice = new DetailTypeWithPrice{
                    Price = detail.Price,
                    Desc = detail.Desc,
                    MaintenanceDetailType = maintenanceDetailType
                };
                var itemUpdate = await _unitOfWork.DetailTypesRepository.GetDetailTypePriceById(maintenanceDetailType.Id);
                if(itemUpdate == null){
                    _unitOfWork.DetailTypesRepository.addDetailWithPrice(detailTypeWithPrice);
                }else{
                    _unitOfWork.DetailTypesRepository
                        .updateDetailTypeWithPrice(_mapper.Map(detail,itemUpdate));
                }
                if (!await _unitOfWork.Complete())throw new Exception("Error Detail Price.");

            }
            if(detail.SubDetail.Count() > 0){
                foreach(var item in detail.SubDetail)
                {
                    await getPriceDesc(item);
                }
            }
        }

    }
}