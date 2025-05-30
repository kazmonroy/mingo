using Application.Contracts.Persistence;
using AutoMapper;
using Domain;
using MediatR;

namespace Application.Features.Events.Queries.GetEventDetails;

public class GetEventDetailsQueryHandler :  IRequestHandler<GetEventDetailsQuery, EventDetailsVm>
{
    private readonly IMapper _mapper;
    private readonly IAsyncRepository<Event> _eventRepository;

    public GetEventDetailsQueryHandler(IMapper mapper, IAsyncRepository<Event> eventRepository)
    {
        _mapper = mapper;
        _eventRepository = eventRepository;
    }
    public async Task<EventDetailsVm> Handle(GetEventDetailsQuery request, CancellationToken cancellationToken)
    {
    var currentEvent = await _eventRepository.GetByIdAsync(request.Id);
    return _mapper.Map<EventDetailsVm>(currentEvent);
    }
}