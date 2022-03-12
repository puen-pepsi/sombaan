using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    public class TagsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<TagsController> _logger;
        private readonly IMapper _mapper;

        public TagsController(ILogger<TagsController> logger,
        IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _logger = logger;
            _unitOfWork = unitOfWork;

        }
    [HttpGet] // api/Tags
    public async Task<ActionResult<List<TagDto>>> Get()
    {
        _logger.LogInformation("Getting all the ags");

        // var Tags = await _unitOfWork.Repository.SelectAll<tag>();
        var Tags = await _unitOfWork.Tags.GetAll();
        return _mapper.Map<List<TagDto>>(Tags);
    }
    [HttpGet("{Id}")]
    // [HttpGet("{Id:int}", Name = "getGenre")] // api/Tags/example
    public async Task<ActionResult<TagDto>> Get(int Id)
    {
        // var tag = await  _unitOfWork.Repository.SelectById<tag>(Id);
        var tag = await _unitOfWork.Tags.Get(g => g.Id == Id);
        if (tag == null)
        {
            return NotFound();
        }

        return _mapper.Map<TagDto>(tag);
    }

    [HttpPost]
    public async Task<ActionResult> Post([FromBody]  TagCreateDto tagCreationDto)
    {
        var tag = _mapper.Map<Tag>(tagCreationDto);
        // await _unitOfWork.Repository.CreateAsync<tag>(tag);
        await _unitOfWork.Tags.Insert(tag);
        await _unitOfWork.Complete();
        return NoContent();
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult> Put(int id, [FromBody] TagCreateDto tagCreateDto)
    {
        var tag = _mapper.Map<Tag>(tagCreateDto);
        tag.Id = id;
        // await _unitOfWork.Repository.UpdateAsync<tag>(tag);
         _unitOfWork.Tags.Update(tag);
        await _unitOfWork.Complete();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> Delete(int Id)
    {
        var tag = await _unitOfWork.Repository.SelectById<Tag>(Id);

        if (tag == null)
        {
            return NotFound();
        }
        // await _unitOfWork.Repository.DeleteAsync<tag>(tag);
        await _unitOfWork.Tags.Delete(Id);
        await _unitOfWork.Complete();
        return NoContent();

    }
}
}