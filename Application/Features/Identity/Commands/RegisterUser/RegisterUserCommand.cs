using System.ComponentModel.DataAnnotations;
using Application.Exceptions;
using MediatR;

namespace Application.Features.Identity.Commands.RegisterUser;

public class RegisterUserCommand : IRequest<Result<Unit>>
{
    public string DisplayName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
