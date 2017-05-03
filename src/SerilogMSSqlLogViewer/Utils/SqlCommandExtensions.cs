using System.Collections.Generic;
using System.Data.SqlClient;

namespace SerilogMSSqlLogViewer.Utils
{
    public static class SqlCommandExtensions
    {
        public static SqlParameter[] AddArrayParameters<T>(this SqlCommand cmd, string paramNameRoot, IEnumerable<T> values)
        {
            var parameters = new List<SqlParameter>();
            var parameterNames = new List<string>();
            var counter = 1;
            foreach (var value in values)
            {
                var paramName = string.Format("@{0}{1}", paramNameRoot, counter++);
                parameterNames.Add(paramName);
                parameters.Add(cmd.Parameters.AddWithValue(paramName, value));
            }

            cmd.CommandText = cmd.CommandText.Replace("{" + paramNameRoot + "}", string.Join(", ", parameterNames));

            return parameters.ToArray();
        }

    }
}
