using Application.Exceptions;
using MediatR;

namespace Application.Features.Events.Queries.GetEventsList;

public class GetEventsListQuery : IRequest<Result<PagedList<EventListVm, DateTime?>>>
{
    private const int MaxPageSize = 50;
    public DateTime? Cursor { get; set; }
    private int _pageSize = 4;

    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        
    }
}
