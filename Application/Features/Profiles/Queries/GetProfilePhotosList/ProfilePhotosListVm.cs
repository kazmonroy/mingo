using Domain;

namespace Application.Features.Profiles.Queries.GetProfilePhotosList;

public class ProfilePhotosListVm
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Url { get; set; } = string.Empty;
    public string PublicId { get; set; } = string.Empty;
    public string UserId { get; set; } = string.Empty;
}