using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SeriView.Models;

namespace SeriView.Controllers
{
    public class HomeController : Controller
    {
        private readonly LogViewerConfig config;

        public HomeController(IOptions<LogViewerConfig> config)
        {
            this.config = config.Value;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View(config.FilterProperties);
        }
    }
}