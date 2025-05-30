using Application.Features.Events.Commands.DeleteEvent;
using Application.Features.Events.Queries.GetEventDetails;
using Application.Features.Events.Queries.GetEventsList;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class EventsController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<EventListVm>>> GetEvents()
    {
        var dtos = await Mediator.Send(new GetEventsListQuery());
        return Ok(dtos);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<EventListVm>> GetEventDetails(string id)
    {
        var eventDto = await Mediator.Send(new GetEventDetailsQuery() { Id = id });

        return Ok(eventDto);
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
}
