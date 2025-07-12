using Application.Contracts.Persistence;
using Application.Exceptions;
using AutoMapper;
using MediatR;

namespace Application.Features.Profiles.Queries.GetProfileDetails;

public class GetProfileDetailsQueryCommand
    : IRequestHandler<GetProfileDetailsQuery, Result<ProfileDetailsVm>>
{
    private readonly IUserRepository _userRepository;

    public GetProfileDetailsQueryCommand(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
    }

    public async Task<Result<ProfileDetailsVm>> Handle(
        GetProfileDetailsQuery request,
        CancellationToken cancellationToken
    )
    {
        var profileDetails = await _userRepository.GetProfileDetails(request.UserId);

        if (profileDetails == null)
        {
            return Result<ProfileDetailsVm>.Failure("Profile not found", 404);
        }

        return Result<ProfileDetailsVm>.Success(profileDetails);
    }
}
