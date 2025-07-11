namespace Application.Features.Events.Queries.GetEventDetails;

public class EventDetailsVm
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public bool IsCancelled { get; set; }
    public string HostDisplayName { get; set; } = string.Empty;
    public string HostId { get; set; } = string.Empty;

    // location props
    public string City { get; set; } = string.Empty;
    public string Venue { get; set; } = string.Empty;
    public double Latitude { get; set; }
    public double Longitude { get; set; }

    public ICollection<AttendeeDto> Attendees { get; set; } = new List<AttendeeDto>();
}
