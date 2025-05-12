import { AxiosResponse } from "axios";

export const responseBody = <T>(response: AxiosResponse<T>) => response.data;

export const createRequests = (axiosInstance) => ({
    get: <T>(url: string) => axiosInstance.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axiosInstance.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axiosInstance.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axiosInstance.delete<T>(url).then(responseBody),
});
