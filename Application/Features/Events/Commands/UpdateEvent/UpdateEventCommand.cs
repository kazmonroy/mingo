using Application.Exceptions;
using MediatR;

namespace Application.Features.Events.Commands.UpdateEvent;

public class UpdateEventCommand : IRequest<Result<Unit>>
{
    public string Id { get; set; }
    public string Title { get; set; }
    public DateTime Date { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }
    public bool IsCancelled { get; set; }

    // location props
    public string City { get; set; }
    public string Venue { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}
