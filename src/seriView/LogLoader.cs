using SeriView.Models;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System;
using SQE.SQLGenerators;

namespace SeriView
{
    public class LogLoader
    {
        private readonly string connectionString;
        private readonly string table;

        public LogLoader(string connectionString, string table)
        {
            this.connectionString = connectionString;
            this.table = table;
            if (string.IsNullOrEmpty(this.connectionString))
            {
                throw new InvalidOperationException("ConnectionString is empty. Please check your configuration.") { Source = "Log loader" };
            }
        }

        public async Task<IList<LogEntry>> GetLogEntries(string filter, int top)
        {
            List<LogEntry> entries = new List<LogEntry>(top);

            filter = filter ?? string.Empty;

            SqlCommand sqlCommand = SQE.SQE.GenerateCommand(new MSSQLGenerator(table), filter);

            using (SqlConnection connection = new SqlConnection(connectionString))
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
