using Authentication.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace Authentication.Persistence
{
    public class DataSeeder
    {
        public static async Task SeedUser(UserManager<Employee> userManager, RoleManager<Role> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            var users = new List<Employee>
            {
                new Employee
                {
                    UserName = "john",
                    Email = "john@gmail.com",
                    Title = "Software Engineer",
                    Level = 1,
                    Age = 30,
                    PictureUrl = "https://example.com/john.jpg"
                },
                new Employee
                {
                    UserName = "jane",
                    Email = "jane@gmail.com",
                    Title = "Project Manager",
                    Level = 2,
                    Age = 35,
                    PictureUrl = "https://example.com/jane.jpg",
                },
                new Employee
                {
                    UserName = "bob",
                    Email = "bob@gmail.com",
                    Title = "Data Scientist",
                    Level = 3,
                    Age = 28,
                    PictureUrl = "https://example.com/bob.jpg",
                }
            };

            var roles = new List<Role>
            {
                new Role{Name = "Employee"},
                new Role{Name = "Admin"},
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();
                user.RoleId = roleManager.Roles.FirstOrDefault(x => x.Name == "Employee").Id;
                var result = await userManager.CreateAsync(user, "Pa$$w0rd");
                //await userManager.AddToRoleAsync(user, "Employee");
            }

            var admin = new Employee
            {
                UserName = "admin",
                Email= "admin@gmail.com",
                Level = 100,
                Title = "Web Administrator",
                Age = 35,
            };

            admin.RoleId = roleManager.Roles.FirstOrDefault(x => x.Name == "Admin").Id;
            await userManager.CreateAsync(admin, "Pa$$w0rd");
            //await userManager.AddToRoleAsync(admin, "Admin");
        }

    }

}
