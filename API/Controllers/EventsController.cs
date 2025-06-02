using Application.Features.Events.Commands.CreateEvent;
using Application.Features.Events.Commands.DeleteEvent;
using Application.Features.Events.Commands.UpdateEvent;
using Application.Features.Events.Queries.GetEventDetails;
using Application.Features.Events.Queries.GetEventsList;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class EventsController : BaseApiController
{
    [HttpGet(Name = "GetAllEvents")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesDefaultResponseType]
    public async Task<ActionResult<List<EventListVm>>> GetEvents()
    {
        var dtos = await Mediator.Send(new GetEventsListQuery());
        return Ok(dtos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<EventDetailsVm>> GetEventDetails(string id)
    {


        return HandleResult(await Mediator.Send(new GetEventDetailsQuery() { Id = id }));
    }

    [HttpPost(Name = "AddEvent")]
    public async Task<ActionResult<CreateEventCommand>> CreateEvent(
        [FromBody] CreateEventCommand createEventCommand
    )
    {
        var newEvent = await Mediator.Send(createEventCommand);
        return Ok(newEvent);
    }

    [HttpDelete("{id}", Name = "DeleteEvent")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesDefaultResponseType]
    public async Task<ActionResult> DeleteEvent(string id)
    {
        var deleteEventCommand = new DeleteEventCommand { Id = id };
        await Mediator.Send(deleteEventCommand);
        return NoContent();
    }

    [HttpPut(Name = "UpdateEvent")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesDefaultResponseType]
    public async Task<ActionResult> UpdateEvent([FromBody] UpdateEventCommand updateEventCommand)
    {
        await Mediator.Send(updateEventCommand);
        return NoContent();
    }
}
