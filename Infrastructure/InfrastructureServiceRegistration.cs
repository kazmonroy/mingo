using Application.Contracts.Infrastructure;
using Infrastructure.Photos;
using Infrastructure.Security;
using Microsoft.Extensions.DependencyInjection;
namespace Infrastructure;

public static class InfrastructureServiceRegistration
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
    {
        services.AddScoped<IUserAccessor, UserAccessor>();
        services.AddScoped<IPhotoService, PhotoService>();

        return services;
    }
}
