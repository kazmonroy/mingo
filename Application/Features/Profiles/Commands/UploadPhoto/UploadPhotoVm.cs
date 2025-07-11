namespace Application.Features.Profiles.Commands;

public class UploadPhotoVm
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Url { get; set; } = string.Empty;
    public string PublicId { get; set; } = string.Empty;
    
    // nav properties
    public string UserId { get; set; } = string.Empty;
}