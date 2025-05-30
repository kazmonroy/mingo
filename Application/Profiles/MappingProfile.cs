using Application.Features.Events.Commands.CreateEvent;
using Application.Features.Events.Commands.UpdateEvent;
using Application.Features.Events.Queries.GetEventDetails;
using Application.Features.Events.Queries.GetEventsList;
using AutoMapper;
using Domain;

namespace Application.Profiles;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Event, EventListVm>().ReverseMap();
        CreateMap<Event, EventDetailsVm>().ReverseMap();
        CreateMap<Event, CreateEventCommand>().ReverseMap();
        CreateMap<Event, UpdateEventCommand>().ReverseMap();
    }
}
