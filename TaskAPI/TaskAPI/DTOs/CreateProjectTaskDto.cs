using System.ComponentModel.DataAnnotations;
using TaskAPI.Entities;

namespace TaskAPI.DTOs
{
    public class CreateProjectTaskDto
    {
        public int Stt { get; set; }
        [Required]

        public string Title { get; set; }
        [Required]

        public string Description { get; set; }
        [Required]

        public DateTime DeadlineFrom { get; set; }
        [Required]

        public DateTime DeadlineTo { get; set; }
        [Required]

        public string Status { get; set; }
        [Required]
        public Guid AssigneeId { get; set; }

        [Required]
        public Guid CreatorId { get; set; }
        public string Department { get; set; }
        [Required]

        [DataType(DataType.Date)]
        public DateTime CreatedDate { get; set; }

        [DataType(DataType.Date)]
        public DateTime? CompletedDate { get; set; }

        public ICollection<Subtask> Subtasks { get; set; } = new List<Subtask>();
    }

}
