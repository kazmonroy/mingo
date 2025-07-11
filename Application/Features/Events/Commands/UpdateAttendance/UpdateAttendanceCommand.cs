using Application.Exceptions;
using MediatR;

namespace Application.Features.Events.Commands.UpdateAttendance;

public class UpdateAttendanceCommand : IRequest<Result<Unit>>
{
    public string Id { get; set; } = string.Empty;
}