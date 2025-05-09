using Microsoft.AspNetCore.Identity;

namespace Authentication.Entities
{
    public class Employee : IdentityUser<Guid>
    {
        public string Title { get; set; }
        public int Level { get; set; }
        public int Age { get; set; }
        public string? PictureUrl { get; set; }
        public Guid RoleId { get; set; }
        public Role Role { get; set; }
    }
}
