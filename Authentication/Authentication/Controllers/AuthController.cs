using Authentication.Dtos;
using Authentication.Entities;
using Authentication.Services;
using Azure.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Authentication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<Employee> _userManager;
        private readonly SignInManager<Employee> _signInManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly JwtTokenService _jwtService;

        public AuthController(UserManager<Employee> userManager,
                              SignInManager<Employee> signInManager,
                              RoleManager<Role> roleManager,
                              JwtTokenService jwtService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] LoginDto dto)
        {
            var user = new Employee { UserName = dto.Username, Email = dto.Username, Title = "New", Level = 1, Age = 30 };
            var result = await _userManager.CreateAsync(user, dto.Password);
            if (!result.Succeeded) return BadRequest(result.Errors);
            return Ok("User registered");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _userManager.FindByNameAsync(dto.Username);
            if (user == null || !await _userManager.CheckPasswordAsync(user, dto.Password))
                return Unauthorized();

            var role = await _roleManager.FindByIdAsync(user.RoleId.ToString());
            var token = _jwtService.GenerateToken(user, role.Name);
            Response.Cookies.Append("access_token", token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddHours(24)
            });
            return Ok(new { username = user.UserName, pictureUrl = user.PictureUrl, token });
        }
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Append("access_token", "", new CookieOptions
            {
                Expires = DateTimeOffset.UtcNow.AddDays(-1),
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Path = "/"
            });

            return Ok();
        }

    }
}
