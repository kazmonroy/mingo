using Application.Contracts.Persistence;
using AutoMapper;
using Domain;
using MediatR;

namespace Application.Features.Events.Commands.UpdateEvent;

public class UpdateEventCommandHandler : IRequestHandler<UpdateEventCommand>
{
    private readonly IMapper _mapper;
    private readonly IAsyncRepository<Event> _eventRepository;

    public UpdateEventCommandHandler(IMapper mapper, IAsyncRepository<Event> eventRepository)
    {
        _mapper = mapper;
        _eventRepository = eventRepository;
    }

    public async Task Handle(UpdateEventCommand request, CancellationToken cancellationToken)
    {
        var eventToUpdate = await _eventRepository.GetByIdAsync(request.Id);
        if (eventToUpdate is null)
        {
            throw new Exception($"Event with ID {request.Id} not found.");
        }

        var validator = new UpdateEventCommandValidator();
        var validationResult = await validator.ValidateAsync(request);
        if (validationResult.Errors.Count > 0)
        {
            throw new Exception("Validation failed: " + string.Join(", ", validationResult.Errors.Select(e => e.ErrorMessage)));
        }
        
        _mapper.Map(request, eventToUpdate, typeof(UpdateEventCommand), typeof(Event));
        await _eventRepository.UpdateAsync(eventToUpdate); 
    }
}
