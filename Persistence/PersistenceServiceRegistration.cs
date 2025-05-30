using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistence.Repositories;
using Application.Contracts.Persistence;
namespace Persistence;

public static class PersistenceServiceRegistration
{
    public static IServiceCollection AddPersistenceServices(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        services.AddDbContext<MingoDbContext>(opt =>
            opt.UseSqlServer(configuration.GetConnectionString("MingoDbConnection"))
        );
        
        services.AddScoped(typeof(IAsyncRepository<>), typeof(BaseRepository<>));
        

        return services;
    }
}


