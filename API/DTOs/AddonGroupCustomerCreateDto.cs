using System.Collections.Generic;
using API.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace API.DTOs
{
    public class AddonGroupCustomerCreateDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        
        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> AddonCustomerId { get; set; }
    }
}