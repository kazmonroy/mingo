using System.Security.Claims;
using Application.Exceptions;
using Application.Features.Identity.Queries.GetCurrentUser;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

public class GetCurrentUserQueryHandler : IRequestHandler<GetCurrentUserQuery, Result<UserInfoVm>>
{
    private readonly UserManager<User> _userManager;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IMapper _mapper;

    public GetCurrentUserQueryHandler(
        UserManager<User> userManager,
        IHttpContextAccessor httpContextAccessor,
        IMapper mapper
    )
    {
        _userManager = userManager;
        _httpContextAccessor = httpContextAccessor;
        _mapper = mapper;
    }

    public async Task<Result<UserInfoVm>> Handle(
        GetCurrentUserQuery request,
        CancellationToken cancellationToken
    )
    {
        var userId = _httpContextAccessor.HttpContext.User.FindFirstValue(
            ClaimTypes.NameIdentifier
        );
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
        {
            return Result<UserInfoVm>.Failure("User not found.", 404);
        }

        var userInfo = _mapper.Map<UserInfoVm>(user);

        return Result<UserInfoVm>.Success(userInfo);
    }
}
