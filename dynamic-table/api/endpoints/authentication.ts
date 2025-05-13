import {User, UserLoginForm} from "@/types/user.model";
import axios, {AxiosResponse} from "axios";
import {createRequests} from "@/api/requests";
import {authEndpoint} from "@/api/axios";

const requests = createRequests(authEndpoint);

const Authentication = {
    login: (values: UserLoginForm): Promise<User> => requests.post<User>("auth/login", values),
    logout: () => requests.post("auth/logout", {})
}

export default Authentication;