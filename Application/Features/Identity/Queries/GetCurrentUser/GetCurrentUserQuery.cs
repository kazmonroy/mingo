using Application.Exceptions;
using MediatR;

namespace Application.Features.Identity.Queries.GetCurrentUser;

public class GetCurrentUserQuery : IRequest<Result<UserInfoVm>>
{
    
}