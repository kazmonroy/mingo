namespace Application.Features.Events.Queries.GetEventDetails;

public class AttendeeDto
{
    public string Id { get; set; } = String.Empty;
    public string DisplayName { get; set; } = String.Empty;
    public string? Bio { get; set; }
    public string? ImageUrl { get; set; }
}
