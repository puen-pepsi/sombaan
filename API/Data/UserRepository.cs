using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<MemberDto> GetMemberAsync(string username)
        {
            return await _context.Users
                .Where(x => x.UserName == username)
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams)
        {
            var query = _context.Users.AsQueryable();

            query = query.Where(u => u.UserName != userParams.CurrentUsername);
            //query = query.Where(u => u.Gender == userParams.Gender);

            // var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
            // var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

            //query = query.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);

            query = userParams.OrderBy switch
            {
                "created" => query.OrderByDescending(u => u.Created),
                _ => query.OrderByDescending(u => u.LastActive)
            };
            //var users = _mapper.Map<IEnumerable<MemberDto>>(query);
            return await PagedList<MemberDto>.CreateAsync(query.ProjectTo<MemberDto>(_mapper
                .ConfigurationProvider).AsNoTracking(), 
                    userParams.PageNumber, userParams.PageSize);
   
        }
        public async Task<ProfileDto> GetProfileAsync(string username,string UserName)
        {
            var profileUser = await GetUserByUsernameAsync(username);
            var isFollowing = false;
            if (username is not null)
            {
                isFollowing = await IsFollowingAsync(username, UserName);
            }
            return  new ProfileDto(){
                Username = username,
                Image = profileUser.Photos.FirstOrDefault(x => x.IsMain).Url,
                Bio = profileUser.Bio,
                Following = isFollowing
            };        
        }
        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users
                            .Include(p => p.Photos)
                            .FirstOrDefaultAsync(u => u.Id == id);
        }
        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
                .Include(p => p.Photos)
                .ToListAsync();
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }

        public async Task<ProfileDto> FollowProfileAsync(string profileusername, int userId)
        {
            var profileUser = await GetUserByUsernameAsync(profileusername);

            var userlink = new UserLink{
                SourceUserId = profileUser.Id,
                FollowedUserId = userId
            };
            _context.FollowedUser.Add(userlink);
        
            await _context.SaveChangesAsync();
      
            // return new ProfileDto(profileUser.UserName, profileUser.Bio, profileUser.Email, true);
            return new ProfileDto{
                Username= profileUser.UserName,
                Bio=profileUser.Bio,
                Image=profileUser.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                Following = profileUser.FollowedUser.Any()
            };
        }
        public async Task<ProfileDto> UnFollowProfileAsync(string profileUsername, int userId)
        {
            var profileUser = await GetUserByUsernameAsync(profileUsername);

             var userlink = new UserLink{
                SourceUserId = profileUser.Id,
                FollowedUserId = userId
            };
            _context.FollowedUser.Remove(userlink);
            await _context.SaveChangesAsync();
            // return new ProfileDto(profileUser.UserName, profileUser.Bio, profileUser.Email, false);
             return new ProfileDto{
                Username= profileUser.UserName,
                Bio=profileUser.Bio,
                Image=profileUser.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                Following = profileUser.FollowedUser.Any()
            };
        }

        public Task<bool> IsFollowingAsync(string sourceusername, string followerUserName)
        {
                return _context.FollowedUser.AnyAsync(
                x => x.SourceUser.UserName == sourceusername
                     && x.FollowedUser.UserName == followerUserName);

        }
    }
}