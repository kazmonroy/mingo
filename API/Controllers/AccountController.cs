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
        var result = await Mediator.Send(registerCommand);
        if (result.IsSuccess)
        {
            return Ok();
        }

        return BadRequest(result.Error);
    }

    [AllowAnonymous]
    [HttpGet("user-info")]
    public async Task<ActionResult<UserInfoVm>> GetUserInfo()
    {
        if (User.Identity?.IsAuthenticated == false)
        {
            return NoContent();
        }
        var user = await _signInManager.UserManager.GetUserAsync(User);

        if (user == null)
        {
            return Unauthorized();
        }

        return Ok(
            new UserInfoVm
            {
                DisplayName = user.DisplayName,
                Email = user.Email,
                Id = user.Id,
                ImageUrl = user.ImageUrl
            }
        );

       
    }
    
    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return NoContent();
    }

}
