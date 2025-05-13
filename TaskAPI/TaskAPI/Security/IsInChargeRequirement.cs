using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using TaskAPI.Persistence;

namespace TaskAPI.Security
{
    public class IsInChargeRequirement : IAuthorizationRequirement
    {
    }
    public class IsInChargeRequirementHandler : AuthorizationHandler<IsInChargeRequirement>
    {
        private readonly AppDbContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IsInChargeRequirementHandler(AppDbContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _httpContextAccessor = httpContextAccessor;
        }
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsInChargeRequirement requirement)
        {
            var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Task.CompletedTask;
            }

            var projectTaskId = int.Parse(
                _httpContextAccessor.HttpContext?.Request.RouteValues.SingleOrDefault(x => x.Key == "id").Value?.ToString() ?? "");
            if (projectTaskId == 0)
            {
                return Task.CompletedTask;
            }
            var projectTask = _dbContext.ProjectTasks.FirstOrDefault(x => x.Stt == projectTaskId);
            if (projectTask == null)
            {
                return Task.CompletedTask;
            }
            var isValid = projectTask.AssigneeId.ToString() == userId || 
                projectTask.CreatorId.ToString() == userId || 
                context.User.FindFirst("Department")?.Value == "Admin";
            if (isValid)
            {
                context.Succeed(requirement);
            }
            return Task.CompletedTask;
        }
    }
}