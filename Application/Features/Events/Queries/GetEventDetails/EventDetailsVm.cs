namespace Application.Features.Events.Queries.GetEventDetails;

public class EventDetailsVm
{
    public string Id { get; set; }
    public string Title { get; set; }
    public DateTime Date { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }
    public bool IsCancelled { get; set; }
    public string HostDisplayName  { get; set; } = String.Empty;
    public string HostId { get; set; } = String.Empty;

    // location props
    public string City { get; set; }
    public string Venue { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    
    public ICollection<AttendeeDto> Attendees { get; set; } = new List<AttendeeDto>();

}
