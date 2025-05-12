using TaskAPI.Persistence;
using Microsoft.EntityFrameworkCore;


namespace TaskAPI.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<AppDbContext>((sp, options) =>
            {
                //options.AddInterceptors(sp.GetServices<ISaveChangesInterceptor>());
                options.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", builder =>
                {
                    builder
                        .WithOrigins("http://localhost:3000", "http://localhost:5241")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials();
                });
            });

            var userServiceUrl = config["Services:User:BaseUrl"];
            services.AddHttpClient("UserService", client =>
            {
                client.BaseAddress = new Uri(userServiceUrl ?? "");
            });
            return services;
        }
    }
}
