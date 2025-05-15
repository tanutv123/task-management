using Microsoft.AspNetCore.Http;
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
    public class CommentsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public CommentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("id")]
        public IActionResult GetCommentsByTask(int id)
        {
            try
            {
                var comments = _context.Comments
                    .Where(x => x.ProjectTaskId == id).ToList();

                return Ok(comments);
            }
            catch (Exception ex)
            {
                return BadRequest("Error occurred");
            }
        }
        [HttpPost("{id}")]
        public async Task<IActionResult> CreateCommentForTask(int id, CreateCommentDto createProjectTaskDto)
        {
            try
            {
                if (!(await _context.ProjectTasks.AnyAsync(x => x.Stt == id)))
                {
                    return BadRequest("Project Not Found!");
                }
                var comment = new Comment
                {
                    ProjectTaskId = id,
                    Content = createProjectTaskDto.Content,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    ParentId = createProjectTaskDto.ParentId,
                    CommentType = createProjectTaskDto.CommentType,
                    UserId = User.GetUserId(),
                    UserName = User.GetUserName(),
                    UserImage = User.GetPictureUrl(),
                };

                _context.Comments.Add(comment);
                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Error occurred");
            }
        }
    }
}
