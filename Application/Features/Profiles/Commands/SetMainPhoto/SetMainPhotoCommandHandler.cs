using Application.Contracts.Infrastructure;
using Application.Contracts.Persistence;
using Application.Exceptions;
using MediatR;

namespace Application.Features.Profiles.Commands.SetMainPhoto;

public class SetMainPhotoCommandHandler : IRequestHandler<SetMainPhotoCommand, Result<Unit>>
{
    private readonly IUserAccessor _userAccessor;
    private readonly IUserRepository _userRepository;

    public SetMainPhotoCommandHandler(IUserAccessor userAccessor, IUserRepository userRepository)
    {
        _userAccessor = userAccessor;
        _userRepository = userRepository;
    }

    public async Task<Result<Unit>> Handle(
        SetMainPhotoCommand request,
        CancellationToken cancellationToken
    )
    {
        var user = await _userAccessor.GetUserWithPhotosAsync();
        var photo = user.Photos.FirstOrDefault(x => x.Id == request.PhotoId);
        if (photo == null)
        {
            return Result<Unit>.Failure("Photo not found", 400);
        }
        user.ImageUrl = photo.Url;
        var result = await _userRepository.UpdateAsync(user) > 0;

        return result
            ? Result<Unit>.Success(Unit.Value)
            : Result<Unit>.Failure("Problem setting main photo", 400);
    }
}
