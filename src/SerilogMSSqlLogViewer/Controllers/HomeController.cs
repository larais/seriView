using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SerilogMSSqlLogViewer.Models;

namespace SerilogMSSqlLogViewer.Controllers
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