using Application.Contracts.Persistence;
using Application.Exceptions;
using Domain;
using MediatR;

namespace Application.Features.Events.Commands.DeleteEvent;

public class DeleteEventCommandHandler : IRequestHandler<DeleteEventCommand, Result<Unit>>
{
    private readonly IAsyncRepository<Event> _eventRepository;

    public DeleteEventCommandHandler(IAsyncRepository<Event> eventRepository)
    {
        _eventRepository = eventRepository;
    }

    public async Task<Result<Unit>> Handle(
        DeleteEventCommand request,
        CancellationToken cancellationToken
    )
    {
        var eventToBeDeleted = await _eventRepository.GetByIdAsync(request.Id);
        if (eventToBeDeleted == null)
        {
            return Result<Unit>.Failure("Event not found.", 404);
        }

        var result = await _eventRepository.DeleteAsync(eventToBeDeleted) > 0;
        if (!result)
        {
            return Result<Unit>.Failure("Failed to delete the event.", 400);
        }

        return Result<Unit>.Success(Unit.Value);
    }
}
