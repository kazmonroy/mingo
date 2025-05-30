using Application.Features.Events.Queries.GetEventDetails;
using Application.Features.Events.Queries.GetEventsList;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class EventsController : BaseApiController
{
    private readonly IMediator _mediator;

    public EventsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<EventListVm>>> GetEvents()
    {
        var dtos = await _mediator.Send(new GetEventsListQuery());
        return Ok(dtos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<EventListVm>> GetEventDetails(string id)
    {
        var eventDto = await _mediator.Send(new GetEventDetailsQuery() { Id = id });

        if (eventDto == null)
        {
            return NotFound();
        }

        return Ok(eventDto); 
    }
}
