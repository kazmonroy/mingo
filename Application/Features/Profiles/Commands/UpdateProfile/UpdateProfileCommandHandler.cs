using Application.Contracts.Infrastructure;
using Application.Contracts.Persistence;
using Application.Exceptions;
using AutoMapper;
using MediatR;

namespace Application.Features.Profiles.Commands.UpdateProfile;

public class UpdateProfileCommandHandler : IRequestHandler<UpdateProfileCommand, Result<Unit>>
{
    private readonly IUserAccessor _userAccessor;
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public UpdateProfileCommandHandler(
        IUserAccessor userAccessor,
        IUserRepository userRepository,
        IMapper mapper
    )
    {
        _userAccessor = userAccessor;
        _userRepository = userRepository;
        _mapper = mapper;
    }

    public async Task<Result<Unit>> Handle(
        UpdateProfileCommand request,
        CancellationToken cancellationToken
    )
    {
        var user = await _userAccessor.GetUserAsync();
        if (user == null)
        {
            return Result<Unit>.Failure("User not found", 404);
        }

        user.DisplayName = request.DisplayName;
        user.Bio = string.IsNullOrWhiteSpace(request.Bio) ? null : request.Bio;

        var result = await _userRepository.UpdateAsync(user) > 0;

        return result
            ? Result<Unit>.Success(Unit.Value)
            : Result<Unit>.Failure("Problem updating profile", 400);
    }
}
