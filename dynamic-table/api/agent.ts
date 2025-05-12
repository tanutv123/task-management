import ProjectTasks from "./endpoints/projectTasks";
import Subtasks from "./endpoints/subtasks";
import Authentication from "@/api/endpoints/authentication";

const agent = {
    ProjectTasks,
    Subtasks,
    Authentication
};

export default agent;
