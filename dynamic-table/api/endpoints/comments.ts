import {createRequests} from "@/api/requests";
import {taskEndpoint} from "@/api/axios";
import {type Comment} from '@/types/comment'

const requests = createRequests(taskEndpoint);

const Comments = {
    list: (projectTaskId: number): Promise<Comment[]> => requests.get<Comment[]>("Comments/" + projectTaskId),
    post: (projectTaskId:number, data: any): Promise<Comment> => requests.post<Comment>("Comments/" + projectTaskId, data),
};

export default Comments;
