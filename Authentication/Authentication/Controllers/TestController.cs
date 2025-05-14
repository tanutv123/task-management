using Authentication.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Authentication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly UserManager<Employee> _userManager;
        private readonly RoleManager<Role> _roleManager;
        public TestController(UserManager<Employee> userManager, RoleManager<Role> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }
        [HttpGet("debug-auth")]
        [AllowAnonymous]
        public IActionResult DebugAuth()
        {
            var cookieToken = Request.Cookies["access_token"];
            var authHeader = Request.Headers["Authorization"].ToString();
            var isAuth = User.Identity?.IsAuthenticated ?? false;

            return Ok(new
            {
                CookieToken = cookieToken,
                AuthHeader = authHeader,
                IsAuthenticated = isAuth
            });
        }

    }
}
