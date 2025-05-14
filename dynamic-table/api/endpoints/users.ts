import {User} from "@/types/user.model";
import {createRequests} from "@/api/requests";
import {authEndpoint} from "@/api/axios";

const requests = createRequests(authEndpoint);

const Users = {
    getUsersByDepartment: () => requests.get<User[]>("users/department"),
    persistentUser: (): Promise<User> => requests.get<User>("users/persistence"),
}

export default Users;