import { createRequests } from "../requests";
import { taskEndpoint } from "../axios";
import { ProjectTask } from "@/types/project-task.model";

const requests = createRequests(taskEndpoint);

const ProjectTasks = {
    list: () => requests.get<ProjectTask[]>("ProjectTasks"),
    create: (data: ProjectTask) => requests.post<ProjectTask>("ProjectTasks", data),
    del: (id: number) => requests.del("ProjectTasks/" + id),
    update: (data: ProjectTask) => requests.put(`ProjectTasks/${data.stt}`, { data }),
};

export default ProjectTasks;
