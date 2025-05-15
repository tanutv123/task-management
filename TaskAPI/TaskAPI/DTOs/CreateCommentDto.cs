using System.ComponentModel.DataAnnotations;
using TaskAPI.Enums;

namespace TaskAPI.DTOs
{
    public class CreateCommentDto
    {
        [Required]
        public string Content { get; set; }
        public CommentType CommentType { get; set; }
        public int? ParentId { get; set; }
    }
}
