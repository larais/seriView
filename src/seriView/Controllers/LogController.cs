using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
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
        private readonly IConfiguration config;

        public LogController(IConfiguration config)
        {
            this.config = config;
        }

        [HttpGet]
        public async Task<IList<LogEntry>> Get(string filter = null, int page = 1, int pageSize = 50)
        {
            if (filter != null && !SQE.SQE.IsValidSyntax(filter))
            {
                throw new Exception("Wrong syntax!");
            }

            var logLoader = new LogLoader(config["ConnectionStrings:LogServer"], config["LogTable"]);
            var log = await logLoader.GetLogEntries(filter, 100);
            return log;
        }
    }
}
