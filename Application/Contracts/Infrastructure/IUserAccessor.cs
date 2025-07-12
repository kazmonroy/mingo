using Domain;

namespace Application.Contracts.Infrastructure;

public interface IUserAccessor
{
    string GetUserId();
    Task<User> GetUserAsync();
    Task<User> GetUserWithPhotosAsync();
}