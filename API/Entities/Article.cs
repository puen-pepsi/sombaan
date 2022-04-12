using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace API.Entities
{
    public class Article
    {
        public int Id { get; set; }   
        public string Slug { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Body { get; set; }
        public int AuthorId {get;set;}
        public AppUser Author { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.Now;
        public DateTime UpdateAt { get; set; } = DateTime.Now;
        public int TotalComments { get; set; } = 0;
        public int LikesCount { get; set; } = 0;
        public bool Liked { get; set; }
        public bool? Followed { get; set; } = false;
        //OTM
        public virtual ICollection<PhotoArticle> PhotoArticles {get;set;}
        public virtual ICollection<CommentArticle> Comments { get; set; }
        //MTM
        public virtual ICollection<ArticleTag> Taglist { get; set; }
        public virtual ICollection<ArticleGenre> GenreList { get; set; }
        public virtual ICollection<LikedArticle> LikedArticles { get; set; }
        public Article()
        {
            PhotoArticles = new Collection<PhotoArticle>();
            Taglist = new Collection<ArticleTag>();
            Comments = new Collection<CommentArticle>();
            GenreList = new Collection<ArticleGenre>();
            // LikedArticles = new Collection<LikedArticle>();
        }
    }
}