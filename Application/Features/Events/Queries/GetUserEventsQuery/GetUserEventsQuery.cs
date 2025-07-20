using Application.Exceptions;
using Application.Features.Events.Queries.GetEventDetails;
using MediatR;

namespace Application.Features.Events.Queries.GetUserEventsQuery;

public class GetUserEventsQuery : IRequest<Result<List<EventDetailsVm>>>
{
    
}