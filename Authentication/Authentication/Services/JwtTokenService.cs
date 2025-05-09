using Authentication.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace Authentication.Services
{
    public class JwtTokenService
    {
        private readonly RSA _rsa;

        public JwtTokenService()
        {
            _rsa = RSA.Create();
            _rsa.ImportFromPem(File.ReadAllText("private.key"));
        }

        public string GenerateToken(Employee user)
        {
            var creds = new SigningCredentials(new RsaSecurityKey(_rsa), SecurityAlgorithms.RsaSha256);

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email ?? string.Empty),
            new Claim(ClaimTypes.Name, user.UserName ?? string.Empty),
            new Claim("Level", user.Level.ToString()),
        };

            var token = new JwtSecurityToken(
                issuer: "http://localhost:5241",
                audience: "http://localhost:5045",
                claims: claims,
                expires: DateTime.UtcNow.AddHours(24),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
