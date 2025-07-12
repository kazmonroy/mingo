using Application.Exceptions;
using MediatR;

namespace Application.Features.Profiles.Commands.SetMainPhoto;

public class SetMainPhotoCommand : IRequest<Result<Unit>>
{
    public string PhotoId { get; set; } = string.Empty;
}