import { createRequests } from "../requests";
import { taskEndpoint } from "../axios";
import { ProjectTask } from "@/types/project-task.model";

const requests = createRequests(taskEndpoint);

const ProjectTasks = {
    list: () => requests.get<ProjectTask[]>("ProjectTasks"),
    get: (id: number) => requests.get<ProjectTask>("ProjectTasks/" + id),
    create: (data: any) => requests.post<ProjectTask>("ProjectTasks", data),
    del: (id: number) => requests.del("ProjectTasks/" + id),
    update: (id: number, data: any) => requests.put(`ProjectTasks/${id}`, data),
};

export default ProjectTasks;
