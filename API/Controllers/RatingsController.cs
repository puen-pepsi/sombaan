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
    public class RatingsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public RatingsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }
        [Authorize]
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] RatingDto ratingDto)
        {
            var userId = User.GetUserId()??default(int);

            var currentRate = await _unitOfWork.Ratings
                    .Get(x =>x.TechnicianId == ratingDto.TechnicianId
                         && x.UserId == userId);

            if (currentRate == null)
            {
                var rating = new Rating();
                rating.TechnicianId = ratingDto.TechnicianId;
                rating.Rate = ratingDto.Rating;
                rating.UserId = userId;
                await _unitOfWork.Ratings.Insert(rating);
            }
            else
            {
                currentRate.Rate = ratingDto.Rating;
            }

            await  _unitOfWork.Complete();
            return NoContent();
        }
    }
}