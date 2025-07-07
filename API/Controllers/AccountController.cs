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
        var result = await Mediator.Send(registerCommand);
        if (result.IsSuccess)
        {
            return Ok();
        }
          
        return BadRequest(result.Error);
    }
}
