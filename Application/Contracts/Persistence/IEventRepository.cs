using Application.Exceptions;
using Application.Features.Events.Queries.GetEventDetails;
using Application.Features.Events.Queries.GetEventsList;
using Domain;
using MediatR;

namespace Application.Contracts.Persistence;

public interface IEventRepository : IAsyncRepository<Event>
{
    Task<EventDetailsVm> ListEventWithAttendees(string eventId);
    Task<Event> GetFullEventInfo(string eventId);
    Task<List<EventListVm>> GetEventsWithHost(IQueryable<Event> query, int pageSize);
    IQueryable<Event> GetQueryableEvents();
    Task<List<Event>> GetUserEvents(string userId, string? period);
    

}