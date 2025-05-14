export interface User {
    id?: string;
    userName: string;
    pictureUrl?: string;
}

export interface UserLoginForm {
    username: string;
    password: string;
}