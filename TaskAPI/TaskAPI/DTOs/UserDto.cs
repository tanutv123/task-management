namespace TaskAPI.DTOs
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public int Level { get; set; }
        public string Department { get; set; }

    }
}
