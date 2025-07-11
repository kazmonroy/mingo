using Application.Contracts.Infrastructure;
using Application.Contracts.Persistence;
using Application.Exceptions;
using Domain;
using MediatR;

namespace Application.Features.Profiles.Commands;

public class UploadPhotoCommandHadler : IRequestHandler<UploadPhotoCommand, Result<Photo>>
{
    private readonly IUserAccessor _userAccessor;
    private readonly IPhotoService _photoService;
    private readonly IAsyncRepository<Photo> _photoRepository;

    public UploadPhotoCommandHadler( IUserAccessor userAccessor, IPhotoService photoService, IAsyncRepository<Photo> photoRepository)
    {
        _userAccessor = userAccessor;
        _photoService = photoService;
        _photoRepository = photoRepository;
    }
    public async Task<Result<Photo>> Handle(UploadPhotoCommand request, CancellationToken cancellationToken)
    {
       var uploadResult = await _photoService.UploadPhotoAsync(request.File);
       if (uploadResult == null)
       {
           return Result<Photo>.Failure("Failed to upload photo",400 );
       }
       
       var  user = await _userAccessor.GetUserAsync();
         if (user == null)
         {
              return Result<Photo>.Failure("User not found", 404);
         }
         
         var photo = new Photo
         {
             Url = uploadResult.Url,
             PublicId = uploadResult.PublicId,
             UserId = user.Id
         };
         
         user.ImageUrl ??= photo.Url;
         var result = await _photoRepository.AddAsync(photo);
         
         if(result == null)
         {
             return Result<Photo>.Failure("Failed to save photo to database", 400);
         }
         
         return Result<Photo>.Success(photo);
          
    }
}