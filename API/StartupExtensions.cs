using Application;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Scalar.AspNetCore;

namespace API;

public static class StartupExtensions
{
    public static WebApplication ConfigureServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddApplicationServices();
        builder.Services.AddPersistenceServices(builder.Configuration);
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

        app.UseCors(o =>
            o.AllowAnyHeader()
                .AllowAnyMethod()
                .WithOrigins("http://localhost:3000", "https://localhost:3000")
                .AllowCredentials()
        );
        app.MapControllers();

        return app;
    }
}
