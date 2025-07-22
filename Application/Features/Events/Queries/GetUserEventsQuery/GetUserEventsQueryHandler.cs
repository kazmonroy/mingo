using Application.Contracts.Infrastructure;
using Application.Contracts.Persistence;
using Application.Exceptions;
using Application.Features.Events.Queries.GetEventDetails;
using AutoMapper;
using MediatR;

namespace Application.Features.Events.Queries.GetUserEventsQuery;

public class GetUserEventsQueryHandler :  IRequestHandler<GetUserEventsQuery, Result<List<EventDetailsVm>>>
{
    private readonly IEventRepository _eventRepository;
    private readonly IUserAccessor _userAccessor;
    private readonly IMapper _mapper;


    public GetUserEventsQueryHandler(
        IEventRepository eventRepository,
        IUserAccessor userAccessor, IMapper mapper)
      
    {
        _eventRepository = eventRepository;
        _userAccessor = userAccessor;
        _mapper = mapper;
    }

    public async Task<Result<List<EventDetailsVm>>> Handle(GetUserEventsQuery request, CancellationToken cancellationToken)
    {
        var user = await _userAccessor.GetUserAsync();
        if (user == null)
        {
            return Result<List<EventDetailsVm>>.Failure("User not found", 404);
        }

        var eventsList = await _eventRepository.GetUserEvents(user.Id, request.Period);
           

        var eventsToReturn = _mapper.Map<List<EventDetailsVm>>(eventsList);
        
        return Result<List<EventDetailsVm>>.Success(eventsToReturn);
    }
}