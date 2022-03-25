using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace API.Controllers
{
    public class ImageController : BaseApiController
    {
        private readonly IConfiguration _config;
        private readonly IWebHostEnvironment _env;
        private readonly Microsoft.AspNetCore.Http.IHttpContextAccessor _httpContextAccessor;
        public ImageController(IConfiguration config, 
            IWebHostEnvironment env,
            IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _env = env;
            _config = config;

        }
        [HttpPost, DisableRequestSizeLimit]
        public async Task<Object> ImageUpload()
        {
            var formCollection = await Request.ReadFormAsync();
            var file = formCollection.Files.First();
            string containerName = "images";
            var extension = Path.GetExtension(file.FileName);
            var fileName = $"{Guid.NewGuid()}{extension}";
            string folder = Path.Combine(_env.WebRootPath, containerName);

            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }
            // var folderName = Path.Combine("Resources", "images");
            // var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            // if (file.Length == 0)
            //     return await Task.FromResult(new { error = new { message = "no file hes sent" } });

            // if (!Directory.Exists(pathToSave))
            //     return await Task.FromResult(new { error = new { message = "Folder does not exist" } });
            // var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            // var fullPath = Path.Combine(pathToSave, fileName);
            // var dbPath = Path.Combine("images/", fileName);

            string route = Path.Combine(folder, fileName);
            using (var stream = new FileStream(route, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            //string imageUrl = "https://localhost:5001/" + dbPath;
            //string imageUrl = _config["ApiUrl"] + dbPath;
            var url = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}";
            var routeForDB = Path.Combine(url, containerName, fileName).Replace("\\", "/");

            return await Task.FromResult(new { Url = routeForDB });

        }
    }
}