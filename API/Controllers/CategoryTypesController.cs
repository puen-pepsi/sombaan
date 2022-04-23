using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CategoryTypesController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public CategoryTypesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }
        [HttpGet] // api/categoryType
        public async Task<ActionResult<List<CategoryTyeDto>>> Get()
        {
            // var categoryType = await _unitOfWork.Repository.SelectAll<tag>();
            var categoryType = await _unitOfWork.CategoryTypes.GetAll();
            return _mapper.Map<List<CategoryTyeDto>>(categoryType);
        }
        [HttpGet("{id}")]
        // [HttpGet("{Id:int}", Name = "getGenre")] // api/categoryType/example
        public async Task<ActionResult<CategoryTyeDto>> Get(int id)
        {
            var categoryType = await _unitOfWork.CategoryTypes.Get(g => g.Id == id);
            if (categoryType == null)
            {
                return NotFound();
            }

            return _mapper.Map<CategoryTyeDto>(categoryType);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody]  CategoryTypeCreateDto CategoryTypeCreateDto)
        {
            var categoryType = _mapper.Map<CategoryType>(CategoryTypeCreateDto);
            await _unitOfWork.CategoryTypes.Insert(categoryType);
            await _unitOfWork.Complete();
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody]CategoryTypeCreateDto CategoryTypeCreateDto )
        {
            var categoryType = _mapper.Map<CategoryType>(CategoryTypeCreateDto);
            categoryType.Id = id;
            _unitOfWork.CategoryTypes.Update(categoryType);
            await _unitOfWork.Complete();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int Id)
        {
            // await _unitOfWork.Repository.DeleteAsync<tag>(tag);
            await _unitOfWork.CategoryTypes.Delete(Id);
            await _unitOfWork.Complete();
            return NoContent();

        }
    }
}