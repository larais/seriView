using Newtonsoft.Json;
using System.IO;

namespace SeriView.Models
{
    public class LogViewerConfig
    {
        public Connections ConnectionStrings { get; set; }

        public string LogTable { get; set; } = "dbo.Log";

        public string[] FilterProperties { get; set; } = new string[0];

        public class Connections
        {
            public string LogServer { get; set; }
        }
    }
}
