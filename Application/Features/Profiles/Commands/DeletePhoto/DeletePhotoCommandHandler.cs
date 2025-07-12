using Application.Contracts.Infrastructure;
using Application.Contracts.Persistence;
using Application.Exceptions;
using Domain;
using MediatR;

namespace Application.Features.Profiles.Commands.DeletePhoto;

public class DeletePhotoCommandHandler : IRequestHandler<DeletePhotoCommand, Result<Unit>>
{
    private readonly IUserAccessor _userAccessor;
    private readonly IPhotoService _photoService;
    private readonly IUserRepository _userRepository;

    public DeletePhotoCommandHandler(
        IUserAccessor userAccessor,
        IPhotoService photoService,
        IUserRepository userRepository
    )
    {
        _userAccessor = userAccessor;
        _photoService = photoService;
        _userRepository = userRepository;
    }

    public async Task<Result<Unit>> Handle(
        DeletePhotoCommand request,
        CancellationToken cancellationToken
    )
    {
        var user = await _userAccessor.GetUserWithPhotosAsync();
        var photo = user.Photos.FirstOrDefault(x => x.Id == request.PhotoId);

        if (photo == null)
        {
            return Result<Unit>.Failure("Photo not found", 400);
        }

        if (photo.Url == user.ImageUrl)
        {
            return Result<Unit>.Failure("Cannot delete main photo", 400);
        }

        await _photoService.DeletePhotoAsync(photo.PublicId);
        user.Photos.Remove(photo);
        var result = await _userRepository.UpdateAsync(user) > 0;

        return result
            ? Result<Unit>.Success(Unit.Value)
            : Result<Unit>.Failure("Problem deleting photo", 400);
    }
}
