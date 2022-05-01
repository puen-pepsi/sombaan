using System;
using System.Collections.Generic;
using API.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.DTOs
{
    public class MaintenanceCreateDto
    {
        public int UserId { get; set; }
        public string Description { get; set; }
        public virtual List<IFormFile> Pictures {get;set;}
        
        public int AreaIds { get;set;}

        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> TypeIds { get; set; }
    }
}