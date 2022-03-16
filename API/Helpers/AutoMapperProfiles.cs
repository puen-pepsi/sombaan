using System;
using System.Collections.Generic;
using System.Linq;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src =>
                    src.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<Photo, PhotoDto>();
            CreateMap<RegisterDto, AppUser>();

            CreateMap<GenreDto, Genre>().ReverseMap();
            CreateMap<GenreCreateDto, Genre>();
            CreateMap<TagDto, Tag>().ReverseMap();
            CreateMap<TagCreateDto, Tag>();

            CreateMap<ArticleCreationDto,Article>()
                .ForMember(dest => dest.PhotoArticles,opt => opt.Ignore())
                .ForMember(dest => dest.GenreList,opt => opt.MapFrom(MapArticleGenre))
                .ForMember(dest => dest.Taglist,opt => opt.Ignore());
            CreateMap<Article,ArticleDto>()
                .ForMember(dest => dest.AuthorName,opt=> opt.MapFrom(x => x.Author.UserName))
                .ForMember(dest => dest.Tags,opt => opt.MapFrom(MapTagDto))
                .ForMember(dest => dest.Photos,opt=> opt.MapFrom(MapPhotoDto))
                .ForMember(dest => dest.Genres,opt => opt.MapFrom(MapGenresDto));
        }
        private List<TagDto> MapTagDto(Article article,ArticleDto articledto)
        {
            var result = new List<TagDto>();
            if(article.Taglist != null){
                foreach(var tag in article.Taglist){
                    result.Add(new TagDto(){
                        Id=tag.TagId,Name=tag.Tag.Name
                    });
                }
            }
            return result;
        }
        private List<PhotoDto> MapPhotoDto(Article article ,ArticleDto articledto)
        {
            var result = new List<PhotoDto>();
                if(article.PhotoArticles != null){
                    foreach(var photo in article.PhotoArticles){
                        result.Add(new PhotoDto(){
                            Id=photo.Id,Url=photo.Url,IsMain=photo.IsMain
                        });
                    }
                }
            return result;
        }
        private List<GenreDto> MapGenresDto(Article article , ArticleDto articledto)
        {
            var result = new List<GenreDto>();
                if(article.GenreList != null){
                    foreach(var genre in article.GenreList){
                        result.Add(new GenreDto(){ 
                            Id=genre.GenreId,Name=genre.Genre.Name
                        });
                    }
                }
            return result;
        }
        private List<ArticleGenre> MapArticleGenre(ArticleCreationDto articleCreationDto, Article article)
        {
            var result = new List<ArticleGenre>();

            if (articleCreationDto.GenresIds == null) { return result; }

            foreach (var id in articleCreationDto.GenresIds)
            {
                result.Add(new ArticleGenre() { GenreId = id });
            }

            return result;
        }

    }
}