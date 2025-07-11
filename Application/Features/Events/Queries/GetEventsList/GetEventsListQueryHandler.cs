using Application.Contracts.Persistence;
using Application.Exceptions;
using AutoMapper;
using Domain;
using MediatR;

namespace Application.Features.Events.Queries.GetEventsList;

public class GetEventsListQueryHandler
    : IRequestHandler<GetEventsListQuery, Result<List<EventListVm>>>
{
    private readonly IMapper _mapper;
    private readonly IEventRepository _eventRepository;

    public GetEventsListQueryHandler(IMapper mapper, IEventRepository eventRepository)
    {
        _mapper = mapper;
        _eventRepository = eventRepository;
    }

    public async Task<Result<List<EventListVm>>> Handle(
        GetEventsListQuery request,
        CancellationToken cancellationToken
    )
    {
        var events = await _eventRepository.GetEventsWithHost();

        if (events == null || !events.Any())
        {
            return Result<List<EventListVm>>.Failure("No events found.", 404);
        }

        return Result<List<EventListVm>>.Success(events);
    }
}
