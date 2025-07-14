using Application.Exceptions;
using MediatR;

namespace Application.Features.Profiles.Commands.UpdateProfile;

public class UpdateProfileCommand : IRequest<Result<Unit>>
{
    public string DisplayName { get; set; } = string.Empty;
    public string? Bio { get; set; }
    public string? ImageUrl { get; set; }
}