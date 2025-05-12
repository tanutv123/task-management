import {observer} from "mobx-react-lite";
import {Button} from "@/components/ui/button";
import {useStore} from "@/store/useStore";
import {useEffect, useState} from "react";

function UpdateTaskDialogContent() {
    const { projectTaskStore } = useStore();
    const [openProgressDialog, setOpenProgressDialog] = useState(false)
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
    const { selectedProjectId } = projectTaskStore;



    return (
        <>
            <div>
                <h1>Action for project {}</h1>
                <div className={'flex justify-items-center'}>
                    <Button onClick={() => {
                        setOpenProgressDialog(true);
                        projectTaskStore.getProjectSubtasks();
                    }}>
                        Update Progress
                    </Button>
                    <Button>
                        Update Project Details
                    </Button>
                    <Button>
                        Delete Project
                    </Button>
                </div>
            </div>
        </>
    );
}

export default observer(UpdateTaskDialogContent);