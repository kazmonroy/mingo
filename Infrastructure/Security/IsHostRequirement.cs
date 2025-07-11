using System.Security.Claims;
using Application.Contracts.Persistence;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace Infrastructure.Security;

public class IsHostRequirement : IAuthorizationRequirement { }

public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IEventAttendeeRepository _eventAttendeeRepository;

    public IsHostRequirementHandler(
        IHttpContextAccessor httpContextAccessor,
        IEventAttendeeRepository eventAttendeeRepository
    )
    {
        _httpContextAccessor = httpContextAccessor;
        _eventAttendeeRepository = eventAttendeeRepository;
    }

    protected override async Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        IsHostRequirement requirement
    )
    {
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
        {
            return;
        }

        var httpContext = _httpContextAccessor.HttpContext;

        if (httpContext?.GetRouteValue("id") is not string eventId || string.IsNullOrEmpty(eventId))
        {
            return;
        }

        var attendee = await _eventAttendeeRepository.GetEventAttendeeByIdAsync(userId, eventId);

        if (attendee == null)
        {
            return;
        }

        if (attendee.IsHost)
        {
            context.Succeed(requirement);
        }
    }
}
