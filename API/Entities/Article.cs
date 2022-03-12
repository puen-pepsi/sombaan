using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace API.Entities
{
    public class Article
    {
        public int Id { get; set; }   
        public string Title { get; set; }
        public string Description { get; set; }
        public string Body { get; set; }
        public AppUser Author { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.Now;
        public DateTime UpdateAt { get; set; } = DateTime.Now;
        public int LikesCount { get; set; } = 0;
        //OTM
        public virtual List<PhotoArticle> PhotoArticles {get;set;}
        public virtual List<Comment> Comments { get; set; }
        //MTM
        public virtual List<ArticleTag> Taglist { get; set; }
        public virtual List<ArticleGenre> GenreList { get; set; }
        //List<Comment> OTM
        //Rate 
        //Like => External table 
        //**general / admin
        // public Article()
        // {
        //     PhotoArticles = new Collection<PhotoArticle>();
        //     Taglist = new Collection<ArticleTag>();
        // }
    }
}