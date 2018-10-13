using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using SeriView.Models;

namespace SeriView.Controllers
{
    public class HomeController : Controller
    {
        private readonly IConfiguration config;

        public HomeController(IConfiguration config)
        {
            this.config = config;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View(config["FilterProperties"]);
        }
    }
}