using Application.Contracts.Infrastructure;
using Application.Contracts.Persistence;
using Application.Exceptions;
using AutoMapper;
using Domain;
using MediatR;

namespace Application.Features.Events.Commands.CreateEvent;

public class CreateEventCommandHandler : IRequestHandler<CreateEventCommand, Result<string>>
{
    private readonly IMapper _mapper;
    private readonly IAsyncRepository<Event> _eventRepository;
    private readonly IAsyncRepository<EventAttendee> _eventAttendeeRepository;
    private readonly IUserAccessor _userAccessor;

    public CreateEventCommandHandler(
        IMapper mapper,
        IAsyncRepository<Event> eventRepository,
        IAsyncRepository<EventAttendee> eventAttendeeRepository,
        IUserAccessor userAccessor
    )
    {
        _mapper = mapper;
        _eventRepository = eventRepository;
        _eventAttendeeRepository = eventAttendeeRepository;
        _userAccessor = userAccessor;
    }

    public async Task<Result<string>> Handle(
        CreateEventCommand request,
        CancellationToken cancellationToken
    )
    {
        var user = await _userAccessor.GetUserAsync();
        var mappedEvent = _mapper.Map<Event>(request);

        var newEvent = await _eventRepository.AddAsync(mappedEvent);

        if (newEvent == null)
        {
            return Result<string>.Failure("Failed to create the event.", 400);
        }

        var attendee = new EventAttendee
        {
            UserId = user.Id,
            EventId = newEvent.Id,
            IsHost = true,
        };

        newEvent.Attendees.Add(attendee);
        await _eventAttendeeRepository.AddAsync(attendee);

        return Result<string>.Success(newEvent.Id);
    }
}
