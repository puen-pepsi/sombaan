using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : IdentityDbContext<AppUser,AppRole,int,
        IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>,
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Connection> Connections { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<CommentArticle> CommentArticles { get; set; }
        public DbSet<LikeCommentArticle> LikeCommentArticles { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<LikedArticle> LikedArticles { get; set; }
        public DbSet<UserLink> FollowedUser { get; set; }
        public DbSet<PhotoArticle> ProtoArticles { get; set; }          
        public DbSet<ArticleTag> ArticleTags { get; set; }
        public DbSet<ArticleGenre> ArticleGenres { get; set; }
        public DbSet<HtmlPage> HtmlPages { get; set; }
        

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<AppUser>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            builder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();
            
            //MTM
            builder.Entity<ArticleTag>()
                .HasKey(k => new { k.ArticleId, k.TagId });
            builder.Entity<LikedArticle>()
                .HasKey(k=> new { k.ArticleId, k.UserId});

            builder.Entity<UserLink>()
                .HasKey(k => new { k.SourceUserId, k.FollowedUserId });

            builder.Entity<UserLink>()
                .HasOne(s => s.SourceUser)
                .WithMany(l => l.FollowedUser)
                .HasForeignKey(s => s.SourceUserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserLink>()
                .HasOne(s => s.FollowedUser)
                .WithMany(l => l.FollowedByUser)
                .HasForeignKey(s => s.FollowedUserId)
                .OnDelete(DeleteBehavior.Cascade);
                
            // builder.Entity<ArticleTag>()
            //     .HasOne(a => a.Article)
            //     .WithMany(t => t.Taglist)
            //     .HasForeignKey(s => s.ArticleId)
            //     .OnDelete(DeleteBehavior.Cascade);

            // builder.Entity<ArticleTag>()
            //     .HasOne(t => t.Tag)
            //     .WithMany(a => a.ArticleATagList)
            //     .HasForeignKey(s => s.TagId)
            //     .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<ArticleGenre>()
                .HasKey(x => new{x.ArticleId,x.GenreId});

        }
    }
}