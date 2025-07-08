namespace Domain;

public class EventAttendee
{
    public string? UserId { get; set; }
    public User User { get; set; }= null!;
    public string? EventId { get; set; }
    public Event Event { get; set; } = null!;
    public bool IsHost { get; set; }
    public DateTime DateJoined { get; set; } = DateTime.UtcNow;
}