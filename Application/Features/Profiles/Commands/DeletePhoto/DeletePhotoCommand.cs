using Application.Exceptions;
using MediatR;

namespace Application.Features.Profiles.Commands.DeletePhoto;

public class DeletePhotoCommand : IRequest<Result<Unit>>
{
    public string PhotoId { get; set; } = string.Empty;
}