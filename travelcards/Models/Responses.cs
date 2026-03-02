namespace Travelcards.Models
{
    public class TravelcardResponse
    {
        public string travelcardId { get; set; } = string.Empty;
        public string token { get; set; } = string.Empty;
    }

    public class ErrorResponse
    {
        public string Code { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
    }
}
