using System;

namespace API.Entities
{
    public class Comment
    {
            public int Id { get; set; }
            public string Body { get; set; }
            public string Username { get; set; }
            public int ArticleId { get; set; }
            public int CommentId { get; set; }
            public DateTime CreatedAt { get; set; }
            public DateTime UpdatedAt { get; set; }
            public AppUser Author { get; set; } = null!;
            public Article Article { get; set; } = null!;
    }
}