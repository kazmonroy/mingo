using Application.Contracts.Persistence;
using AutoMapper;
using Domain;
using MediatR;

namespace Application.Features.Events.Commands.CreateEvent;

public class CreateEventCommandHandler : IRequestHandler<CreateEventCommand, string>
{
    private readonly IMapper _mapper;
    private readonly IAsyncRepository<Event> _eventRepository;

    public CreateEventCommandHandler(IMapper mapper, IAsyncRepository<Event> eventRepository)
    {
        _mapper = mapper;
        _eventRepository = eventRepository;
    }

    public async Task<string> Handle(
        CreateEventCommand request,
        CancellationToken cancellationToken
    )
    {
        var newEvent = _mapper.Map<Event>(request);
        var validator = new CreateEventCommandValidator();
        var validationResult = await validator.ValidateAsync(request);

        if (validationResult.Errors.Count > 0)
        {
            throw new Exception(
                "Validation failed: "
                    + string.Join(", ", validationResult.Errors.Select(e => e.ErrorMessage))
            );
        }

        newEvent = await _eventRepository.AddAsync(newEvent);

        return newEvent.Id;
    }
}
