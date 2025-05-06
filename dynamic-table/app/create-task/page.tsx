import {CreateTaskForm} from "@/components/create-task/create-task-form";

const Page = () => {
    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold mb-6">Create Project Task</h1>
            <CreateTaskForm />
        </div>
    )
}

export default Page;