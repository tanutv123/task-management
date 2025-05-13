using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using System.Text;
using TaskAPI.Security;
//using TaskAPI.Security;

namespace TaskAPI.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            var publicKeyText = File.ReadAllText("public.key");
            var rsa = RSA.Create();
            rsa.ImportFromPem(publicKeyText);
            var rsaKey = new RsaSecurityKey(rsa);

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = rsaKey,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        if (context.Request.Cookies.ContainsKey("access_token"))
                        {
                            context.Token = context.Request.Cookies["access_token"];
                        }
                        return Task.CompletedTask;
                    }
                };

            });

            services.AddAuthorization(opt =>
            {
                opt.AddPolicy("IsInCharge", policy =>
                {
                    policy.Requirements.Add(new IsInChargeRequirement());
                });
            });

            services.AddTransient<IAuthorizationHandler, IsInChargeRequirementHandler>();
            return services;
        }
    }
}
