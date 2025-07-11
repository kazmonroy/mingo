using FluentValidation;

namespace Application.Features.Profiles.Commands;

public class UploadPhotoCommandValidator : AbstractValidator<UploadPhotoCommand>
{
    public UploadPhotoCommandValidator()
    {
        RuleFor(x => x.File).NotNull()
            .WithMessage("{PropertyName} is required.")
            .Must(file => file.Length > 0)
            .WithMessage("{PropertyName} must have a valid file.");
    }
}