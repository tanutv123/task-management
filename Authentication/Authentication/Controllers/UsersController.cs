using Authentication.Dtos;
using Authentication.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

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
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(Guid id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            var role = await _roleManager.FindByIdAsync(user.RoleId.ToString());
            if (user == null) return NotFound();
            return Ok(new { user.Id, user.UserName, user.Level, Department = role.Name });
        }
        [HttpGet("persistence")]
        [Authorize]
        public async Task<IActionResult> GetUser()
        {
            var user = await _userManager.FindByIdAsync(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "");
            var role = await _roleManager.FindByIdAsync(user.RoleId.ToString());
            if (user == null) return BadRequest("Session Expired!");
            return Ok(new { user.Id, user.UserName, user.PictureUrl, Department = role.Name});
        }
        [HttpGet("department")]
        [Authorize]
        public async Task<IActionResult> GetUsers()
        {
            var department = User.FindFirst("Department")?.Value;
            var level = User.FindFirst("Level")?.Value;
            var role = await _roleManager.FindByNameAsync(department ?? "");
            var users = await _userManager.Users.Where(x => department == "Admin" || (x.RoleId == role.Id && x.Level < int.Parse(level))).ToListAsync();
            var result = new List<UserDto>();
            foreach (var user in users)
            {
                result.Add(new UserDto
                {
                    Id = user.Id,
                    UserName = user.UserName
                });
            }
            return Ok(result);
        }
    }
}
