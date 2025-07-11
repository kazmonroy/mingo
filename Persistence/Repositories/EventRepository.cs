using Application.Contracts.Persistence;
using Application.Features.Events.Queries.GetEventDetails;
using Application.Features.Events.Queries.GetEventsList;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories;

public class EventRepository : BaseRepository<Event>, IEventRepository
{
    private readonly MingoDbContext _dbContext;
    private readonly IMapper _mapper;

    public EventRepository(MingoDbContext dbContext, IMapper mapper)
        : base(dbContext)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task<EventDetailsVm> ListEventWithAttendees(string eventId)
    {
        var allEventsWithAttendees = await _dbContext
            .Events.ProjectTo<EventDetailsVm>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(x => x.Id == eventId);

        return allEventsWithAttendees;
    }

    public async Task<Event> GetFullEventInfoWithAttendees(string eventId)
    {
        var fullEventDetails = await _dbContext
            .Events.Include(x => x.Attendees)
            .ThenInclude(x => x.User)
            .SingleOrDefaultAsync(x => x.Id == eventId);

        return fullEventDetails;
    }

    public async Task<List<EventListVm>> GetEventsWithHost()
    {
        return await _dbContext
            .Events.Include(e => e.Attendees)
            .ThenInclude(a => a.User)
            .Where(e => e.Attendees.Any(a => a.IsHost))
            .Select(e => new EventListVm
            {
                Id = e.Id,
                Title = e.Title,
                Date = e.Date,
                Description = e.Description,
                Category = e.Category,
                HostDisplayName = e.Attendees.FirstOrDefault(a => a.IsHost)!.User.DisplayName,
            }).OrderBy(x=> x.Date)
            .ToListAsync();
    }
}
