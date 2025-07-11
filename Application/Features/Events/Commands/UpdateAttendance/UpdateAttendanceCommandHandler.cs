using Application.Contracts.Infrastructure;
using Application.Contracts.Persistence;
using Application.Exceptions;
using Domain;
using MediatR;

namespace Application.Features.Events.Commands.UpdateAttendance;

public class UpdateAttendanceCommandHandler : IRequestHandler<UpdateAttendanceCommand, Result<Unit>>
{
    private readonly IUserAccessor _userAccessor;
    private readonly IEventRepository _eventRepository;

    public UpdateAttendanceCommandHandler(
        IUserAccessor userAccessor,
        IEventRepository eventRepository
    )
    {
        _userAccessor = userAccessor;
        _eventRepository = eventRepository;
    }

    public async Task<Result<Unit>> Handle(
        UpdateAttendanceCommand request,
        CancellationToken cancellationToken
    )
    {
        var currentEvent = await _eventRepository.GetFullEventInfo(request.Id);
        if (currentEvent == null)
        {
            return Result<Unit>.Failure("Event not found.", 404);
        }

        var user = await _userAccessor.GetUserAsync();
        var attendance = currentEvent.Attendees.FirstOrDefault(x => x.UserId == user.Id);
        var isHost = currentEvent.Attendees.Any(x => x.IsHost && x.UserId == user.Id);
        
        UpdateAttendance(currentEvent, attendance, user, isHost);

        var result = await _eventRepository.UpdateAsync(currentEvent) > 0;

        return result
            ? Result<Unit>.Success(Unit.Value)
            : Result<Unit>.Failure("Problem updating the attendance.", 400);
    }

    private void UpdateAttendance(
        Event currentEvent,
        EventAttendee attendance,
        User user,
        bool isHost
    )
    {
        if (attendance != null)
        {
            HandleExistingAttendance(currentEvent, attendance, isHost);
        }
        else
        {
            AddNewAttendance(currentEvent, user);
        }
    }

    private void HandleExistingAttendance(Event currentEvent, EventAttendee attendance, bool isHost)
    {
        if (isHost)
        {
            ToggleEventCancellation(currentEvent);
        }
        else
        {
            RemoveAttendance(currentEvent, attendance);
        }
    }

    private void ToggleEventCancellation(Event currentEvent)
    {
        currentEvent.IsCancelled = !currentEvent.IsCancelled;
    }

    private void RemoveAttendance(Event currentEvent, EventAttendee attendance)
    {
        currentEvent.Attendees.Remove(attendance);
    }

    private void AddNewAttendance(Event currentEvent, User user)
    {
        var newAttendance = CreateAttendance(currentEvent.Id, user.Id);
        currentEvent.Attendees.Add(newAttendance);
    }

    private EventAttendee CreateAttendance(string eventId, string userId)
    {
        return new EventAttendee
        {
            UserId = userId,
            EventId = eventId,
            IsHost = false,
        };
    }
}
