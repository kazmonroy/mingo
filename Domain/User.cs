using Microsoft.AspNetCore.Identity;

namespace Domain;

public class User : IdentityUser
{
    public string? DisplayName { get; set; }
    public string? Bio { get; set; }
    public string? ImageUrl { get; set; }
    
    // navigation props
    public ICollection<EventAttendee> Events { get; set; } = [];
    public ICollection<Photo> Photos { get; set; } = [];
}