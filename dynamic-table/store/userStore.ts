import {makeAutoObservable} from "mobx";
import {User, UserLoginForm} from "@/types/user.model";
import agent from "@/api/agent";
import {toast} from "react-toastify";
import {router} from "next/client";

export default class UserStore {
    user: User | null = null;
    departmentUsers: User[] = [];
    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }

    setUser = (user: User) => {
        this.user = user;
    }

    setDepartmentUsers = (users: User[]) => {
        this.departmentUsers = users;
    }

    getDepartmentUsers = async () => {
        try {
            const result = await agent.Users.getUsersByDepartment();
            this.setDepartmentUsers(result);
        } catch {
            toast.error("Error in getting users of your department!");
        }
    }

    login = async (creds: UserLoginForm) => {
        try {
            let user = await agent.Authentication.login(creds);
            if (!user) {
                toast.error("Error while login!");
                return;
            }
            this.setUser(user);
        } catch (err) {
            console.log(err);
        }
    }

    logout = async () => {
        try {
            await agent.Authentication.logout();
        } catch {
            toast.error("Failed to logout")
        }
    }

    persistence = async () => {
        try {
            if (this.user) return;
            let user = await agent.Users.persistentUser();
            this.setUser(user);
        } catch (err) {
            console.log(err);
        }
    }
}