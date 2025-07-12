using Application.Contracts.Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories;

public class UserRepository : BaseRepository<User>, IUserRepository
{
    private readonly MingoDbContext _dbContext;

    public UserRepository(MingoDbContext dbContext) : base(dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<User> GetUserWithPhotos(string userId)
    {
        var result = await _dbContext
            .Users.Include(x => x.Photos)
            .FirstOrDefaultAsync(x => x.Id == userId);
        return result;
    }
}
