import Authentication from "@/api/endpoints/authentication";
import Users from "@/api/endpoints/users";
import Comments from "@/api/endpoints/comments";
import Subtasks from "@/api/endpoints/subTasks";
import ProjectTasks from "@/api/endpoints/projectTasks";

const agent = {
    ProjectTasks,
    Subtasks,
    Authentication,
    Users,
    Comments
};

export default agent;
