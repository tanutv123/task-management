import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "next/client";

const sleep = (delay: number) => new Promise(resolve => setTimeout(resolve, delay));

const createAxiosInstance = (baseURL: string, withCredentials = false): AxiosInstance => {
    const instance = axios.create({ baseURL, withCredentials: withCredentials });

    instance.interceptors.response.use(
        async response => {
            // await sleep(500); // Optional: add delay for dev
            return response;
        },
        (error: AxiosError) => {
            const { data, status, config, headers } = error.response as AxiosResponse;

            switch (status) {
                case 400:
                    if (config.method === 'get' && Object.prototype.hasOwnProperty.call(data.errors, 'id')) {
                        router.push('/not-found');
                    }
                    if (data.errors) {
                        const modelStateErrors = [];
                        for (const key in data.errors) {
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
                    if (headers['www-authenticate']?.startsWith('Bearer error="invalid_token"')) {
                        toast.error('Session expired - please login again');
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
                    router.push('/server-error');
                    break;
            }

            return Promise.reject(error);
        }
    );

    instance.interceptors.request.use(config => {
        // Add token if needed
        // const token = store.commonStore.token;
        // if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    });

    return instance;
};

export const taskEndpoint = createAxiosInstance("http://localhost:5045/api/", true);
export const authEndpoint = createAxiosInstance("http://localhost:5241/api/", true);
