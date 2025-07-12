using Application.Contracts.Persistence;
using Application.Exceptions;
using AutoMapper;
using Domain;
using MediatR;

namespace Application.Features.Profiles.Queries.GetProfilePhotosList;

public class GetProfilePhotosListQueryHandler
    : IRequestHandler<GetProfilePhotosListQuery, Result<List<ProfilePhotosListVm>>>
{
    private readonly IPhotoRepository _photoRepository;
    private readonly IMapper _mapper;

    public GetProfilePhotosListQueryHandler(IPhotoRepository photoRepository, IMapper mapper)
    {
        _photoRepository = photoRepository;
        _mapper = mapper;
    }

    public async Task<Result<List<ProfilePhotosListVm>>> Handle(
        GetProfilePhotosListQuery request,
        CancellationToken cancellationToken
    )
    {
        var photos = await _photoRepository.GetProfilePhotosList(request.UserId);
        
        var profilePhotosVm = _mapper.Map<List<ProfilePhotosListVm>>(photos);

        return Result<List<ProfilePhotosListVm>>.Success(profilePhotosVm);
    }
}
