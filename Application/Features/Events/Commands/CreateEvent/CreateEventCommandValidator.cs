using Application.Contracts.Persistence;
using Domain;
using FluentValidation;

namespace Application.Features.Events.Commands.CreateEvent;

public class CreateEventCommandValidator : AbstractValidator<CreateEventCommand>
{
    public CreateEventCommandValidator()
    {
        RuleFor(e => e.Title)
            .NotEmpty()
            .WithMessage("{PropertyName} is required.")
            .NotNull()
            .MaximumLength(100)
            .WithMessage("{PropertyName} must not exceed 100 characters.");
        RuleFor(e => e.Description).NotEmpty().WithMessage("{PropertyName} is required.");

        RuleFor(e => e.Date)
            .GreaterThan(DateTime.UtcNow)
            .WithMessage("{PropertyName} must be in the future.");
        RuleFor(e => e.Category).NotEmpty().WithMessage("{PropertyName} is required.");
        RuleFor(e => e.City).NotEmpty().WithMessage("{PropertyName} is required.");
        RuleFor(e => e.Venue).NotEmpty().WithMessage("{PropertyName} is required.");
        RuleFor(e => e.Latitude)
            .InclusiveBetween(-90, 90)
            .WithMessage("{PropertyName} must be between -90 and 90 degrees.");
        RuleFor(e => e.Longitude)
            .InclusiveBetween(-180, 180)
            .WithMessage("{PropertyName} must be between -180 and 180 degrees.");
    }
}
