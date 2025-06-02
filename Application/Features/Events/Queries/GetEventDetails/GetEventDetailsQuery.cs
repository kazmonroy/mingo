using Application.Exceptions;
using MediatR;

namespace Application.Features.Events.Queries.GetEventDetails;

public class GetEventDetailsQuery : IRequest<Result<EventDetailsVm>>
{
    public string Id { get; set; }
}