using Application.Features.Profiles.Commands;
using Application.Features.Profiles.Queries.GetProfilePhotosList;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ProfilesController : BaseApiController
{
    [HttpPost("upload-photo")]
    public async Task<ActionResult<UploadPhotoVm>> UploadPhoto([FromForm] IFormFile file)
    {
        var result = await Mediator.Send(new UploadPhotoCommand { File = file });
        return HandleResult(result);
    }
    
    [HttpGet("{userId}/photos")]
    public async Task<ActionResult<List<ProfilePhotosListVm>>> GetUserProfilePhotosList(string userId)
    {
        var result = await Mediator.Send(new GetProfilePhotosListQuery { UserId = userId });
        return HandleResult(result);
    }
}
