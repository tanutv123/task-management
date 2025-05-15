"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import {useForm, useFieldArray, Controller} from "react-hook-form"
import { z } from "zod"
import {CalendarIcon, PlusCircle, Trash2, GripVertical, Loader2} from "lucide-react"
import { format } from "date-fns"
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core"
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {observer} from "mobx-react-lite";
import {useStore} from "@/store/useStore";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";


// Define the status options
const statusOptions = [
    { value: "Chưa bắt đầu", label: "Pending" },
    { value: "Đang thực hiện", label: "In Progress" },
    { value: "Hoàn thành", label: "Completed" }
]

// Define the form schema with validation
const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    deadlineFrom: z.date({
        required_error: "Deadline From is required",
    }),
    deadlineTo: z.date({
        required_error: "Deadline To is required",
    }),
    status: z.string({
        required_error: "Status is required",
    })
})
interface Props {
    setOpen: (state: boolean) => void;
    isOpen: boolean;
}
// Main form component
function UpdateProjectTaskContent({ isOpen, setOpen } : Props) {
    const { userStore, projectTaskStore } = useStore();
    const { selectedProjectTask } = projectTaskStore
    const [loading, setLoading] = useState(false); // State to handle loading

    // Initialize the form with default values
    const form: any = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: selectedProjectTask ? selectedProjectTask.title : "",
            description: selectedProjectTask ? selectedProjectTask.description : "",
            deadlineFrom: selectedProjectTask ? new Date(selectedProjectTask.deadlineFrom) : new Date(),
            deadlineTo: selectedProjectTask ? new Date(selectedProjectTask.deadlineTo) : new Date(),
            status: selectedProjectTask ? selectedProjectTask.status : ""
        },
    })

    // Handle form submission
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Ensure priorities are set correctly before submission
        const updatedValues = {
            ...values
        }
        if (updatedValues.deadlineFrom > updatedValues.deadlineTo) {
            toast.error("Invalid deadline")
            return;
        }
        setLoading(true);
        projectTaskStore.updateProjectTask(updatedValues)
            .then(() => {
                setOpen(false);
                toast.success("Update successfully!");
            })
            .catch((err) => {
                console.log(err);
                toast.error("Error while updating!");
            })
            .finally(() => setLoading(false))
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-8">
                            {/* Basic Information Group */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Basic Information</h3>
                                <div className="grid grid-cols-1 gap-6">
                                    {/* Title Field */}
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter task title" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Description Field */}
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Enter task description" className="min-h-[120px]" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Timeline Group */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Timeline</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Deadline Group */}
                                    <div className="space-y-4 md:col-span-2">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Deadline From Field */}
                                            <FormField
                                                control={form.control}
                                                name="deadlineFrom"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>From</FormLabel>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                                                                        {field.value ? (
                                                                            format(field.value, "PPP")
                                                                        ) : (
                                                                            <span className="text-muted-foreground">Select date</span>
                                                                        )}
                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="start">
                                                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Deadline To Field */}
                                            {/*@ts-ignore*/}
                                            <FormField
                                                control={form.control}
                                                name="deadlineTo"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>To</FormLabel>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                                                                        {field.value ? (
                                                                            format(field.value, "PPP")
                                                                        ) : (
                                                                            <span className="text-muted-foreground">Select date</span>
                                                                        )}
                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="start">
                                                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="status"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Status</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select status" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {statusOptions.map((option) => (
                                                                    <SelectItem key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Assignment Group */}
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Status Field */}

                                    {/* Assignee Field */}
                                    {/*<FormField*/}
                                    {/*    control={form.control}*/}
                                    {/*    name="assignee"*/}
                                    {/*    render={({ field }) => (*/}
                                    {/*        <FormItem>*/}
                                    {/*            <FormLabel>Assignee</FormLabel>*/}
                                    {/*            <FormControl>*/}
                                    {/*                <Input placeholder="Enter assignee name" {...field} />*/}
                                    {/*            </FormControl>*/}
                                    {/*            <FormMessage />*/}
                                    {/*        </FormItem>*/}
                                    {/*    )}*/}
                                    {/*/>*/}
                                    {/*<Controller*/}
                                    {/*    name="assignee"*/}
                                    {/*    control={form.control}*/}
                                    {/*    render={({ field }) => (*/}
                                    {/*        <Select*/}
                                    {/*            options={assigneeOptions}*/}
                                    {/*            isClearable*/}
                                    {/*            placeholder="Select assignee"*/}
                                    {/*            onChange={(selectedOption) =>*/}
                                    {/*                field.onChange(selectedOption?.value)*/}
                                    {/*            }*/}
                                    {/*            value={assigneeOptions.find((option) => option.value === field.value)!.value} // This avoids undefined error*/}
                                    {/*        />*/}
                                    {/*    )}*/}
                                    {/*/>*/}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={() => {
                        form.reset();
                        setOpen(false);
                    }}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        {loading ? <Loader2 className={'animate-spin'}/> : "Submit"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default observer(UpdateProjectTaskContent);