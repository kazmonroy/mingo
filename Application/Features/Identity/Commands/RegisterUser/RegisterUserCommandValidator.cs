using FluentValidation;

namespace Application.Features.Identity.Commands.RegisterUser;

public class RegisterUserCommandValidator : AbstractValidator<RegisterUserCommand>
{
    public RegisterUserCommandValidator()
    {
        RuleFor(u => u.DisplayName).NotEmpty().WithMessage("{PropertyName} is required.");
        RuleFor(u => u.Email).NotEmpty().WithMessage("{PropertyName} is required.");
        RuleFor(u => u.Password).NotEmpty().WithMessage("{PropertyName} is required.");
    }
}