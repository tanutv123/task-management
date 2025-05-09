"use client"
import {createContext, useContext} from "react";
import ProjectTaskStore from "@/store/projectTaskStore";
interface Store {
    projectTaskStore: ProjectTaskStore;
}

export const store: Store = {
    projectTaskStore: new ProjectTaskStore()
};
