using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class MingoDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public DbSet<Event> Events => Set<Event>();
    public DbSet<EventAttendee> EventAttendees => Set<EventAttendee>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<EventAttendee>(x => x.HasKey(e => new { e.EventId, e.UserId }));
        builder
            .Entity<EventAttendee>()
            .HasOne(x => x.User)
            .WithMany(x => x.Events)
            .HasForeignKey(x => x.UserId);
        
        builder
            .Entity<EventAttendee>()
            .HasOne(x => x.Event)
            .WithMany(x => x.Attendees)
            .HasForeignKey(x => x.EventId);
    }
}
