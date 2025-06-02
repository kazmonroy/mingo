using Application.Contracts.Persistence;
using Application.Exceptions;
using AutoMapper;
using Domain;
using MediatR;

namespace Application.Features.Events.Commands.UpdateEvent;

public class UpdateEventCommandHandler : IRequestHandler<UpdateEventCommand, Result<Unit>>
{
    private readonly IMapper _mapper;
    private readonly IAsyncRepository<Event> _eventRepository;

    public UpdateEventCommandHandler(IMapper mapper, IAsyncRepository<Event> eventRepository)
    {
        _mapper = mapper;
        _eventRepository = eventRepository;
    }

    public async Task<Result<Unit>> Handle(
        UpdateEventCommand request,
        CancellationToken cancellationToken
    )
    {
        var eventToUpdate = await _eventRepository.GetByIdAsync(request.Id);
        if (eventToUpdate is null)
        {
            return Result<Unit>.Failure("Event not found.", 404);
        }

        _mapper.Map(request, eventToUpdate, typeof(UpdateEventCommand), typeof(Event));
        var result = await _eventRepository.UpdateAsync(eventToUpdate) > 0;
        if (!result)
        {
            return Result<Unit>.Failure("Failed to update the event.", 400);
        }

        return Result<Unit>.Success(Unit.Value);
    }
}
