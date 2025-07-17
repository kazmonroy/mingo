using Application.Contracts.Persistence;
using Application.Exceptions;
using AutoMapper;
using Domain;
using MediatR;

namespace Application.Features.Events.Queries.GetEventsList;

public class GetEventsListQueryHandler
    : IRequestHandler<GetEventsListQuery, Result<PagedList<EventListVm, DateTime?>>>
{
    private readonly IMapper _mapper;
    private readonly IEventRepository _eventRepository;

    public GetEventsListQueryHandler(IMapper mapper, IEventRepository eventRepository)
    {
        _mapper = mapper;
        _eventRepository = eventRepository;
    }

    public async Task<Result<PagedList<EventListVm, DateTime?>>> Handle(
        GetEventsListQuery request,
        CancellationToken cancellationToken
    )
    {
        
        var query = _eventRepository.GetQueryableEvents();

        if (request.Cursor.HasValue)
        {
            query = query.Where(x => x.Date >= request.Cursor.Value);
        }
        var events = await _eventRepository.GetEventsWithHost(query, request.PageSize);

        if (events == null || !events.Any())
        {
            return Result<PagedList<EventListVm, DateTime?>>.Failure("No events found.", 404);
        }

        DateTime? nextCursor = null;
        if (events.Count > request.PageSize)
        {
            nextCursor = events.Last().Date;
            events.RemoveAt(events.Count - 1);
        }

        var pagedList = new PagedList<EventListVm, DateTime?>
        {
            Items = events,
            NextCursor = nextCursor
        };

        return Result<PagedList<EventListVm, DateTime?>>.Success(pagedList);
    }
}
