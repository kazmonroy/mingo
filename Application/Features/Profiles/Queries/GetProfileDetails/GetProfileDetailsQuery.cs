using Application.Exceptions;
using MediatR;

namespace Application.Features.Profiles.Queries.GetProfileDetails;

public class GetProfileDetailsQuery : IRequest<Result<ProfileDetailsVm>>
{
    public string UserId { get; set; } = string.Empty;
}