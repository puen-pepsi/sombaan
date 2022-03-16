using System;
using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class ArticleDto
    {
        public int Id { get; set; }   
        public string Title { get; set; }
        public string Description { get; set; }
        public string Body { get; set; }
        public string AuthorName {get;set;}
        public DateTime CreateAt { get; set; }
        public int LikesCount { get; set; }
        public List<GenreDto> Genres{get; set;}
        public List<PhotoDto> Photos{get;set;}
        public List<TagDto> Tags{get;set;}

        
        //OTM
    }
}