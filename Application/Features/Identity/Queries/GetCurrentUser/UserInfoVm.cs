namespace Application.Features.Identity.Queries.GetCurrentUser;

public class UserInfoVm
{
    public string Id { get; set; }
    public string DisplayName { get; set; }
    public string Email { get; set; }
    public string ImageUrl { get; set; }
}