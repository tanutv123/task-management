import axios, {AxiosError, AxiosResponse} from "axios";
import {router} from "next/client";
import {toast} from "react-toastify";
import {ProjectTask, Subtask} from "@/types/project-task.model";

const sleep = (delay : number) => {
    return new Promise((resolve) =>{
        setTimeout(resolve, delay);
    });
}

axios.defaults.baseURL = "http://localhost:5045/api/";

axios.interceptors.response.use(async response => {
    // if (import.meta.env.DEV) await sleep(1000);
    // const pagination = response.headers['pagination'];
    // if (pagination) {
    //     response.data = new PaginatedResult(response.data, JSON.parse(pagination));
    //     return response as AxiosResponse<PaginatedResult<any>>;
    // }
    // await sleep(3000)
    return response;
}, (error: AxiosError) => {
    const {data, status, config, headers} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            console.log(data.errors);
            if (config.method === 'get' && Object.prototype.hasOwnProperty.call(data.errors, 'id')) {
                router.push('/not-found');
            }
            if (data.errors) {
                const modelStateErrors = [];
                for(const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key]);
                    }
                }
                throw modelStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            if (status === 401 && headers['www-authenticate']?.startsWith('Bearer error="invalid_token"')) {
                // store.userStore.logout();
                toast.error('Session expired - please login again')
            } else {
                toast.error('Unauthorized');
            }
            break;
        case 403:
            toast.error('Forbidden');
            break;
        case 404:
            router.push('/not-found');
            break;
        case 500:
            // store.commonStore.setServerError(data);
            router.push('/server-error')
            break;
    }
    return Promise.reject(error);
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(config => {
    // const token = store.commonStore.token;
    // if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const ProjectTasks = {
    list: () => requests.get<ProjectTask[]>("ProjectTasks"),
    create: (data: ProjectTask) => requests.post<ProjectTask>("ProjectTasks", data),
    del: (id: number) => requests.del("ProjectTasks/" + id),
    update: (data: ProjectTask) => requests.put(`ProjectTasks/${data.stt}`, {
        data
    })
}

const Subtasks = {
    getSubtasksByProjectTaskId : (id: number) => requests.get<Subtask[]>("ProjectTasks/subtasks/" + id),
    update : (id: number, subtasks: Subtask[]) => requests.put("ProjectTasks/subtasks/", {
        projectTaskId: id,
        subTasks: subtasks
    })
}

const agent = {
    ProjectTasks,
    Subtasks
}

export default agent;
