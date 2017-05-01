using SerilogMSSqlLogViewer.Models;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace SerilogMSSqlLogViewer
{
    public class LogLoader
    {
        private readonly LogViewerConfig config;

        public LogLoader(LogViewerConfig config)
        {
            this.config = config;
        }

        public async Task<IList<LogEntry>> GetLogEntries(int top)
        {
            List<LogEntry> entries = new List<LogEntry>(100);
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                await connection.OpenAsync();

                using (SqlCommand cmd = new SqlCommand($"SELECT TOP (@top) * FROM {config.LogTable} ORDER BY TimeStamp DESC", connection))
                {

                    cmd.Parameters.AddWithValue("@top", top);

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            entries.Add(new LogEntry()
                            {
                                Id = reader.GetInt32(0),
                                Message = reader.GetString(1),
                                Level = reader.GetString(3),
                                Timestamp = reader.GetDateTime(4),
                                Properties = reader.GetString(6)
                            });
                        }
                    }
                }
            }

            return entries;
        }
    }
}
