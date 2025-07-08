using System.Security.Claims;
using Application.Contracts.Infrastructure;
using Application.Contracts.Persistence;
using Domain;
using Microsoft.AspNetCore.Http;

namespace Infrastructure;

public class UserAccessor : IUserAccessor
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IAsyncRepository<User> _userRepository;

    public UserAccessor(
        IHttpContextAccessor httpContextAccessor,
        IAsyncRepository<User> userRepository
    )
    {
        _httpContextAccessor = httpContextAccessor;
        _userRepository = userRepository;
    }

    public string GetUserId()
    {
        return _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? throw new Exception("User not found");
    }

    public async Task<User> GetUserAsync()
    {
        return await _userRepository.GetByIdAsync(GetUserId())
            ?? throw new UnauthorizedAccessException("No user is logged in");
    }
}
