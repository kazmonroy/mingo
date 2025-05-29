using Scalar.AspNetCore;

namespace API;

public static class StartupExtensions
{
    public static WebApplication ConfigureServices(this WebApplicationBuilder builder)
    {
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

        app.MapControllers();

        return app;
    }
}
