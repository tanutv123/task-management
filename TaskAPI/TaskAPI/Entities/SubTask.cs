namespace TaskAPI.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Subtask
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public bool IsCompleted { get; set; }

        public int ProjectTaskId { get; set; }

        //public ProjectTask ProjectTask { get; set; }
    }

}
