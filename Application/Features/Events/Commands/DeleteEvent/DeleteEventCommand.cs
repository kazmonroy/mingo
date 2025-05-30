using MediatR;

namespace Application.Features.Events.Commands.DeleteEvent;

public class DeleteEventCommand : IRequest
{
    public string Id { get; set; } = string.Empty;
}