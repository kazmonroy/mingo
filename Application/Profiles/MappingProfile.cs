using Application.Features.Events.Commands.CreateEvent;
using Application.Features.Events.Commands.UpdateEvent;
using Application.Features.Events.Queries.GetEventDetails;
using Application.Features.Events.Queries.GetEventsList;
using Application.Features.Profiles.Commands;
using Application.Features.Profiles.Queries.GetProfilePhotosList;
using AutoMapper;
using Domain;

namespace Application.Profiles;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Event, EventListVm>()
            .ForMember(
                d => d.HostDisplayName,
                o => o.MapFrom(s => s.Attendees.FirstOrDefault(a => a.IsHost)!.User.DisplayName)
            ).ReverseMap();
        CreateMap<Event, CreateEventCommand>().ReverseMap();
        CreateMap<Event, UpdateEventCommand>().ReverseMap();
        CreateMap<Event, EventDetailsVm>()
            .ForMember(
                d => d.HostDisplayName,
                o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost)!.User.DisplayName)
            )
            .ForMember(
                d => d.HostId,
                o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost)!.User.Id)
            );

        CreateMap<EventAttendee, AttendeeDto>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.User.Id))
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.User.Bio))
            .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl));

        CreateMap<Photo, UploadPhotoVm>().ReverseMap();
        CreateMap<Photo, ProfilePhotosListVm>().ReverseMap();
    }
}
