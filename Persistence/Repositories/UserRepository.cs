using Application.Contracts.Persistence;
using Application.Features.Profiles.Queries.GetProfileDetails;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories;

public class UserRepository : BaseRepository<User>, IUserRepository
{
    private readonly MingoDbContext _dbContext;
    private readonly IMapper _mapper;

    public UserRepository(MingoDbContext dbContext, IMapper mapper) : base(dbContext)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task<User> GetUserWithPhotos(string userId)
    {
        var result = await _dbContext
            .Users.Include(x => x.Photos)
            .FirstOrDefaultAsync(x => x.Id == userId);
        return result;
    }

    public async Task<ProfileDetailsVm> GetProfileDetails(string userId)
    {
      var profileDetails = await _dbContext.Users.ProjectTo<ProfileDetailsVm>(_mapper.ConfigurationProvider).SingleOrDefaultAsync(x => x.Id == userId);
      return profileDetails;
    }
}
