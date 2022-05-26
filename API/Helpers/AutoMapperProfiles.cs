using System.Collections.Generic;
using System.Linq;
using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        { // string CurrentUsername = null;
            CreateMap<Province,MultiselectorDto>()
                .ForMember(dest=>dest.Id,opt=>opt.MapFrom(src=>src.Id))
                .ForMember(dest=>dest.Name,opt=>opt.MapFrom(src=>src.Name_th));
             CreateMap<Amphure,MultiselectorDto>()
                .ForMember(dest=>dest.Id,opt=>opt.MapFrom(src=>src.Id))
                .ForMember(dest=>dest.Name,opt=>opt.MapFrom(src=>src.Name_th));
             CreateMap<District,DistrictDto>()
                .ForMember(dest=>dest.Id,opt=>opt.MapFrom(src=>src.Id))
                .ForMember(dest=>dest.Name,opt=>opt.MapFrom(src=>src.Name_th))
                .ForMember(dest=>dest.ZipCode,opt=>opt.MapFrom(src=>src.ZipCode));
            CreateMap<AddressCreateDto,Address>();
           //User
            CreateMap<UserUpdateDto,AppUser>();
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src =>
                    src.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<Photo, PhotoDto>();
            CreateMap<RegisterDto, AppUser>();
            CreateMap<AppUser,ProfileDto>()
                .ForMember(dest =>dest.Username,opt=>opt.MapFrom(y=>y.UserName))
                .ForMember(dest=>dest.Bio,opt=>opt.MapFrom(y => y.Bio))
                .ForMember(dest => dest.Image,opt=>opt.MapFrom(y=> y.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(dest => dest.Following,opt => opt.MapFrom(y=>y.FollowedUser.Any()));

            //Htmlpage
            CreateMap<HtmlPage,HtmlPageCreationDto>().ReverseMap();
            CreateMap<HtmlPage,HtmlPageDto>().ReverseMap();

            //Article
            CreateMap<GenreDto, Genre>().ReverseMap();
            CreateMap<GenreCreateDto, Genre>();
            CreateMap<TagDto, Tag>().ReverseMap();
             CreateMap<ArticleCreationDto,Article>()
                .ForMember(dest => dest.AuthorId ,opt => opt.Ignore())
                .ForMember(dest => dest.PhotoArticles,opt => opt.Ignore())
                .ForMember(dest => dest.Slug,opt => opt.MapFrom(MapSlug))
                .ForMember(dest => dest.GenreList,opt => opt.MapFrom(MapArticleGenre))
                .ForMember(dest => dest.Taglist,opt => opt.Ignore());
            CreateMap<Article,ArticleDto>()
                .ForMember(dest => dest.Liked,opt => opt.MapFrom(src => src.LikedArticles.Any()))
                .ForMember(dest => dest.Genres,opt => opt.MapFrom(src => src.GenreList))
                .ForMember(dest => dest.Tags,opt => opt.MapFrom(src => src.Taglist))
                .ForMember(dest => dest.Photos,opt=> opt.MapFrom(src => src.PhotoArticles))
                .ForMember(dest => dest.Author,opt => opt.MapFrom(src => src.Author));
            CreateMap<ArticleGenre, GenreDto>()
                .ForMember(dest => dest.Id,opt => opt.MapFrom(src => src.GenreId))
                .ForMember(dest => dest.Name,opt => opt.MapFrom(src => src.Genre.Name));
            CreateMap<ArticleTag, TagDto>()
                .ForMember(dest => dest.Id,opt => opt.MapFrom(src => src.TagId))
                .ForMember(dest => dest.Name,opt => opt.MapFrom(src => src.Tag.Name));
            CreateMap<CommentArticle, ArticleCommentDto>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.UserComment.UserName))
                .ForMember(d => d.liked, o => o.MapFrom(s => s.Liked.Select(x => x.UserLikeComment.UserName)))
                .ForMember(d => d.Followed,o=> o.MapFrom( f => f.UserComment.FollowedByUser.Any()))
                .ForMember(d => d.Image, ex => ex.MapFrom(src => src.UserComment.Photos.FirstOrDefault(x => x.IsMain).Url));
            CreateMap<ArticleCommentCreateDto,CommentArticle>().ReverseMap();    
            CreateMap<PhotoArticle,PhotoDto>()
                .ForMember(dest => dest.Id,opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Url,opt => opt.MapFrom(src => src.Url))
                .ForMember(dest => dest.IsMain,opt => opt.MapFrom(src => src.IsMain));

            //technician
            CreateMap<AreaCreateDto,Area>().ReverseMap();
            CreateMap<MultiselectorDto,Area>().ReverseMap();
            CreateMap<CategoryTyeDto,CategoryType>().ReverseMap();
            CreateMap<CategoryTypeCreateDto,CategoryType>().ReverseMap();
            CreateMap<CategoryType,CategoryTypeAllDto>()
                .ForMember(dest => dest.types,opt => opt.MapFrom(MapTypes));
            CreateMap<TechnicianTypeDto,TechnicianType>();
            CreateMap<TechnicianType,TechnicianTypeDto>()
                .ForMember(dest => dest.CategoryTypeName,opt => opt.MapFrom(src => src.CategoryType.Name));
            CreateMap<TechnicianTypeCreateDto,TechnicianType>().ReverseMap();
            CreateMap<TagCreateDto, Tag>();
            CreateMap<MultiselectorDto,TechnicianType>().ReverseMap();
            CreateMap<MultiselectorDto,Area>().ReverseMap();
            CreateMap<TechnicianCreateDto,Technician>()
                .ForMember(dest => dest.UserId,opt=>opt.Ignore())
                .ForMember(dest => dest.CreateAt,opt => opt.Ignore())
                .ForMember(dest => dest.PictureUrl,opt => opt.Ignore())
                .ForMember(dest => dest.AreaScopes,otp=>otp.MapFrom(MapAreaScope))
                .ForMember(dest=> dest.TechType,opt => opt.MapFrom(MapTechType));
            CreateMap<Technician,TechnicianDto>()
                .ForMember(dest => dest.Areas,otp=>otp.MapFrom(src=> src.AreaScopes))
                .ForMember(dest=> dest.Types,opt => opt.MapFrom(src => src.TechType));
            CreateMap<TechType,MultiselectorDto>()
                .ForMember(dest => dest.Id,opt => opt.MapFrom(src => src.TypeId))
                .ForMember(dest => dest.Name,opt => opt.MapFrom(src => src.Type.Name));
            CreateMap<AreaScope,MultiselectorDto>()
                .ForMember(dest => dest.Id,opt => opt.MapFrom(src => src.AreaId))
                .ForMember(dest => dest.Name,opt => opt.MapFrom(src => src.Area.Name));


            //maintenance
            CreateMap<MaintenanceCreateDto,Maintenance>()
                .ForMember(dest=>dest.Pictures,opt=>opt.Ignore())
                .ForMember(dest=>dest.CreateAt,opt=>opt.Ignore())
                // .ForMember(dest=>dest.DueDate,opt=>opt.MapFrom(src=>src.DueDate))
                .ForMember(dest=>dest.AreaId,opt=>opt.MapFrom(src=>src.AreaIds))
                .ForMember(dest=>dest.Types ,opt=>opt.MapFrom(MapMainTypes));
            CreateMap<Maintenance,MaintenanceDto>()
                .ForMember(dest=>dest.CustomerName,opt=>opt.MapFrom(src=>src.User.UserName))
                .ForMember(dest=>dest.AreaName,opt=>opt.MapFrom(src=>src.Area.Name));
            CreateMap<MaintenanceTypes,MultiselectorDto>()
                .ForMember(dest=>dest.Id,opt=>opt.MapFrom(src=>src.TypeId))
                .ForMember(dest=>dest.Name,opt=>opt.MapFrom(src=>src.Type.Name));
            CreateMap<PictureWithDetails,PictureWithDetialsDto>()
                .ForMember(dest=>dest.Id,opt=>opt.MapFrom(src=>src.Id))
                .ForMember(dest=>dest.Description,opt=>opt.MapFrom(src=>src.Description))
                .ForMember(dest=>dest.PictureUrl,opt=>opt.MapFrom(src=>src.PictureUrl));  
            CreateMap<MatchTechnician,MathTechnicianDto>()
                .ForMember(dest=>dest.TechnicianId,opt=>opt.MapFrom(src=>src.TechnicianId));
            
            //Notification  
            CreateMap<Notification,NotificationDto>();
            CreateMap<Maintenance,MaintenanceNotificationDto>()
                .ForMember(dest => dest.AreaName,opt => opt.MapFrom(x => x.Area.Name))
                .ForMember(dest => dest.CustomerName,opt=>opt.MapFrom(x => x.User.UserName));
            
        }   

        private List<MaintenanceTypes> MapMainTypes(MaintenanceCreateDto maintenanceCreateDto,Maintenance maintenance)
        {
            var result = new List<MaintenanceTypes>();
              if(maintenanceCreateDto.TypeIds == null){return result;}
                foreach( var id in maintenanceCreateDto.TypeIds)
                {
                    result.Add(new MaintenanceTypes(){ TypeId = id});
                }
                return result;
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
        private List<MultiselectorDto> MapTypes(CategoryType categoryType,CategoryTypeAllDto categoryTypeAllDto)
        {
            var result = new List<MultiselectorDto>();
            if(categoryType.TechnicianTypes != null){
                foreach(var type in categoryType.TechnicianTypes){
                    result.Add(new MultiselectorDto(){
                        Id=type.Id,Name=type.Name
                    });
                }
            }
            return result;
        }

        private ProfileDto MapAuthorDto(Article article ,ArticleDto articledto)
        {
            // return  new ProfileDto(
            //           article.Author.UserName,
            //           article.Author.Bio,
            //           article.Author.Photos.FirstOrDefault(x => x.IsMain).Url,
            //           article.Followed
            // );
            return new ProfileDto(){
                Username= article.Author.UserName,
                Bio=article.Author.Bio,
                Image=article.Author.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                Following = article.Author.FollowedUser.Any()
            };
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
        private List<TechType> MapTechType(TechnicianCreateDto technicianCreateDto,Technician technician)
        {
            var result = new List<TechType>();
            if(technicianCreateDto.TypeIds == null){return result;}
            foreach( var id in technicianCreateDto.TypeIds)
            {
                result.Add(new TechType(){ TypeId = id});
            }
            return result;
        }
        private List<AreaScope> MapAreaScope(TechnicianCreateDto technicianCreateDto,Technician technician)
        {
            var result = new List<AreaScope>();
            if(technicianCreateDto.AreaIds == null){return result;}
            foreach( var id in technicianCreateDto.AreaIds)
            {
                result.Add(new AreaScope(){ AreaId = id});
            }
            return result;
        }
         private List<MultiselectorDto> MapAreaScope(Technician technician,TechnicianDto technicianDto)
        {
            var result = new List<MultiselectorDto>();
            if(technician.AreaScopes == null){return result;}
            foreach( var area in technician.AreaScopes)
            {
                result.Add(new MultiselectorDto(){ Id = area.AreaId,Name =area.Area.Name });
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
         private List<MultiselectorDto> MapTechType(Technician technician, TechnicianDto technicianDto)
        {
            var result = new List<MultiselectorDto>();

            if (technician.TechType == null) { return result; }

            foreach (var type in technician.TechType)
            {
                result.Add(new MultiselectorDto() { Id = type.TypeId,Name = type.Type.Name });
            }

            return result;
        }
        private string MapSlug(ArticleCreationDto articleCreationDto,Article article)
        {
            string result = "";
            if(articleCreationDto.Title == null){return result;}
            result = articleCreationDto.Title.GenerateSlug();
            return result; 
        }
    }
}