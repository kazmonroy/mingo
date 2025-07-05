using System.ComponentModel.DataAnnotations;

namespace Application.Features.Identity.Commands.RegisterUser;

public class RegisterUserCommand
{
    public string DisplayName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
