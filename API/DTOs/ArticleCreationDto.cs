using System;
using System.Collections.Generic;
using API.Entities;
using API.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.DTOs
{
    public class ArticleCreationDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Body { get; set; }
        public int AuthorId { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.Now;
        public DateTime UpdateAt { get; set; }
        public int LikesCount { get; set; } = 0;
        //OTM
        public virtual List<IFormFile> PhotoList {get;set;}
        //MTM
         [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> GenresIds { get; set; }
        [ModelBinder(BinderType = typeof(TypeBinder<List<string>>))]
        public List<string> TagsIds { get;set;}

    }
}