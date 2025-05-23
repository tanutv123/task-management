import {makeAutoObservable} from "mobx";
import {ProjectTask, Subtask} from "@/types/project-task.model";
import agent from "@/api/agent";
import {toast} from "react-toastify";

export default class ProjectTaskStore {
    projectTasks: ProjectTask[] = [];
    selectedProjectId: number | null = null;
    selectedProjectTask: ProjectTask | null = null;
    subTasks: Subtask[] = [];
    loading = false;
    loadingSubtask = false;
    constructor() {
        makeAutoObservable(this)
    }

    setProjectTasks = (data: ProjectTask[]) => {
        this.projectTasks = data;
    }

    setProjectTask = (data: ProjectTask) => {
        this.selectedProjectTask = data;
    }

    setProjectSubtasks = (data: Subtask[]) => {
        this.subTasks = data;
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }

    setLoadingSubtask = (state: boolean) => {
        this.loadingSubtask = state;
    }

    setSelectedProjectId = (id: number) => {
        this.selectedProjectId = id;
    }

    getProjectTasks = async () => {
        this.setLoading(true);
        try {
            const result = await agent.ProjectTasks.list();
            this.setProjectTasks(result);
        } catch(err) {
            console.log(err);
        } finally {
            this.setLoading(false);
        }
    }

    getProjectTask = async () => {
        // this.setLoading(true);
        try {
            if (!this.selectedProjectId) return;
            const result = await agent.ProjectTasks.get(this.selectedProjectId);
            this.setProjectTask(result);
        } catch(err) {
            console.log(err);
        }
    }

    getProjectSubtasks = async () => {
        try {
            if (!this.selectedProjectId) {
                toast.error("Project not found");
                return;
            }
            const result = await agent.Subtasks.getSubtasksByProjectTaskId(this.selectedProjectId);
            const sorted = result.sort((a, b) => a.priority - b.priority); // ascending
            // const sorted = result.sort((a, b) => b.priority - a.priority); // descending

            this.setProjectSubtasks(sorted);
        } catch(err) {
            console.log(err);
        }
    }

    createProjectTask = async (data: any) => {
        const result = await agent.ProjectTasks.create(data);
        this.setProjectTasks([...this.projectTasks, result]);
    }

    updateProjectTask = async (data: any) => {
        if (!this.selectedProjectId) return;
        await agent.ProjectTasks.update(this.selectedProjectId, data);
        await this.getProjectTasks();
    }

    updateProjectSubtasks = async (subtasks: Subtask[]) => {
        try {
            if(!this.selectedProjectId) {
                toast.error("Project not found!");
                return;
            }
            console.log(subtasks)
            await agent.Subtasks.update(this.selectedProjectId, subtasks);
            this.setProjectSubtasks(subtasks);
            toast.success("Update Successfully!")
        } catch (err) {
            console.log(err)
        }
    }

}