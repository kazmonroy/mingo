using System.Security.Claims;
using Application.Contracts.Infrastructure;
using Application.Contracts.Persistence;
using Domain;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Security;

public class UserAccessor : IUserAccessor
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IUserRepository _userRepository;

    public UserAccessor(IHttpContextAccessor httpContextAccessor, IUserRepository userRepository)
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

    public async Task<User> GetUserWithPhotosAsync()
    {
        var userId = GetUserId();
        return await _userRepository.GetUserWithPhotos(userId)
            ?? throw new UnauthorizedAccessException("No user is logged in");
    }
}
