using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskAPI.DTOs;
using TaskAPI.Entities;
using TaskAPI.Extensions;
using TaskAPI.Persistence;

namespace TaskAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectTasksController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public ProjectTasksController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetProjectTasks()
        {
            try
            {
                var tasks = await _dbContext.ProjectTasks.Include(x => x.Subtasks).ToListAsync();
                var result = tasks.Select(t => new ProjectTaskResponse
                {
                    Stt = t.Stt,
                    Assignee = t.Assignee,
                    CompletedDate = t.CompletedDate,
                    CreatedDate = t.CreatedDate,
                    Creator = t.Creator,
                    DeadlineFrom = t.DeadlineFrom,
                    DeadlineTo = t.DeadlineTo,
                    Description = t.Description,
                    Status = t.Status,
                    Title = t.Title,
                    Subtasks = t.Subtasks.Select(st => new SubTaskResponse
                    {
                        Id = st.Id,
                        IsCompleted = st.IsCompleted,
                        Name = st.Name
                    }).ToList()
                });
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Error occured");
            }
        }
        [HttpPost]
        public async Task<IActionResult> AddProjectTask(ProjectTask projectTask)
        {
            try
            {
                projectTask.CreatedDate = DateTime.UtcNow.GetVietnamLocalTime();
                _dbContext.ProjectTasks.Add(projectTask);
                await _dbContext.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Error occured while adding project task");
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectTask(int id)
        {
            try
            {
                var projectTask = await _dbContext.ProjectTasks.FirstOrDefaultAsync(x => x.Stt == id);
                _dbContext.ProjectTasks.Remove(projectTask);
                await _dbContext.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Error occured while deleting project task");
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProjectTask(int id, [FromBody] ProjectTask projectTask)
        {
            try
            {
                var existingTask = await _dbContext.ProjectTasks
                    .Include(t => t.Subtasks)
                    .FirstOrDefaultAsync(t => t.Stt == id);

                if (existingTask == null)
                {
                    return NotFound();
                }

                //Update task's information 
                existingTask.Status = projectTask.Status;
                existingTask.Title = projectTask.Title;
                existingTask.Description = projectTask.Description;
                existingTask.CreatedDate = projectTask.CreatedDate;
                existingTask.DeadlineFrom = projectTask.DeadlineFrom;
                existingTask.DeadlineTo = projectTask.DeadlineTo;
                existingTask.Assignee = projectTask.Assignee;
                existingTask.Creator = projectTask.Creator;
                existingTask.Subtasks = projectTask.Subtasks;

                if(existingTask.Status == "Chưa bắt đầu" && existingTask.Subtasks.Any(x => x.IsCompleted))
                {
                    existingTask.Status = "Đang thực hiện";
                }
                if (existingTask.CompletedDate == null && !existingTask.Subtasks.Any(x => !x.IsCompleted))
                {
                    existingTask.CompletedDate = DateTime.UtcNow.GetVietnamLocalTime();
                    existingTask.Status = "Hoàn thành";
                }

                // Save changes
                _dbContext.ProjectTasks.Update(existingTask);
                await _dbContext.SaveChangesAsync();
                return Ok(existingTask);
            }
            catch(Exception ex)
            {
                return BadRequest("Failed to update the tasks");
            }
        }
    }
}
