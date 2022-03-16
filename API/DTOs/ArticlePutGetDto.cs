using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class ArticlePutGetDto
    {
        public ArticleDto Article { get; set; }
        public IEnumerable<GenreDto> SelectedGenres  { get; set; }
        public IEnumerable<GenreDto> NonSelectedGenres { get; set; }
        public List<string> SelectedTags { get; set; }
        public List<string> NonSelectedTags { get; set; }

    }
}