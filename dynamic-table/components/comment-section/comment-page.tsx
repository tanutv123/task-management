"use client"

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import CommentSection from "@/components/comment-section/comment-section";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import {useStore} from "@/store/useStore";
import {format} from "date-fns";

function CommentPage() {
    const { projectTaskStore } = useStore();
    const { selectedProjectTask, selectedProjectId } = projectTaskStore;
    useEffect(() => {
        if (!selectedProjectTask) {
            projectTaskStore.getProjectTask();
        }
    }, [ selectedProjectId ]);

    if (!selectedProjectTask) return null;
    return (
        <main className="container mx-auto p-4 max-w-4xl">
            <div className="space-y-8">
                <div className="p-6 border rounded-lg shadow-sm">
                    <h1 className="text-2xl font-bold mb-2">Task: {selectedProjectTask.title}</h1>
                    <p className="text-gray-600 mb-4">
                        {selectedProjectTask.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-4 pt-4 border-t">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 font-medium">Department:</span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">{ selectedProjectTask.department }</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 font-medium">Due:</span>
                            <span className="text-sm">
                                {/*@ts-ignore*/}
                                {format(selectedProjectTask.deadlineTo, "yyyy/MM/dd")}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 ml-auto">
                            <span className="text-sm text-gray-500 font-medium">Created by:</span>
                            <div className="flex items-center gap-1">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src="/user.jpg?height=24&width=24" alt="John Doe" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{selectedProjectTask.creator}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                        <span className="text-sm text-gray-500 font-medium">Assignee:</span>
                        <div className="flex items-center gap-1">
                            <Avatar className="h-6 w-6">
                                <AvatarImage src="/user.jpg?height=24&width=24" alt="Jane Cooper" />
                                <AvatarFallback>JC</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{selectedProjectTask.assignee}</span>
                        </div>
                    </div>
                </div>

                <CommentSection projectTaskId={selectedProjectId!}/>
            </div>
        </main>

    );
}

export default observer(CommentPage);