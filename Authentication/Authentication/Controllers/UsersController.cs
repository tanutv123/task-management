using Authentication.Entities;
using Authentication.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Authentication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<Employee> _userManager;
        private readonly RoleManager<Role> _roleManager;

        public UsersController(UserManager<Employee> userManager, RoleManager<Role> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }
        [HttpGet("{:id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            var role = await _roleManager.FindByIdAsync(user.RoleId.ToString());
            if (user == null) return NotFound();
            return Ok(new { user.UserName, user.Level, Department = role.Name });
        }
    }
}
