using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Application.Features.Identity.Queries.GetCurrentUser;
using Domain;

public class GetCurrentUserQueryHandler : IRequestHandler<GetCurrentUserQuery, UserInfoVm>
{
    private readonly UserManager<User> _userManager;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public GetCurrentUserQueryHandler(UserManager<User> userManager, IHttpContextAccessor httpContextAccessor)
    {
        _userManager = userManager;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<UserInfoVm> Handle(GetCurrentUserQuery request, CancellationToken cancellationToken)
    {
        var userId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
        {
            
        }

        return new UserInfoVm
        {
            Id = user.Id,
            DisplayName = user.DisplayName,
            Email = user.Email
        };
    }
}