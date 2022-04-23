using System.Linq;
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
    public class UsersController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private string container = "profile";
        private readonly IFileStorageService _fileStorageService;
        public UsersController(IUnitOfWork unitOfWork, IMapper mapper, IFileStorageService fileStorageService)
        {
            _fileStorageService = fileStorageService;
            _mapper = mapper;
            _unitOfWork = unitOfWork;

        }

        [HttpPut]
        public async Task<ActionResult<ProfileDto>> UpdateUser([FromForm] UserUpdateDto userUpdateDto)
        {
            var username = User.GetUsername();
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);
            if (user.UserName != userUpdateDto.Username)
            {
                var existUsername = await _unitOfWork.UserRepository.GetUserByUsernameAsync(userUpdateDto.Username);
                if (existUsername != null)
                {
                    return BadRequest("User KnowAs is taken");
                }
            }

            _mapper.Map(userUpdateDto, user);

            if (userUpdateDto.Image != null)
            {
                var isMain = user.Photos.FirstOrDefault(x => x.IsMain).Url;
                if (isMain != null)
                {
                    await _fileStorageService.DeleteFile(isMain,container);
                }
                var getUrl = await _fileStorageService.SaveFile(container,userUpdateDto.Image);
                var photo = new Photo(){
                    IsMain=true,
                    Url=getUrl
                };
                user.Photos.Add(photo);
            }
            //path in db
            
            _unitOfWork.UserRepository.Update(user);
            if (await _unitOfWork.Complete()) 
                return new ProfileDto(){
                    Username=user.UserName,
                    Bio = user.Bio,
                    Image = user.Photos.FirstOrDefault(x => x.IsMain).Url
                };

            return BadRequest("Failed to update user");
        }

    }
}