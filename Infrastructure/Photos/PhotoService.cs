using Application.Contracts.Infrastructure;
using Application.Features.Storage;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Photos;

public class PhotoService : IPhotoService
{
    public Task<PhotoUploadResult> UploadPhotoAsync(IFormFile file)
    {
        throw new NotImplementedException();
    }

    public Task<string> DeletePhotoAsync(string publicId)
    {
        throw new NotImplementedException();
    }
}