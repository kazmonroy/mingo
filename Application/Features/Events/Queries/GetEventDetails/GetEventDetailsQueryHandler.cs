using Application.Contracts.Persistence;
using Application.Exceptions;
using AutoMapper;
using Domain;
using MediatR;

namespace Application.Features.Events.Queries.GetEventDetails;

public class GetEventDetailsQueryHandler
    : IRequestHandler<GetEventDetailsQuery, Result<EventDetailsVm>>
{
    private readonly IMapper _mapper;
    private readonly IEventRepository _eventRepository;


    public GetEventDetailsQueryHandler(IMapper mapper, IEventRepository eventRepository)
    {
        _mapper = mapper;
        _eventRepository = eventRepository;
    }

    public async Task<Result<EventDetailsVm>> Handle(
        GetEventDetailsQuery request,
        CancellationToken cancellationToken
    )
    {
        var currentEvent = await _eventRepository.ListEventWithAttendees(request.Id);

        if (currentEvent == null)
        {
            return Result<EventDetailsVm>.Failure("Event not found.", 404);
        }

        var eventDetails = _mapper.Map<EventDetailsVm>(currentEvent);

        return Result<EventDetailsVm>.Success(eventDetails);
    }
}
