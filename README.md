# travelcards Function App (Azure Functions - Isolated Worker - .NET 8)

## Overview
This Azure Functions app exposes a single HTTP GET endpoint to retrieve travelcard information. It connects to a PostgreSQL database via Npgsql using pooled connections (NpgsqlDataSourceBuilder).

Note: This project uses the .NET 8 isolated worker model for Azure Functions.

## Prerequisites
- .NET 8 SDK
- Azure Functions Core Tools (for local development)
- PostgreSQL instance
- Optional: Visual Studio 2022/2023 or VS Code

## Environment variables
The function reads configuration from environment variables. Required keys:
- PostgresConnectionString - Connection string for PostgreSQL. Example:
  "Host=localhost;Username=postgres;Password=postgres;Database=travelcards;Pooling=true"

local.settings.json includes a dummy connection string for local development.

## Local run steps
1. Restore packages: `dotnet restore`
2. Build: `dotnet build`
3. Run locally: `func start` (requires Azure Functions Core Tools) or `dotnet run --project travelcards`.

## Deployment steps (Azure Functions)
1. Ensure the Function App in Azure is configured for .NET 8 (Isolated Worker).
2. Set environment variable `PostgresConnectionString` in the Function App Configuration.
3. Deploy via CI/CD or `func azure functionapp publish <APP_NAME>` or via `dotnet publish` and ZIP deploy.

## Available API endpoints
This project exposes only the HTTP methods implemented in the code. The only implemented HTTP method is GET.

### GET /api/travelcard
1. Endpoint Method: GET
2. Full Route: /api/travelcard
3. Description: Retrieves travelcard information for the given travelcard number. Returns a response containing a travelcardId and a token placeholder.
4. Required Headers:
   - client_id (string) - Client ID provided by IAM. Required.
   - Content-Type: optional for GET (typically not required)
   - X-Correlation-Cust-Id: optional for tracing
5. Query Parameters:
   - number (string) - travelcardNumber to look up. Required.
6. Path Parameters: None
7. Request Body: None (GET request)
8. Example Successful Response (JSON):
{
  "travelcardId": "f4a3c742-e9c6-4c18-8f4b-b76b377b7574",
  "token": "P5SSY6"
}

9. Example Error Responses (JSON):
- Missing header 'client_id':
{
  "Code": "MissingHeader",
  "Message": "Required header 'client_id' is missing."
}

- Missing query parameter 'number':
{
  "Code": "MissingQuery",
  "Message": "Query parameter 'number' is required."
}

- Travelcard not found:
{
  "Code": "NotFound",
  "Message": "Travelcard not found."
}

- Internal server error:
{
  "Code": "InternalError",
  "Message": "An unexpected error occurred."
}

10. Sample CURL command for testing:

curl -X GET "http://localhost:7071/api/travelcard?number=ABC12345678" \
  -H "client_id: your-client-id" \
  -H "Accept: application/json"

Notes:
- The function requires the `client_id` header for basic authorization. The implementation does not perform token generation logic; the `token` value in the response is a placeholder.
- The function queries the `public.travelcards` table by `travelcard_number` using the connection string provided in `PostgresConnectionString`.

## Database integration
- PostgreSQL is used for data storage.
- Npgsql (8.0.3) is used with NpgsqlDataSourceBuilder and pooled connections.
- The connection string key used by the application is `PostgresConnectionString`.

## Project structure
- Program.cs - Host and dependency injection configuration
- host.json - Functions host configuration
- local.settings.json - Local settings for development
- Functions/GetTravelcardFunction.cs - HTTP-triggered function (GET)
- Helpers/DatabaseHelper.cs - Database access helper using NpgsqlDataSource
- Models/Enums.cs - Enums used in the project
- Models/Responses.cs - Response and error DTOs

## Notes and assumptions
- Only GET is implemented as per explicit HTTP method detection rules.
- Business validations and token generation logic are intentionally not implemented beyond required header presence and basic request validation.
- All errors are returned in a structured JSON format.
