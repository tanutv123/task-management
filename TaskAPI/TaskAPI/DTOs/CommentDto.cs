using TaskAPI.Enums;

namespace TaskAPI.DTOs
{
    public class CommentDto
    {
        public int Id { get; set; }
        public int ProjectTaskId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int? ParentId { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string UserImage { get; set; }
        public CommentType CommentType { get; set; }
    }
}
