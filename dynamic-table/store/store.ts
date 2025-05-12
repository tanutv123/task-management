"use client"
import {createContext, useContext} from "react";
import ProjectTaskStore from "@/store/projectTaskStore";
import UserStore from "@/store/userStore";
interface Store {
    projectTaskStore: ProjectTaskStore;
    userStore: UserStore;
}

export const store: Store = {
    projectTaskStore: new ProjectTaskStore(),
    userStore: new UserStore()
};
