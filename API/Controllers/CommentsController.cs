using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CommentsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public CommentsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;

        }
        [HttpPost("{slug}")]
        public async Task<ActionResult<ArticleCommentDto>> CreateComment(string slug,
                [FromBody] ArticleCommentCreateDto articleCommentCreateDto )
        {
            if(!ModelState.IsValid){
                return BadRequest();
            }
            var article = await _unitOfWork.ArticleRepository.GetArticleBySlug(slug,0,false);
            if(article == null)
                return NotFound();

            articleCommentCreateDto.UserCommentId = User.GetUserId();
            articleCommentCreateDto.ArticleId = article.Id;
            var comment = _mapper.Map<CommentArticle>(articleCommentCreateDto);
            _unitOfWork.ArticleRepository.AddArticleComment(article,comment);
            comment.UserComment = await _unitOfWork.UserRepository.GetUserByIdAsync(comment.UserCommentId);
            if(await _unitOfWork.Complete()){
                return Ok(_mapper.Map<ArticleCommentDto>(comment));
            }
            return BadRequest("Problem Create Comment");
        }
        [HttpGet("{slug}/{parentId:int?}")]
        public async Task<ActionResult<List<ArticleCommentDto>>> GetCommentAsync(string slug,int? parentId =null)
        {
            //get comment without parentId
            var result = await _unitOfWork.ArticleRepository.GetCommentsBySlugAsync(slug, User.GetUserId(),parentId);
            return _mapper.Map<List<ArticleCommentDto>>(result);
        }
        [HttpDelete("{slug}/{commentId}")]
        public async Task<ActionResult> deleteComment(string slug , int commentId)
        {
            await _unitOfWork.ArticleRepository.RemoveCommentAsync(slug,commentId,User.GetUserId(),null);
            return Ok();
        }

        [HttpPost("addlike/{commentId}")]
        public async Task<ActionResult<ArticleCommentDto>> AddLiked(int commentId)
        {
            var userId = User.GetUserId();
            var comment = await _unitOfWork.ArticleRepository.GetCommentAsync(commentId);
            var existliked = await _unitOfWork.ArticleRepository.GetLikedCommentAsync(commentId,userId);
            if(existliked != null){
                _unitOfWork.ArticleRepository.DeleteLikeComment(existliked);
            }else{
                var currentUser = await _unitOfWork.UserRepository.GetUserByIdAsync(userId);
                var userLiked = new LikeCommentArticle{
                    UserLikeComment = currentUser,
                    UserLikeCommentId  = userId,
                    ParentId = commentId
                };
                comment.Liked.Add(userLiked); 
            }
            
            if( await _unitOfWork.Complete()){
                var commentToReturn =  _mapper.Map<ArticleCommentDto>(comment);
                return Ok(commentToReturn);
            }
            return BadRequest("UnSuccessfull");
        }
    }
}