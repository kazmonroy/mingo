using Application.Features.Events.Queries.GetEventDetails;
using Domain;

namespace Application.Contracts.Persistence;

public interface IEventRepository : IAsyncRepository<Event>
{
    Task<EventDetailsVm> ListEventWithAttendees(string eventId);
}