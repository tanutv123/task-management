export interface Subtask {
    name: string
    isCompleted: boolean
    priority: number
}

export interface ProjectTask {
    stt?: string
    title: string
    description: string
    deadlineFrom: Date
    deadlineTo: Date
    status: "Hoàn thành" | "Đang thực hiện" | "Chưa bắt đầu"
    assignee: string
    creator: string
    createdDate: Date
    completedDate?: Date
    subtasks?: Subtask[]
}
