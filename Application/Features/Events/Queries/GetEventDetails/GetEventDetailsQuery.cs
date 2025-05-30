using MediatR;

namespace Application.Features.Events.Queries.GetEventDetails;

public class GetEventDetailsQuery : IRequest<EventDetailsVm>
{
    public string Id { get; set; }
}