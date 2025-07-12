using Application.Features.Profiles.Queries.GetProfilePhotosList;
using Domain;

namespace Application.Contracts.Persistence;

public interface IPhotoRepository
{
    Task<List<Photo>> GetProfilePhotosList (string userId);
}