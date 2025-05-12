using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TaskAPI.DTOs;
using TaskAPI.Entities;
using TaskAPI.Extensions;
using TaskAPI.Persistence;
using TaskAPI.Services;

namespace TaskAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProjectTasksController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        private readonly UserService _userService;

        public ProjectTasksController(AppDbContext dbContext, UserService userService)
        {
            _dbContext = dbContext;
            _userService = userService;
        }
        [HttpGet]
        public async Task<IActionResult> GetProjectTasks()
        {
            try
            {
                var tasks = await _dbContext.ProjectTasks.Include(x => x.Subtasks)
                    .Where(x => x.Status != "Đã xóa").ToListAsync();
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
                    Title = t.Title
                });
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Error occured");
            }
        }
        [HttpGet("subtasks/{id}")]
        public async Task<IActionResult> GetSubTasksByProjectTaskId(int id)
        {
            try
            {
                var subtasks = await _dbContext.Subtasks.Where(x => x.ProjectTaskId == id).ToListAsync();
                var result = subtasks.Select(st => new SubTaskResponse
                {
                    Id = st.Id,
                    IsCompleted = st.IsCompleted,
                    Priority = st.Priority,
                    Name = st.Name
                });
                return Ok(result);
            }
            catch(Exception ex)
            {
                return BadRequest("Error while getting subtask");
            }
        }
        [HttpPost]
        public async Task<IActionResult> AddProjectTask(CreateProjectTaskDto projectTaskDto)
        {
            try
            {
                var assignee = await _userService.GetUserByIdAsync(projectTaskDto.AssigneeId.ToString());
                var creator = await _userService.GetUserByIdAsync(projectTaskDto.CreatorId.ToString());
                var projectTask = new ProjectTask
                {
                    Title = projectTaskDto.Title,
                    Description = projectTaskDto.Description,
                    DeadlineFrom = projectTaskDto.DeadlineFrom,
                    DeadlineTo = projectTaskDto.DeadlineTo,
                    Status = projectTaskDto.Status,
                    Assignee = assignee.UserName,
                    AssigneeId = projectTaskDto.AssigneeId,
                    Creator = creator.UserName,
                    CreatorId = projectTaskDto.CreatorId,
                    Department = creator.Department,
                };
                projectTask.CreatedDate = DateTime.UtcNow.GetVietnamLocalTime();
                _dbContext.ProjectTasks.Add(projectTask);
                await _dbContext.SaveChangesAsync();
                return Ok(projectTask);
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
                projectTask.Status = "Đã xóa";
                await _dbContext.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Error occured while deleting project task");
            }
        }
        [HttpPut("{:id}")]
        [Authorize(Policy = "IsInCharge")]
        public async Task<IActionResult> UpdateProjectTask(int id, UpdateProjectTaskDto projectTaskDto)
        {
            try
            {
                var existingTask = await _dbContext.ProjectTasks
                    .Include(t => t.Subtasks)
                    .FirstOrDefaultAsync(t => t.Stt == projectTaskDto.Stt);

                if (existingTask == null)
                {
                    return NotFound();
                }

                //Update task's information 
                existingTask.Status = projectTaskDto.Status;
                existingTask.Title = projectTaskDto.Title;
                existingTask.Description = projectTaskDto.Description;
                existingTask.DeadlineFrom = projectTaskDto.DeadlineFrom;
                existingTask.DeadlineTo = projectTaskDto.DeadlineTo;

                // Save changes
                _dbContext.ProjectTasks.Update(existingTask);
                await _dbContext.SaveChangesAsync();
                return Ok(existingTask);
            }
            catch (Exception ex)
            {
                return BadRequest("Failed to update the tasks");
            }
        }
        [HttpPut("subtasks/{:id}")]
        [Authorize(Policy = "IsInCharge")]
        public async Task<IActionResult> UpdateSubtasks(int id, UpdateSubtasksRequest request)
        {
            try
            {
                var existingSubtasks = await _dbContext.Subtasks
                    .Where(st => st.ProjectTaskId == request.ProjectTaskId)
                    .AsNoTracking()
                    .ToListAsync();

                var incomingIds = request.SubTasks.Select(st => st.Id).ToHashSet();

                // Detect deleted subtasks
                var subtasksToDelete = existingSubtasks
                    .Where(st => !incomingIds.Contains(st.Id))
                    .ToList();

                // Prepare updated or new subtasks
                var updatedSubTasks = request.SubTasks.Select(st => new Subtask
                {
                    Id = st.Id,
                    ProjectTaskId = request.ProjectTaskId,
                    Name = st.Name,
                    Priority = st.Priority,
                    IsCompleted = st.IsCompleted
                }).ToList();

                if(!updatedSubTasks.Any(x => !x.IsCompleted))
                {
                    var existed = await _dbContext.ProjectTasks.FirstOrDefaultAsync(x => x.Stt == request.ProjectTaskId);
                    if (existed == null)
                        throw new Exception("Project Task Not Found!");
                    existed.Status = "Hoàn thành";
                    existed.CompletedDate = DateTime.UtcNow.GetVietnamLocalTime();
                }

                // Apply changes
                _dbContext.Subtasks.RemoveRange(subtasksToDelete);
                _dbContext.Subtasks.UpdateRange(updatedSubTasks);
                await _dbContext.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                // Optionally log ex
                return BadRequest("Failed to update the subtasks");
            }
        }
    }
}
