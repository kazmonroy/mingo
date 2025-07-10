using Application.Contracts.Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories;

public class EventRepository : BaseRepository<Event>, IEventRepository
{
    private readonly MingoDbContext _dbContext;

    public EventRepository(MingoDbContext dbContext)
        : base(dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Event> ListEventWithAttendees(string eventId)
    {
        var allEventsWithAttendees = await _dbContext
            .Events.Include(x => x.Attendees)
            .ThenInclude(x => x.User)
            .FirstOrDefaultAsync(x => x.Id == eventId);

        return allEventsWithAttendees;
    }
}
