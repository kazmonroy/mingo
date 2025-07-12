using Application.Exceptions;
using Domain;
using MediatR;

namespace Application.Features.Profiles.Queries.GetProfilePhotosList;

public class GetProfilePhotosListQuery : IRequest<Result<List<ProfilePhotosListVm>>>
{
    public string UserId { get; set; } = string.Empty;
}