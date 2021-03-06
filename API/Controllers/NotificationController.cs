using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class NotificationController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public NotificationController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }
        [HttpGet]
        public async Task<IEnumerable<NotificationDto>> GetNewNotifications()
        {
            var userId = User.GetUserId()??default(int);
            var notifications = await _unitOfWork.NotificationRepository.GetNewNotificationsFor(userId);
            return _mapper.Map<IEnumerable<NotificationDto>>(notifications);

        }
        [HttpPost]
        public async Task<IActionResult> MarkAsRead()
        {
            var userId = User.GetUserId()??default(int);
            var notifications = await _unitOfWork.UserNotificationRepository.GetUserNotificationsFor(userId);

            foreach(var n in notifications){
                n.Read();
            }
            await _unitOfWork.Complete();
            return Ok();
        }
    }
}