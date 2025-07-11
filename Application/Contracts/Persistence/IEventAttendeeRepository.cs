using Application.Features.Events.Commands.UpdateEvent;
using Domain;
using MediatR;

namespace Application.Contracts.Persistence;

public interface IEventAttendeeRepository
{
    Task<EventAttendee> GetEventAttendeeByIdAsync(string userId, string eventId); 
}