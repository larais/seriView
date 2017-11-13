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
        public async Task<IList<LogEntry>> Get(List<string> level, int topEntriesCount = 100)
        {
            var logLoader = new LogLoader(config);
            var log = await logLoader.GetLogEntries(topEntriesCount, level);
            return log;
        }
    }
}
