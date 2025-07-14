using Application.Features.Identity.Commands.RegisterUser;
using Application.Features.Identity.Queries.GetCurrentUser;
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
    [HttpPost("sign-up")]
    public async Task<IActionResult> RegisterUser([FromBody] RegisterUserCommand registerCommand)
    {
        var user = new User
        {
            DisplayName = registerCommand.DisplayName,
            Email = registerCommand.Email,
            UserName = registerCommand.Email,
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

    [AllowAnonymous]
    [HttpGet("user-info")]
    public async Task<ActionResult<UserInfoVm>> GetUserInfo()
    {
        if (User.Identity?.IsAuthenticated == false)
        {
            return NoContent();
        }

        var result = await Mediator.Send(new GetCurrentUserQuery());

        return HandleResult(result);
    }

    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return NoContent();
    }
}
