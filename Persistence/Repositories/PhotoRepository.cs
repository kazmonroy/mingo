using Application.Contracts.Persistence;
using Application.Features.Profiles.Queries.GetProfilePhotosList;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories;

public class PhotoRepository : IPhotoRepository
{
    private readonly MingoDbContext _dbContext;

    public PhotoRepository(MingoDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Photo>> GetProfilePhotosList(string userId)
    {
        var photos = await _dbContext
            .Users.Where(x => x.Id == userId)
            .SelectMany(x => x.Photos)
            .ToListAsync();
        return photos;
    }
}
