using Application.Contracts.Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories;

public class EventAttendeeRepository : BaseRepository<EventAttendee>, IEventAttendeeRepository
{
    private readonly MingoDbContext _dbContext;

    public EventAttendeeRepository(MingoDbContext dbContext)
        : base(dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<EventAttendee> GetEventAttendeeByIdAsync(string attendeeId, string eventId)
    {
        var attendee = await _dbContext.EventAttendees.SingleOrDefaultAsync(x =>
            x.UserId == attendeeId & x.EventId == eventId
        );
        
        return attendee;
    }
}
