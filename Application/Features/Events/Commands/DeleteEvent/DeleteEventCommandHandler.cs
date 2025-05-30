using Application.Contracts.Persistence;
using Domain;
using MediatR;

namespace Application.Features.Events.Commands.DeleteEvent;

public class DeleteEventCommandHandler : IRequestHandler<DeleteEventCommand>
{
    private readonly IAsyncRepository<Event> _eventRepository;

    public DeleteEventCommandHandler(IAsyncRepository<Event> eventRepository)
    {
        _eventRepository = eventRepository;
    }

    public async Task Handle(DeleteEventCommand request, CancellationToken cancellationToken)
    {
        var eventToBeDeleted = await _eventRepository.GetByIdAsync(request.Id);
        if (eventToBeDeleted == null)
        {
            throw new Exception("Event not found");
        }

        await _eventRepository.DeleteAsync(eventToBeDeleted);
    }
}
