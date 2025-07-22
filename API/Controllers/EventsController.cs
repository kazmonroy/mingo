using Application.Exceptions;
using Application.Features.Events.Commands.CreateEvent;
using Application.Features.Events.Commands.DeleteEvent;
using Application.Features.Events.Commands.UpdateAttendance;
using Application.Features.Events.Commands.UpdateEvent;
using Application.Features.Events.Queries.GetEventDetails;
using Application.Features.Events.Queries.GetEventsList;
using Application.Features.Events.Queries.GetUserEventsQuery;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class EventsController : BaseApiController
{
    [HttpGet(Name = "GetAllEvents")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesDefaultResponseType]
    public async Task<ActionResult<PagedList<EventListVm, DateTime?>>> GetEvents(DateTime? cursor)
    {
        var events = await Mediator.Send(new GetEventsListQuery{Cursor = cursor});
        return HandleResult(events);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<EventDetailsVm>> GetEventDetails(string id)
    {
        return HandleResult(await Mediator.Send(new GetEventDetailsQuery() { Id = id }));
    }

    [HttpPost(Name = "CreateEvent")]
    public async Task<ActionResult<string>> CreateEvent(
        [FromBody] CreateEventCommand createEventCommand
    )
    {
        var newEvent = await Mediator.Send(createEventCommand);
        return HandleResult(newEvent);
    }

    [HttpDelete("{id}", Name = "DeleteEvent")]
    [Authorize(Policy = "IsEventHost")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesDefaultResponseType]
    public async Task<ActionResult<Unit>> DeleteEvent(string id)
    {
        var deleteEventCommand = new DeleteEventCommand { Id = id };

        return HandleResult(await Mediator.Send(deleteEventCommand));
    }

    [HttpPut("{id}",Name = "UpdateEvent")]
    [Authorize(Policy = "IsEventHost")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesDefaultResponseType]
    public async Task<ActionResult<Unit>> UpdateEvent([FromBody] UpdateEventCommand updateEventCommand, string id)
    {
        updateEventCommand.Id = id;
        return HandleResult(await Mediator.Send(updateEventCommand));

    }
    [HttpPost("{id}/attend")]
    public async Task<ActionResult<Unit>> AttendEvent(string id)
    {
        var attendEventCommand = new UpdateAttendanceCommand() { Id = id };
        return HandleResult(await Mediator.Send(attendEventCommand));
    }
    
    [HttpGet("user-events")]
    public async Task<ActionResult<List<EventDetailsVm>>> GetUserEvents(string? period)
    {
        var result = await Mediator.Send(new GetUserEventsQuery{ Period = period });
        return HandleResult(result);
    }
    
    
}
