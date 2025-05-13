using System.ComponentModel.DataAnnotations;
using TaskAPI.Entities;

namespace TaskAPI.DTOs
{
    public class ProjectTaskResponse
    {
        public int Stt { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime DeadlineFrom { get; set; }

        public DateTime DeadlineTo { get; set; }

        public string Status { get; set; }
        public Guid AssigneeId { get; set; }

        public string Assignee { get; set; }
        public Guid CreatorId { get; set; }

        public string Creator { get; set; }
        public string Department { get; set; }

        [DataType(DataType.Date)]
        public DateTime CreatedDate { get; set; }

        [DataType(DataType.Date)]
        public DateTime? CompletedDate { get; set; }

        public ICollection<SubTaskResponse> Subtasks { get; set; } = new List<SubTaskResponse>();
    }
    public class SubTaskResponse
    {
        public int Id { get; set; }
        public int Priority { get; set; }
        public string Name { get; set; }
        public bool IsCompleted { get; set; }
    }
}
