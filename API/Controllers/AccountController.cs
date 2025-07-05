using Application.Features.Identity.Commands.RegisterUser;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountController : BaseApiController
{
    private readonly SignInManager<User> _signInManager;

    public AccountController(SignInManager<User> signInManager)
    {
        _signInManager = signInManager;
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> RegisterUser([FromBody] RegisterUserCommand registerCommand)
    {
        var user = new User
        {
            UserName = registerCommand.Email,
            Email = registerCommand.Email,
            DisplayName = registerCommand.DisplayName,
        };

        var result = await _signInManager.UserManager.CreateAsync(user, registerCommand.Password);

        if (result.Succeeded)
        {
            return Ok();
        }

        foreach (var error in result.Errors)
        {
            ModelState.AddModelError(error.Code, error.Description);
        }

        return ValidationProblem();
    }
}
