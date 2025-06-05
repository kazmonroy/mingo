using Application.Exceptions;
using MediatR;

namespace Application.Features.Events.Queries.GetEventsList;

public class GetEventsListQuery : IRequest<Result<List<EventListVm>>>
{
    
}