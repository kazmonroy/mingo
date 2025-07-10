using Domain;

namespace Application.Contracts.Persistence;

public interface IEventRepository : IAsyncRepository<Event>
{
    Task<Event> ListEventWithAttendees(string eventId);
}