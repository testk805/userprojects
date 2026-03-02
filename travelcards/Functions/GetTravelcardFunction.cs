using System;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using Travelcards.Helpers;
using Travelcards.Models;

namespace Travelcards.Functions
{
    public class GetTravelcardFunction
    {
        private readonly DatabaseHelper _db;
        private readonly ILogger _logger;

        public GetTravelcardFunction(DatabaseHelper db, ILoggerFactory loggerFactory)
        {
            _db = db ?? throw new ArgumentNullException(nameof(db));
            _logger = loggerFactory.CreateLogger<GetTravelcardFunction>();
        }

        [Function("GetTravelcard")]
        public async Task<HttpResponseData> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "api/travelcard")] HttpRequestData req)
        {
            try
            {
                // Authorization header: client_id required
                if (!req.Headers.TryGetValues("client_id", out var clientIds))
                {
                    var bad = req.CreateResponse(System.Net.HttpStatusCode.BadRequest);
                    var err = new ErrorResponse { Code = "MissingHeader", Message = "Required header 'client_id' is missing." };
                    await bad.WriteAsJsonAsync(err);
                    return bad;
                }

                var clientId = string.Empty;
                foreach (var v in clientIds) { clientId = v; break; }
                if (string.IsNullOrWhiteSpace(clientId))
                {
                    var bad = req.CreateResponse(System.Net.HttpStatusCode.BadRequest);
                    var err = new ErrorResponse { Code = "InvalidHeader", Message = "Header 'client_id' must be provided." };
                    await bad.WriteAsJsonAsync(err);
                    return bad;
                }

                // Query parameter: number
                var query = System.Web.HttpUtility.ParseQueryString(req.Url.Query);
                var number = query.Get("number");
                if (string.IsNullOrWhiteSpace(number))
                {
                    var bad = req.CreateResponse(System.Net.HttpStatusCode.BadRequest);
                    var err = new ErrorResponse { Code = "MissingQuery", Message = "Query parameter 'number' is required." };
                    await bad.WriteAsJsonAsync(err);
                    return bad;
                }

                var travelcard = await _db.GetTravelcardByNumberAsync(number.Trim());
                if (travelcard == null)
                {
                    var notFound = req.CreateResponse(System.Net.HttpStatusCode.NotFound);
                    var err = new ErrorResponse { Code = "NotFound", Message = "Travelcard not found." };
                    await notFound.WriteAsJsonAsync(err);
                    return notFound;
                }

                // Compose response. travelcardId returned as GUID string; token is a placeholder (no token logic per requirements)
                var resp = req.CreateResponse(System.Net.HttpStatusCode.OK);
                var responseBody = new TravelcardResponse
                {
                    travelcardId = Guid.NewGuid().ToString(),
                    token = "P5SSY6"
                };

                await resp.WriteAsJsonAsync(responseBody);
                return resp;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled error in GetTravelcard");
                var resp = req.CreateResponse(System.Net.HttpStatusCode.InternalServerError);
                var err = new ErrorResponse { Code = "InternalError", Message = "An unexpected error occurred." };
                await resp.WriteAsJsonAsync(err);
                return resp;
            }
        }
    }
}
