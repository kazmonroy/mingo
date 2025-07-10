using Application.Contracts.Persistence;
using Application.Features.Events.Queries.GetEventDetails;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
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
}
