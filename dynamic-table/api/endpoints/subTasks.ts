import { Subtask } from "@/types/project-task.model";
import {createRequests} from "@/api/requests";
import {taskEndpoint} from "@/api/axios";

const requests = createRequests(taskEndpoint);

const Subtasks = {
    getSubtasksByProjectTaskId: (id: number) => requests.get<Subtask[]>("ProjectTasks/subtasks/" + id),
    update: (id: number, subtasks: Subtask[]) =>
        requests.put("ProjectTasks/subtasks/", {
            projectTaskId: id,
            subTasks: subtasks
        })
};

export default Subtasks;
