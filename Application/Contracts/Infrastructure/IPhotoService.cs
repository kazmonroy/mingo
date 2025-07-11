using Application.Features.Storage;
using Microsoft.AspNetCore.Http;

namespace Application.Contracts.Infrastructure;

public interface IPhotoService
{
    Task<PhotoUploadResult?> UploadPhotoAsync(IFormFile file);
    Task<string> DeletePhotoAsync(string publicId);
}