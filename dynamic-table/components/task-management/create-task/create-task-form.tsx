"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, PlusCircle, Trash2, GripVertical } from "lucide-react"
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


// Define the status options
const statusOptions = [
    { value: "Chưa bắt đầu", label: "Pending" },
    { value: "Đang thực hiện", label: "In Progress" },
    { value: "Hoàn thành", label: "Completed" }
]

// Define the subtask schema with priority
const subtaskSchema = z.object({
    name: z.string().min(1, "Subtask name is required"),
    isCompleted: z.boolean().default(false),
    priority: z.number().int().default(0),
})

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
    }),
    assignee: z.string().min(1, "Assignee is required"),
    creator: z.string().min(1, "Creator is required"),
    createdDate: z.date({
        required_error: "Created Date is required",
    }),
    completedDate: z.date().optional(),
    subtasks: z.array(subtaskSchema).optional().default([]),
})

// Sortable subtask item component
function SortableSubtaskItem({ id, index, form, remove }: { id: string; index: number; form: any; remove: any }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div ref={setNodeRef} style={style} className="flex items-start space-x-4 mb-4 p-4 border rounded-md bg-white">
            <div className="flex items-center h-full py-2 cursor-grab" {...attributes} {...listeners}>
                <GripVertical className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr,auto,auto] gap-4 items-center">
                <FormField
                    control={form.control}
                    name={`subtasks.${index}.name`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subtask Name</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Enter subtask name" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={`subtasks.${index}.isCompleted`}
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0 mt-8">
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel>Completed</FormLabel>
                        </FormItem>
                    )}
                />

                <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} className="h-9 w-9 mt-8">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove subtask</span>
                </Button>
            </div>
        </div>
    )
}

// Main form component
export function CreateTaskForm() {
    // Initialize the form with default values
    const form: any = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            createdDate: new Date(),
            creator: "Current User", // This could be auto-filled with the current user
            subtasks: [],
        },
    })

    // Use fieldArray to manage subtasks
    const { fields, append, remove, move } = useFieldArray({
        control: form.control,
        name: "subtasks",
    })



    // Set up sensors for drag and drop
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )

    // Function to add a new subtask
    const addSubtask = () => {
        // Set priority to the next number in sequence
        const priority = fields.length
        append({ name: "", isCompleted: false, priority })
    }

    // Handle drag end event
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (over && active.id !== over.id) {
            const oldIndex = fields.findIndex((item) => item.id === active.id)
            const newIndex = fields.findIndex((item) => item.id === over.id)

            // Move the item in the field array
            move(oldIndex, newIndex)
            //
            // // Update priorities based on new positions
            // const updatedFields = arrayMove([...fields], oldIndex, newIndex)
            // updatedFields.forEach((field, index) => {
            //     update(index, { ...field, priority: index })
            // })
        }
    }

    // Handle form submission
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Ensure priorities are set correctly before submission
        const updatedValues = {
            ...values,
            subtasks: values.subtasks?.map((subtask, index) => ({
                ...subtask,
                priority: index,
            })),
        }

        console.log("Form submitted:", updatedValues)
        // Here you would typically send the data to your API
        alert("Task created successfully!")
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
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Assignment Group */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Assignment</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Status Field */}
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

                                    {/* Assignee Field */}
                                    <FormField
                                        control={form.control}
                                        name="assignee"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Assignee</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter assignee name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Creator Field */}
                                    <FormField
                                        control={form.control}
                                        name="creator"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Creator</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter creator name" {...field} />
                                                </FormControl>
                                                <FormDescription>Auto-filled with current user</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Subtasks Section */}
                        <div className="mt-8">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-medium">Subtasks (Optional)</h3>
                                    <p className="text-sm text-muted-foreground">Drag to reorder and set priority</p>
                                </div>
                                <Button type="button" variant="outline" size="sm" onClick={addSubtask} className="flex items-center">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Subtask
                                </Button>
                            </div>

                            {fields.length === 0 && (
                                <p className="text-muted-foreground text-sm mb-4">
                                    No subtasks added yet. Click the button above to add subtasks.
                                </p>
                            )}

                            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                <SortableContext items={fields.map((field) => field.id)} strategy={verticalListSortingStrategy}>
                                    {fields.map((field, index) => (
                                        <SortableSubtaskItem key={field.id} id={field.id} index={index} form={form} remove={remove} />
                                    ))}
                                </SortableContext>
                            </DndContext>
                        </div>
                    </CardContent>
                </Card>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={() => form.reset()}>
                        Cancel
                    </Button>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Form>
    )
}
