namespace Application.Features.Identity.Commands.RegisterUser;

public class RegisterUserResponse
{
    public string UserId { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string Message { get; set; } = "User registered successfully";
}