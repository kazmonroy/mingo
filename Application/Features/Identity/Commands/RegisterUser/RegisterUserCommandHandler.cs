using Application.Exceptions;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Features.Identity.Commands.RegisterUser;

public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, Result<Unit>>
{
    private readonly UserManager<User> _userManager;

    public RegisterUserCommandHandler(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    public async Task<Result<Unit>> Handle(
        RegisterUserCommand request,
        CancellationToken cancellationToken
    )
    {
        var user = new User
        {
            DisplayName = request.DisplayName,
            Email = request.Email,
            UserName = request.Email,
        };

        var result = await _userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
        {
            return Result<Unit>.Failure("Registration failed", 400);
        }

        return Result<Unit>.Success(Unit.Value);
    }
}
