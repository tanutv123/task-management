export interface Subtask {
    name: string
    isCompleted: boolean
    priority: number
}

export interface ProjectTask {
    id?: string
    title: string
    description: string
    deadlineFrom: Date
    deadlineTo: Date
    status: "pending" | "in-progress" | "completed" | "cancelled"
    assignee: string
    creator: string
    createdDate: Date
    completedDate?: Date
    subtasks?: Subtask[]
}
