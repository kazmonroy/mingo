using API.Middleware;
using Application;
using Domain;
using Microsoft.AspNetCore.Identity;
using Persistence;
using Scalar.AspNetCore;

namespace API;

public static class StartupExtensions
{
    public static WebApplication ConfigureServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddApplicationServices();
        builder.Services.AddPersistenceServices(builder.Configuration);
        builder.Services.AddTransient<ExceptionMiddleware>();
        builder
            .Services.AddIdentityApiEndpoints<User>(opt =>
            {
                opt.User.RequireUniqueEmail = true;
            })
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<MingoDbContext>();
        builder.Services.AddCors();
        builder.Services.AddControllers();
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
        app.MapControllers();
        app.MapGroup("api").MapIdentityApi<User>();

        return app;
    }
}
