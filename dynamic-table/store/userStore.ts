import {makeAutoObservable} from "mobx";
import {User, UserLoginForm} from "@/types/user.model";
import agent from "@/api/agent";
import {toast} from "react-toastify";
import {router} from "next/client";

export default class UserStore {
    user: User | null = null;
    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }

    setUser = (user: User) => {
        this.user = user;
    }

    login = async (creds: UserLoginForm) => {
        try {
            let user = await agent.Authentication.login(creds);
            if (!user) {
                toast.error("Error while login!");
                return;
            }
            this.user = user;
        } catch (err) {
            console.log(err);
        }
    }
}