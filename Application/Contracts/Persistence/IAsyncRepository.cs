namespace Application.Contracts.Persistence;

public interface IAsyncRepository<T>
{
    Task<T> GetByIdAsync(string id);
    Task<IReadOnlyList<T>> ListAllAsync();
    Task<T> AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task<int> DeleteAsync(T entity);
}