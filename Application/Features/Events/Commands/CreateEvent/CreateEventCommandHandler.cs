using Application.Contracts.Persistence;
using Application.Exceptions;
using AutoMapper;
using Domain;
using MediatR;

namespace Application.Features.Events.Commands.CreateEvent;

public class CreateEventCommandHandler : IRequestHandler<CreateEventCommand, Result<string>>
{
    private readonly IMapper _mapper;
    private readonly IAsyncRepository<Event> _eventRepository;

    public CreateEventCommandHandler(IMapper mapper, IAsyncRepository<Event> eventRepository)
    {
        _mapper = mapper;
        _eventRepository = eventRepository;
    }

    public async Task<Result<string>> Handle(
        CreateEventCommand request,
        CancellationToken cancellationToken
    )
    {
        var newEvent = _mapper.Map<Event>(request);

        var result = await _eventRepository.AddAsync(newEvent);

        if (result == null)
        {
            return Result<string>.Failure("Failed to create the event.", 400);
        }

        return Result<string>.Success(result.Id);
    }
}
