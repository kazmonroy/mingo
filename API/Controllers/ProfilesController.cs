using Application.Features.Profiles.Commands;
using Application.Features.Profiles.Commands.DeletePhoto;
using Application.Features.Profiles.Commands.SetMainPhoto;
using Application.Features.Profiles.Queries.GetProfilePhotosList;
using Domain;
using MediatR;
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
    public async Task<ActionResult<List<ProfilePhotosListVm>>> GetUserProfilePhotosList(
        string userId
    )
    {
        var result = await Mediator.Send(new GetProfilePhotosListQuery { UserId = userId });
        return HandleResult(result);
    }

    [HttpDelete("{photoId}/photos")]
    public async Task<ActionResult<Unit>> DeletePhoto(string photoId)
    {
        var result = await Mediator.Send(new DeletePhotoCommand { PhotoId = photoId });
        return HandleResult(result);
    }

    [HttpPut("{photoId}/set-main")]
    public async Task<ActionResult<Unit>> SetMainPhoto(string photoId)
    {
        var result = await Mediator.Send(new SetMainPhotoCommand { PhotoId = photoId });
        return HandleResult(result);
    }
}
