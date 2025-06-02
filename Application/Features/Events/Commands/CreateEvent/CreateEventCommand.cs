using Application.Exceptions;
using Domain;
using MediatR;

namespace Application.Features.Events.Commands.CreateEvent;

public class CreateEventCommand : IRequest<Result<string>>
{
    public string Title { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string Description { get; set; }  = string.Empty;
    public string Category { get; set; } = string.Empty;
    public bool IsCancelled { get; set; }
    
    // location props
    public string City { get; set; }  = string.Empty;
    public string Venue { get; set; } = string.Empty;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    
    public override string ToString()
    {
        return $"Event name: {Title}; On: {Date.ToShortDateString()}; Description: {Description}";
    }
}