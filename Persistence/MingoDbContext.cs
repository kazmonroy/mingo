using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class MingoDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<Event> Events => Set<Event>();
}