using SeriView.Models;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using SeriView.Utils;
using System;
using SQE.CSharp.SQLGenerators;

namespace SeriView
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

        public async Task<IList<LogEntry>> GetLogEntries(string filter, int top)
        {
            List<LogEntry> entries = new List<LogEntry>(top);

            SqlCommand sqlCommand;
            if (filter != null)
            {
                sqlCommand = SQE.CSharp.SQE.GenerateCommand(new MSSQLGenerator(config.LogTable), filter);
            }
            else
            {
                sqlCommand = new SqlCommand($"SELECT TOP {top} * FROM {config.LogTable} ORDER BY TimeStamp DESC");
            }

            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                await connection.OpenAsync();
                sqlCommand.Connection = connection;
                using (var reader = await sqlCommand.ExecuteReaderAsync())
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

            return entries;
        }
    }
}
