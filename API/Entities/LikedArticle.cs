namespace API.Entities
{
    public class LikedArticle
    {
        public int UserId {get;set;}
        public int ArticleId { get; set; }
        public string UserName { get; set; }

        public AppUser User { get; set; }
        public Article Article { get; set; }
    }
}