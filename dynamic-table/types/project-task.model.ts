export interface Subtask {
    name: string
    isCompleted: boolean
    priority: number
}

export interface ProjectTask {
    stt?: number
    title: string
    description: string
    deadlineFrom: Date
    deadlineTo: Date
    status: "Hoàn thành" | "Đang thực hiện" | "Chưa bắt đầu"
    assigneeId: string
    assignee: string
    creatorId: string
    creator: string
    department: string
    createdDate: Date
    completedDate?: Date
}
