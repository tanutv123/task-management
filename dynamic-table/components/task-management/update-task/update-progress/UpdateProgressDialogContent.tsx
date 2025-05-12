import {observer} from "mobx-react-lite";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {Check, CircleCheck, GripVertical, PlusCircle, Trash2} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {useFieldArray, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {Card, CardContent} from "@/components/ui/card";
import {useStore} from "@/store/useStore";
import {toast} from "react-toastify";
import {Subtask} from "@/types/project-task.model";

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

const subtaskSchema = z.object({
    id: z.number().int(),
    name: z.string().min(1, "Subtask name is required"),
    isCompleted: z.boolean().default(false),
    priority: z.number().int().default(0),
})
const formSchema = z.object({
    subtasks: z.array(subtaskSchema)
})
interface Props {
    open: boolean;
    setOpenDialog: (state: boolean) => void,
    subTasks: Subtask[]
}
function UpdateProgressDialogContent({ open, setOpenDialog, subTasks } : Props) {
    const { projectTaskStore } = useStore();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            subtasks: subTasks || []
        }
    })

    // useEffect(() => {
    //     projectTaskStore.getProjectSubtasks().then(() => {
    //         if (subTasks && subTasks.length) {
    //             form.reset({ subtasks: subTasks })
    //         }
    //     });
    // }, [form])

    const { fields, append, remove, move, update } = useFieldArray({
        control: form.control,
        name: "subtasks",
    })
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )
    const addSubtask = () => {
        // Set priority to the next number in sequence
        const priority = fields.length
        append({ name: "", isCompleted: false, priority, id: 0 })
    }

    const checkAll = () => {
        fields.forEach((field, index) => {
            update(index, {
                ...field,
                isCompleted: true
            });
        });
    };


    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (over && active.id !== over.id) {
            const oldIndex = fields.findIndex((item) => item.id === active.id)
            const newIndex = fields.findIndex((item) => item.id === over.id)

            // Move the item in the field array
            move(oldIndex, newIndex)

            // Update priorities based on new positions
            // const updatedFields = arrayMove([...fields], oldIndex, newIndex)
            // updatedFields.forEach((field, index) => {
            //     update(index, { ...field, priority: index })
            // })
        }
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Ensure priorities are set correctly before submission
        const updatedValues = {
            ...values,
            subtasks: values.subtasks?.map((subtask, index) => ({
                ...subtask,
                priority: index + 1,
            })),
        }
        // console.log(updatedValues.subtasks)
        projectTaskStore.updateProjectSubtasks(updatedValues.subtasks).then(() => {
            setOpenDialog(false);
        });
        // console.log(updatedValues);
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Card>
                        <CardContent className="pt-6">
                            {/* Subtasks Section */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-medium">Subtasks (Optional)</h3>
                                        <p className="text-sm text-muted-foreground">Drag to reorder and set priority</p>
                                    </div>
                                    <div className={'flex justify-end gap-2'}>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={checkAll}
                                            className="flex items-center text-green-600 border-green-600 hover:bg-green-50"
                                        >
                                            <CircleCheck className="mr-2 h-4 w-4" />
                                            Check All Subtask
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={addSubtask}
                                            className="flex items-center text-blue-600 border-blue-600 hover:bg-blue-50"
                                        >
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            Add Subtask
                                        </Button>
                                    </div>
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
                        <Button type="button" variant="outline" onClick={() => {
                            form.reset()
                            setOpenDialog(false)
                        }}>
                            Cancel
                        </Button>
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </Form>

        </>
    );
}

export default observer(UpdateProgressDialogContent);