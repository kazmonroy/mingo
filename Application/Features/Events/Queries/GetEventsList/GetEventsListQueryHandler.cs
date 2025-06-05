using Application.Contracts.Persistence;
using Application.Exceptions;
using AutoMapper;
using Domain;
using MediatR;

namespace Application.Features.Events.Queries.GetEventsList;

public class GetEventsListQueryHandler : IRequestHandler<GetEventsListQuery, Result<List<EventListVm>>>
{
    private readonly IMapper _mapper;
    private readonly IAsyncRepository<Event> _eventRepository;

    public GetEventsListQueryHandler(IMapper mapper, IAsyncRepository<Event>  eventRepository)
    {
        _mapper = mapper;
        _eventRepository = eventRepository;
    }
    public async Task<Result<List<EventListVm>>> Handle(GetEventsListQuery request, CancellationToken cancellationToken)
    {
       var allEvents = (await _eventRepository.ListAllAsync()).OrderBy(x => x.Date);
       var eventListVm =  _mapper.Map<List<EventListVm>>(allEvents);

       return Result<List<EventListVm>>.Success(eventListVm);
    }
}