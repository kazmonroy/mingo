namespace Application.Features.Events.Queries.GetEventsList;

public class EventListVm
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Title { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string HostDisplayName { get; set; } = string.Empty;
    
}
