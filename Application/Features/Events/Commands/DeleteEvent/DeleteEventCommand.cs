using Application.Exceptions;
using MediatR;

namespace Application.Features.Events.Commands.DeleteEvent;

public class DeleteEventCommand : IRequest<Result<Unit>>
{
    public string Id { get; set; } = string.Empty;
}