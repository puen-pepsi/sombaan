using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace API.Entities
{
    public class CommentArticle
    {
            public int Id { get; set; }
            public int? ParentId { get; set; }
            public string Content { get; set; }
            public DateTime CreatedAt { get; set; } = DateTime.Now;
            public int ArticleId { get; set; }
            public Article Article { get; set; }
            public int UserCommentId { get; set; }
            public AppUser UserComment { get; set; }
            public virtual ICollection<LikeCommentArticle> Liked { get; set; }
            //LikeComment

            public CommentArticle()
            {
                Liked = new Collection<LikeCommentArticle>();
            }
    }
}