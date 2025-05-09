import { Button } from "@/components/ui/button"
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import UpdateProgressDialogContent from "@/components/update-task/update-progress/UpdateProgressDialogContent";
import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {useStore} from "@/store/useStore";

function UpdateProgressDialog() {
    const [ open, setOpen ] = useState(false);
    const { projectTaskStore } = useStore();
    const { subTasks } = projectTaskStore

    useEffect(() => {
        projectTaskStore.getProjectSubtasks();
    }, [projectTaskStore.selectedProjectId]);

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger onClick={() => setOpen(true)} asChild>
                    <Button variant="outline">Update Progress</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-4xl max-h-full overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Update Progress</DialogTitle>
                        <DialogDescription>
                            Update Project Progress
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-x-2">
                        <UpdateProgressDialogContent subTasks={subTasks} open={open} setOpenDialog={setOpen} />
                    </div>
                    {/*<DialogFooter className="sm:justify-start">*/}
                    {/*    /!*<Button type="button" variant="secondary">*!/*/}
                    {/*    /!*    Close*!/*/}
                    {/*    /!*</Button>*!/*/}
                    {/*</DialogFooter>*/}
                </DialogContent>
            </Dialog>
        </>
    );
}

export default observer(UpdateProgressDialog);