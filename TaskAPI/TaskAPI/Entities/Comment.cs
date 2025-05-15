using TaskAPI.Enums;

namespace TaskAPI.Entities
{
    public class Comment
    {
        public int Id { get; set; }

        public int ProjectTaskId { get; set; }

        public Guid UserId { get; set; } = Guid.Empty;

        public string UserName { get; set; } = null!;

        public string? UserImage { get; set; }

        public string Content { get; set; } = null!;

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public int? ParentId { get; set; }

        public CommentType? CommentType { get; set; }

        // Navigation property to parent comment
        public Comment? Parent { get; set; }

        // Navigation property for replies
        public ICollection<Comment> Replies { get; set; } = new List<Comment>();
    }

}
