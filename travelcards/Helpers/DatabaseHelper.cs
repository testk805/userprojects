using System;
using System.Threading.Tasks;
using Npgsql;
using Microsoft.Extensions.Logging;

namespace Travelcards.Helpers
{
    public class DatabaseHelper
    {
        private readonly NpgsqlDataSource _dataSource;
        private readonly ILogger _logger;

        public DatabaseHelper(NpgsqlDataSource dataSource, ILoggerFactory loggerFactory)
        {
            _dataSource = dataSource ?? throw new ArgumentNullException(nameof(dataSource));
            _logger = loggerFactory.CreateLogger<DatabaseHelper>();
        }

        public async Task<TravelcardRecord?> GetTravelcardByNumberAsync(string number)
        {
            await using var conn = await _dataSource.OpenConnectionAsync();
            const string sql = @"
                SELECT id, travelcard_number, travelcard_type, travelcard_valid_from, travelcard_valid_to,
                       travelcard_name, travelcard_requested_date, travelcard_transaction_reference, travelcard_usable_to
                FROM public.travelcards
                WHERE travelcard_number = @number
                LIMIT 1;";
            await using var cmd = new NpgsqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("number", number);
            await using var reader = await cmd.ExecuteReaderAsync();
            if (!await reader.ReadAsync()) return null;

            var record = new TravelcardRecord
            {
                Id = reader.GetInt32(0),
                TravelcardNumber = reader.IsDBNull(1) ? null : reader.GetString(1),
                TravelcardType = reader.IsDBNull(2) ? null : reader.GetString(2),
                TravelcardValidFrom = reader.IsDBNull(3) ? null : reader.GetFieldValue<DateTimeOffset>(3),
                TravelcardValidTo = reader.IsDBNull(4) ? null : reader.GetFieldValue<DateTimeOffset>(4),
                TravelcardName = reader.IsDBNull(5) ? null : reader.GetString(5),
                TravelcardRequestedDate = reader.IsDBNull(6) ? null : reader.GetFieldValue<DateTimeOffset>(6),
                TravelcardTransactionReference = reader.IsDBNull(7) ? null : reader.GetString(7),
                TravelcardUsableTo = reader.IsDBNull(8) ? null : reader.GetFieldValue<DateTimeOffset>(8)
            };

            return record;
        }
    }

    public class TravelcardRecord
    {
        public int Id { get; set; }
        public string? TravelcardNumber { get; set; }
        public string? TravelcardType { get; set; }
        public DateTimeOffset? TravelcardValidFrom { get; set; }
        public DateTimeOffset? TravelcardValidTo { get; set; }
        public string? TravelcardName { get; set; }
        public DateTimeOffset? TravelcardRequestedDate { get; set; }
        public string? TravelcardTransactionReference { get; set; }
        public DateTimeOffset? TravelcardUsableTo { get; set; }
    }
}
