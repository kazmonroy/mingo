using Microsoft.EntityFrameworkCore;
using Application.Contracts.Persistence;
namespace Persistence.Repositories;

public class BaseRepository<T> : IAsyncRepository<T>
    where T : class
{
    private readonly MingoDbContext _dbContext;

    public BaseRepository(MingoDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<T> GetByIdAsync(string id)
    {
        return await _dbContext.Set<T>().FindAsync(id);
    }

    public async Task<IReadOnlyList<T>> ListAllAsync()
    {
        return await _dbContext.Set<T>().ToListAsync();
    }

    public async Task<T> AddAsync(T entity)
    {
        await _dbContext.Set<T>().AddAsync(entity);
        await _dbContext.SaveChangesAsync();
        return entity;
    }

    public async Task UpdateAsync(T entity)
    {
        _dbContext.Entry(entity).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(T entity)
    {
        _dbContext.Set<T>().Remove(entity);
        await _dbContext.SaveChangesAsync();
    }
}
