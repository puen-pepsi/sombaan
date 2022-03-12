using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    public class GenresController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ILogger<GenresController> _logger;
        public GenresController(ILogger<GenresController> logger,
        IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _logger = logger;
            _unitOfWork = unitOfWork;

        }
    [HttpGet] // api/genres
    public async Task<ActionResult<List<GenreDto>>> Get()
    {
        _logger.LogInformation("Getting all the genres");

        // var genres = await _unitOfWork.Repository.SelectAll<Genre>();
        var genres = await _unitOfWork.Genres.GetAll();
        return _mapper.Map<List<GenreDto>>(genres);
    }
    [HttpGet("{Id}")]
    // [HttpGet("{Id:int}", Name = "getGenre")] // api/genres/example
    public async Task<ActionResult<GenreDto>> Get(int Id)
    {
        // var genre = await  _unitOfWork.Repository.SelectById<Genre>(Id);
        var genre = await _unitOfWork.Genres.Get(g => g.Id == Id);
        if (genre == null)
        {
            return NotFound();
        }

        return _mapper.Map<GenreDto>(genre);
    }

    [HttpPost]
    public async Task<ActionResult> Post([FromBody] GenreCreateDto genreCreateDto)
    {
        var genre = _mapper.Map<Genre>(genreCreateDto);
        // await _unitOfWork.Repository.CreateAsync<Genre>(genre);
        await _unitOfWork.Genres.Insert(genre);
        await _unitOfWork.Complete();
        return NoContent();
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult> Put(int id, [FromBody] GenreCreateDto genreCreateDto)
    {
        var genre = _mapper.Map<Genre>(genreCreateDto);
        genre.Id = id;
        // await _unitOfWork.Repository.UpdateAsync<Genre>(genre);
         _unitOfWork.Genres.Update(genre);
        await _unitOfWork.Complete();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> Delete(int Id)
    {
        var genre = await _unitOfWork.Repository.SelectById<Genre>(Id);

        if (genre == null)
        {
            return NotFound();
        }
        // await _unitOfWork.Repository.DeleteAsync<Genre>(genre);
        await _unitOfWork.Genres.Delete(Id);
        await _unitOfWork.Complete();
        return NoContent();

    }
}
}