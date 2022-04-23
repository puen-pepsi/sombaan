using System;
using System.Collections.Generic;
using API.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.DTOs
{
    public class TechnicianCreateDto
    {
        public int UserId { get; set; }
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Bio{get;set;}
        public DateTime CreateAt { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public IFormFile PictureUrl { get; set; }
        
        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> TypeIds { get; set; }
        //Area
        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> AreaIds { get; set; }
    }
}