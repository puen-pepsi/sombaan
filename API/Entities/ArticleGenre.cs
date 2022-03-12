namespace API.Entities
{
    public class ArticleGenre
    {
        public int GenreId { get; set; }
        public int ArticleId { get; set; }
        public Genre Genre { get; set; }
        public Article Article { get; set; }
    }
}