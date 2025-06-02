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

        newEvent = await _eventRepository.AddAsync(newEvent);

        return newEvent.Id;
    }
}
