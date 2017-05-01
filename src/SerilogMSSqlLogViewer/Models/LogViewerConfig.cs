using Newtonsoft.Json;
using System.IO;

namespace SerilogMSSqlLogViewer.Models
{
    public class LogViewerConfig
    {
        public string ConnectionString { get; set; }

        public string LogTable { get; set; } = "dbo.Log";

        public string[] FilterProperties { get; set; } = new string[0];
    }
}
