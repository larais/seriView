using SerilogMSSqlLogViewer.Models;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using SerilogMSSqlLogViewer.Utils;
using System;

namespace SerilogMSSqlLogViewer
{
    public class LogLoader
    {
        private readonly LogViewerConfig config;

        public LogLoader(LogViewerConfig config)
        {
            this.config = config;
            if (string.IsNullOrEmpty(this.config.ConnectionString))
            {
                throw new InvalidOperationException("ConnectionString is empty. Please check your configuration.") { Source = "Log loader" };
            }
        }

        public async Task<IList<LogEntry>> GetLogEntries(int top, List<string> logLevels)
        {
            var filterLevels = logLevels.Count > 0;
            
            List<LogEntry> entries = new List<LogEntry>(100);
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                await connection.OpenAsync();

                var query = BuildQuery(filterLevels);

                using (SqlCommand cmd = new SqlCommand(query, connection))
                {
                    cmd.Parameters.AddWithValue("@top", top);

                    if (filterLevels) cmd.AddArrayParameters("levels", logLevels);

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

        private string BuildQuery(bool filterLevels)
        {
            var query = $"SELECT TOP (@top) * FROM {config.LogTable} ";

            if (filterLevels)
            {
                query += "WHERE Level IN ({levels}) ";
            }

            query += "ORDER BY TimeStamp DESC";

            return query;
        }
    }
}
