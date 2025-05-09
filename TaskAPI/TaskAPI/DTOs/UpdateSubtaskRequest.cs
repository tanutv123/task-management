namespace TaskAPI.DTOs
{
    public class UpdateSubtasksRequest
    {
        public int ProjectTaskId { get; set; }
        public List<SubTaskResponse> SubTasks { get; set; }
    }

}
