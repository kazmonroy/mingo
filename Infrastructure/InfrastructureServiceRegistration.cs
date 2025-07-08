using Application.Contracts.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
namespace Infrastructure;

public static class InfrastructureServiceRegistration
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
    {
        services.AddScoped<IUserAccessor, UserAccessor>();

        return services;
    }
}
