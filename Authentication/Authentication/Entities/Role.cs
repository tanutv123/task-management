using Microsoft.AspNetCore.Identity;

namespace Authentication.Entities
{
    public class Role : IdentityRole<Guid>
    {
        public ICollection<Employee> Employees { get; set; } = new List<Employee>();
    }
}
