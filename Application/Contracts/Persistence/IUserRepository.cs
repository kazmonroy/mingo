using Application.Features.Profiles.Queries.GetProfileDetails;
using Domain;

namespace Application.Contracts.Persistence;

public interface IUserRepository : IAsyncRepository<User>
{
    Task<User> GetUserWithPhotos(string userId);
    Task<ProfileDetailsVm> GetProfileDetails(string userId);
}