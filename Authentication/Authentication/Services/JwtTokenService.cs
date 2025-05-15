using Authentication.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Authentication.Services
{
    public class JwtTokenService
    {
        private readonly RSA _rsa;
        private readonly IConfiguration _config;

        public JwtTokenService(IConfiguration config)
        {
            var privateKey = File.ReadAllText("private.key");
            _rsa = RSA.Create();
            _rsa.ImportFromPem(privateKey);
            _config = config;
        }

        public string GenerateToken(Employee user, string department)
        {
            var creds = new SigningCredentials(new RsaSecurityKey(_rsa), SecurityAlgorithms.RsaSha256);

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email ?? string.Empty),
            new Claim(ClaimTypes.Name, user.UserName ?? string.Empty),
            new Claim("PictureUrl", user.PictureUrl),
            new Claim("Level", user.Level.ToString()),
            new Claim("Department", department)
        };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(24),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        //public string GenerateToken(Employee user, string department)
        //{
        //    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"]));
        //    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        //    var claims = new[]
        //    {
        //    new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
        //    new Claim(JwtRegisteredClaimNames.Email, user.Email ?? string.Empty),
        //    new Claim(ClaimTypes.Name, user.UserName ?? string.Empty),
        //    new Claim("Level", user.Level.ToString()),
        //    new Claim("Department", department)
        //    };


        //    var tokenDescriptor = new SecurityTokenDescriptor
        //    {
        //        Subject = new ClaimsIdentity(claims),
        //        Expires = DateTime.UtcNow.AddMinutes(30),
        //        SigningCredentials = creds
        //    };

        //    var tokenHandler = new JwtSecurityTokenHandler();

        //    var token = tokenHandler.CreateToken(tokenDescriptor);
        //    return tokenHandler.WriteToken(token);
        //}
    }
}
