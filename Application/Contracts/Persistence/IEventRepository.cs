using Application.Exceptions;
using Application.Features.Events.Queries.GetEventDetails;
using Domain;
using MediatR;

namespace Application.Contracts.Persistence;

public interface IEventRepository : IAsyncRepository<Event>
{
    Task<EventDetailsVm> ListEventWithAttendees(string eventId);
    Task<Event> GetFullEventInfoWithAttendees(string eventId);
   
}