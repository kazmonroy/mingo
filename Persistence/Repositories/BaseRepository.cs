using Application.Contracts.Persistence;
using Microsoft.EntityFrameworkCore;

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

    public async Task<int> UpdateAsync(T entity)
    {
        _dbContext.Entry(entity).State = EntityState.Modified;
        var result = await _dbContext.SaveChangesAsync();
        return result;
    }

    public async Task<int> DeleteAsync(T entity)
    {
        _dbContext.Set<T>().Remove(entity);
        var result = await _dbContext.SaveChangesAsync();
        return result;
    }
}
