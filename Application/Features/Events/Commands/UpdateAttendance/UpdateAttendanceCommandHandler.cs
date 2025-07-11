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
        var currentEvent = await _eventRepository.GetFullEventInfoWithAttendees(request.Id);
        if (currentEvent == null)
        {
            return Result<Unit>.Failure("Event not found.", 404);
        }

        var user = await _userAccessor.GetUserAsync();
        var attendance = currentEvent.Attendees.FirstOrDefault(x => x.UserId == user.Id);
        var isHost = currentEvent.Attendees.Any(x => x.IsHost && x.UserId == user.Id);
        if (attendance != null)
        {
            if (isHost)
            {
                currentEvent.IsCancelled = !currentEvent.IsCancelled;
            }
            else
            {
                currentEvent.Attendees.Remove(attendance);
            }
        }
        else
        {
            currentEvent.Attendees.Add(
                new EventAttendee
                {
                    UserId = user.Id,
                    EventId = currentEvent.Id,
                    IsHost = false,
                }
            );
        }

        var result = await _eventRepository.UpdateAsync(currentEvent) > 0;

        return result
            ? Result<Unit>.Success(Unit.Value)
            : Result<Unit>.Failure("Problem updating the attendance.", 400);
    }
}
