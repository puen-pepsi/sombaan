using System;

namespace API.DTOs
{
    public class ArticleCommentCreateDto
    {
            
            public string Content { get; set; }
            public int? ParentId { get; set; } = null!;
            public DateTime CreatedAt { get; set; } = DateTime.Now;
            public int ArticleId { get; set; }
            public int? UserCommentId { get; set; }

    }
}