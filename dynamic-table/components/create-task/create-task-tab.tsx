import {CreateTaskForm} from "@/components/create-task/create-task-form";

export default function CreateTaskTab() {
    return (
        <div className="py-10 w-full">
            <h1 className="text-3xl font-bold mb-6">Create Project Task</h1>
            <CreateTaskForm />
        </div>
    )
}
