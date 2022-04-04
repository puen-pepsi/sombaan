using System;
using System.Collections.Generic;
using API.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.DTOs
{
    public class ArticleCommentDto
    {
        public int Id { get; set; }
        public int ArticleId { get; set; }
        // public int? ChapterId { get; set; }
        public int? ParentId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Content { get; set; }
        public string UserName { get; set; }
        public string Image { get; set; }

        public bool Followed { get; set; }

        //list for user like
        public IEnumerable<string> liked { get; set; }

    }
}