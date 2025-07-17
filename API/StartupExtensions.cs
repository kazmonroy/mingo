using API.Middleware;
using Application;
using Domain;
using Infrastructure;
using Infrastructure.Photos;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Persistence;
using Scalar.AspNetCore;

namespace API;

public static class StartupExtensions
{
    public static WebApplication ConfigureServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddApplicationServices();
        builder.Services.AddPersistenceServices(builder.Configuration);
        builder.Services.AddInfrastructureServices();
        builder.Services.AddTransient<ExceptionMiddleware>();
        builder
            .Services.AddIdentityApiEndpoints<User>(opt =>
            {
                opt.User.RequireUniqueEmail = true;
            })
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<MingoDbContext>();

        builder.Services.AddCors();
        builder.Services.AddControllers(opt =>
        {
            var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
            opt.Filters.Add(new AuthorizeFilter(policy));
        });

        builder.Services.AddAuthorization(opt =>
        {
            opt.AddPolicy(
                "IsEventHost",
                policy =>
                {
                    policy.Requirements.Add(new IsHostRequirement());
                }
            );
        });
        builder.Services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();
        builder.Services.Configure<CloudinarySettings>(
            builder.Configuration.GetSection("CloudinarySettings")
        );
        builder.Services.AddOpenApi();

        return builder.Build();
    }

    public static WebApplication ConfigurePipeline(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.MapScalarApiReference();
        }

        app.UseMiddleware<ExceptionMiddleware>();
        app.UseCors(o =>
            o.AllowAnyHeader()
                .AllowAnyMethod()
                .WithOrigins("http://localhost:3000", "https://localhost:3000")
                .AllowCredentials()
        );

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseDefaultFiles();
        app.UseStaticFiles();
        app.MapControllers();
        app.MapGroup("api").MapIdentityApi<User>();
        app.MapFallbackToController("Index", "Fallback");

        return app;
    }
}
