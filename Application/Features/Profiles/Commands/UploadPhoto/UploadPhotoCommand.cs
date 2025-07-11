using Application.Exceptions;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Features.Profiles.Commands;

public class UploadPhotoCommand : IRequest<Result<Photo>>
{
    public IFormFile File { get; set; } = null!;
}