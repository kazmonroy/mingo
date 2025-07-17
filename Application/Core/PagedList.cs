namespace Application.Exceptions;

public class PagedList<T, TCursor>
{
    public List<T> Items { get; set; } = new List<T>();
    public TCursor? NextCursor { get; set; }
}
