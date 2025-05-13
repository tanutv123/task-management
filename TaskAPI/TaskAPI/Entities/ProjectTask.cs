namespace TaskAPI.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class ProjectTask
    {
        [Key]
        public int Stt { get; set; }

        public required string Title { get; set; }

        public required string Description { get; set; }

        public required DateTime DeadlineFrom { get; set; }

        public required DateTime DeadlineTo { get; set; }

        public required string Status { get; set; }
        public Guid AssigneeId { get; set; }

        public required string Assignee { get; set; }
        public Guid CreatorId { get; set; }

        public required string Creator { get; set; }
        public string Department { get; set; }

        [DataType(DataType.Date)]
        public required DateTime CreatedDate { get; set; }

        [DataType(DataType.Date)]
        public DateTime? CompletedDate { get; set; }

        public ICollection<Subtask> Subtasks { get; set; } = new List<Subtask>();
    }

}
