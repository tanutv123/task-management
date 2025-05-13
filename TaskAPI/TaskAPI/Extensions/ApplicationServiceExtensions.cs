using TaskAPI.Persistence;
using Microsoft.EntityFrameworkCore;
using TaskAPI.Services;


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
                        .WithOrigins("https://localhost:3000", "https://localhost:5000")
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
            services.AddHttpContextAccessor();
            services.AddScoped<UserService>();
            return services;
        }
    }
}
