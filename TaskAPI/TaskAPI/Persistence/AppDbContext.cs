using Microsoft.EntityFrameworkCore;
using TaskAPI.Entities;

namespace TaskAPI.Persistence
{

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<ProjectTask> ProjectTasks { get; set; }
        public DbSet<Subtask> Subtasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Optional: Configure relationships & constraints
            //modelBuilder.Entity<ProjectTask>()
            //    .HasMany(p => p.Subtasks)
            //    .WithOne(x => x.)
            //    .OnDelete(DeleteBehavior.Cascade); // Delete subtasks if parent is deleted

            // Optional: Add table names explicitly
            modelBuilder.Entity<ProjectTask>().ToTable("ProjectTasks");
            modelBuilder.Entity<Subtask>().ToTable("Subtasks");
        }
    }

}
