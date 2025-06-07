using FluentValidation;

namespace Application.Features.Events.Commands.UpdateEvent;

public class UpdateEventCommandValidator : AbstractValidator<UpdateEventCommand>
{
    public UpdateEventCommandValidator()
    {
        RuleFor(e => e.Title)
            .NotEmpty()
            .WithMessage("{PropertyName} is required.")
            .NotNull()
            .MaximumLength(50)
            .WithMessage("{PropertyName} must not exceed 50 characters.");

        RuleFor(e => e.Date)
            .GreaterThan(DateTime.UtcNow)
            .WithMessage("{PropertyName} must be in the future.");
    }
}
