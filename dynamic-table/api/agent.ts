import ProjectTasks from "./endpoints/projectTasks";
import Subtasks from "./endpoints/subtasks";
import Authentication from "@/api/endpoints/authentication";
import Users from "@/api/endpoints/users";

const agent = {
    ProjectTasks,
    Subtasks,
    Authentication,
    Users
};

export default agent;
