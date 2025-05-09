using Authentication.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace Authentication.Persistence
{
    public class AppDbContext : IdentityDbContext<Employee, Role, Guid>
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Employee> Employees { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            //builder.Entity<AppUserRole>().HasKey(k => new {k.RoleId, k.UserId});

            builder.Entity<Role>()
                .HasMany(ur => ur.Employees)
                .WithOne(ur => ur.Role)
                .HasForeignKey(ur => ur.RoleId)
                .OnDelete(DeleteBehavior.NoAction)
                .IsRequired();
        }
    }
}
