using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SeriView.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SeriView.Controllers
{
    //[ApiExceptionFilter]
    [Route("Log")]
    public class LogController : Controller
    {
        private readonly LogViewerConfig config;

        public LogController(IOptions<LogViewerConfig> config)
        {
            this.config = config.Value;
        }

        [HttpGet]
        public async Task<IList<LogEntry>> Get(string filter = null)
        {
            var logLoader = new LogLoader(config);
            var log = await logLoader.GetLogEntries(100, new List<string>());
            return log;
        }
    }
}
