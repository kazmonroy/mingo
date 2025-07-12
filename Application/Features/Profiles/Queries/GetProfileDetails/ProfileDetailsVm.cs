namespace Application.Features.Profiles.Queries.GetProfileDetails;

public class ProfileDetailsVm
{
    public string Id { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string? Bio { get; set; }
    public string? ImageUrl { get; set; }
}