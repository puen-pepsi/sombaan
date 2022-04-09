using System.Linq;
using System.Security.Claims;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Http;

namespace API.Helpers
{
    public class UserNameResolver : IValueResolver<Article, ArticleDto, string>
    {
        private readonly IHttpContextAccessor _contextAccessor;

        public UserNameResolver(IHttpContextAccessor  contextAccessor)
        {
            _contextAccessor = contextAccessor;
        }
        public string Resolve(Article source, ArticleDto destination, string destMember, ResolutionContext context)
        {
            // return _contextAccessor.HttpContext.User.Claims
            //         .Where(x => x.Type == ClaimTypes.NameIdentifier)
            //         .Select(c => c.Value).SingleOrDefault();
              return  _contextAccessor.HttpContext.User.FindFirst(ClaimTypes.Name)?.Value;
        }
    }
}