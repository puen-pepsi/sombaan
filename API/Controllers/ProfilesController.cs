using System.Threading.Tasks;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ProfilesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;

        }

        [HttpGet("{username}")]
        public async Task<ActionResult<ProfileDto>> GetProfileAsync(string username)
        {
            var Username = User.GetUsername();
            var result = await _unitOfWork.UserRepository.GetProfileAsync(username, Username);
            return result;
        }
        [Authorize]
        [HttpPost("{followUsername}/follow")]
        public async Task<ActionResult<ProfileDto>> FollowUserAsync(string followUsername)
        {
            var result = await _unitOfWork.UserRepository.FollowProfileAsync(followUsername, User.GetUserId()??default(int));
            return result;
        }
        [Authorize]
        [HttpDelete("{followUsername}/follow")]
        public async Task<ActionResult<ProfileDto>> UnfollowUserAsync(string followUsername)
        {
            var result = await _unitOfWork.UserRepository.UnFollowProfileAsync(followUsername, User.GetUserId()??default(int));
            return result;
        }
    }
}