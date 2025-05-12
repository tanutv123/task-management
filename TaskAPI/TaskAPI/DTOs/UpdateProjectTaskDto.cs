using System.ComponentModel.DataAnnotations;
using TaskAPI.Entities;

namespace TaskAPI.DTOs
{
    public class UpdateProjectTaskDto
    {
        public int Stt { get; set; }
        [Required]

        public string Title { get; set; }
        [Required]

        public string Description { get; set; }
        [Required]

        public DateTime DeadlineFrom { get; set; }
        public string Status { get; set; }
        [Required]

        public DateTime DeadlineTo { get; set; }
    }

}
