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

    public async Task<Event> GetFullEventInfo(string eventId)
    {
        var fullEventDetails = await _dbContext
            .Events.Include(x => x.Attendees)
            .ThenInclude(x => x.User)
            .SingleOrDefaultAsync(x => x.Id == eventId);

        return fullEventDetails;
    }

    public async Task<List<EventListVm>> GetEventsWithHost(
        IQueryable<Event> query,
        int pageSize
    )
    {
        return await query
            .Take(pageSize + 1)
            .ProjectTo<EventListVm>(_mapper.ConfigurationProvider)
            .OrderBy(x => x.Date)
            .ToListAsync();
    }

    public IQueryable<Event> GetQueryableEvents()
    {
        return _dbContext.Events.OrderBy(x => x.Date).AsQueryable();
    }
}
