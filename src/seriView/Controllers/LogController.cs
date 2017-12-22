using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SeriView.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SeriView.Controllers
{
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
            if (filter != null && !SQE.CSharp.SQE.IsValidSyntax(filter))
            {
                throw new Exception("Wrong syntax!");
            }

            var logLoader = new LogLoader(config);
            var log = await logLoader.GetLogEntries(filter, 100);
            return log;
        }
    }
}
