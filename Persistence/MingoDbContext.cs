using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class MingoDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public DbSet<Event> Events => Set<Event>();
}