import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {CommentSection} from "@/components/comment-section";

function CommentPage() {
    return (
        <main className="container mx-auto p-4 max-w-4xl">
            <div className="space-y-8">
                <div className="p-6 border rounded-lg shadow-sm">
                    <h1 className="text-2xl font-bold mb-2">Task: Redesign the homepage</h1>
                    <p className="text-gray-600 mb-4">
                        Create a new design for our company homepage that highlights our new products and services.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-4 pt-4 border-t">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 font-medium">Department:</span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Marketing</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 font-medium">Due:</span>
                            <span className="text-sm">May 20, 2025</span>
                        </div>

                        <div className="flex items-center gap-2 ml-auto">
                            <span className="text-sm text-gray-500 font-medium">Created by:</span>
                            <div className="flex items-center gap-1">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src="/placeholder.svg?height=24&width=24" alt="John Doe" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <span className="text-sm">John Doe</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                        <span className="text-sm text-gray-500 font-medium">Assignee:</span>
                        <div className="flex items-center gap-1">
                            <Avatar className="h-6 w-6">
                                <AvatarImage src="/placeholder.svg?height=24&width=24" alt="Jane Cooper" />
                                <AvatarFallback>JC</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">Jane Cooper</span>
                        </div>
                    </div>
                </div>

                <CommentSection taskId="task-123" />
            </div>
        </main>

    );
}

export default CommentPage;