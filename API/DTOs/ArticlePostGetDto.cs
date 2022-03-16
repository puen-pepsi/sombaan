using System.Collections.Generic;

namespace API.DTOs
{
    public class ArticlePostGetDto
    {
        public List<GenreDto> Genres { get; set; }
        public List<TagDto>  Tags { get; set; }
    }
}