import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import UpdateProgressDialogContent from "@/components/task-management/update-task/update-progress/UpdateProgressDialogContent";
import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {useStore} from "@/store/useStore";
import UpdateProjectTaskContent
    from "@/components/task-management/update-task/update-projectTask/UpdateProjectTaskContent";

function UpdateProjectTaskDialog() {
    const [ open, setOpen ] = useState(false);
    const { projectTaskStore } = useStore();

    useEffect(() => {
        projectTaskStore.getProjectTask();
    }, [projectTaskStore.selectedProjectId]);

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger onClick={() => setOpen(true)} asChild>
                    <Button variant="outline">Update Task</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-4xl max-h-full overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Update Task</DialogTitle>
                        <DialogDescription>
                            Update Project Task
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-x-2">
                        <UpdateProjectTaskContent setOpen={setOpen} isOpen={open}/>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default observer(UpdateProjectTaskDialog);