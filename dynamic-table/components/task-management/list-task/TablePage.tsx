"use client"

import {useEffect} from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {useStore} from "@/store/useStore";
import {observer} from "mobx-react-lite";
import UpdateProgressDialog from "@/components/task-management/update-task/update-progress/UpdateProgressDialog";
import CreateTaskTab from "@/components/task-management/create-task/create-task-tab";
import DynamicTable from "@/components/dynamic-table";
import TableLoadingSkeleton from "@/components/task-management/list-task/TableLoadingSkeleton";


// Columnas personalizadas para la tabla
const customColumns: any[] = [
  { key: "stt", label: "STT", type: "number", sortable: true },
  { key: "title", label: "Title", type: "string", sortable: true },
  { key: "description", label: "Description", type: "string", sortable: false },
  { key: "deadlineFrom", label: "Deadline From", type: "date", sortable: true },
  { key: "deadlineTo", label: "Deadline To", type: "date", sortable: true },
  { key: "status", label: "Status", type: "string", sortable: true },
  { key: "assignee", label: "Assignee", type: "string", sortable: true },
  { key: "creator", label: "Creator", type: "string", sortable: true },
  { key: "createdDate", label: "Created Date", type: "date", sortable: true },
  { key: "completedDate", label: "Completed Date", type: "date", sortable: true },
];


function TablePage() {
  // const [tableData, setTableData] = useState([]);
  // const [useCustomColumns, setUseCustomColumns] = useState(true)
  const { projectTaskStore } = useStore();
  const { loading, projectTasks } = projectTaskStore;
  useEffect(() => {
    projectTaskStore.getProjectTasks();
  }, []);


  return (
      <div className="w-full p-4 md:p-8 space-y-8">
        <Card className="w-full">
        <CardHeader>
          <CardTitle>Tasks Table</CardTitle>
          <CardDescription>
            Project Tasks Table for Vifon
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="table">
            <TabsList className="mb-4">
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="add">Add Task</TabsTrigger>
            </TabsList>

            <TabsContent value="table" className="space-y-4">
              {
                loading ? <TableLoadingSkeleton /> : (
                    <DynamicTable
                        data={projectTasks}
                        columns={customColumns}
                        pageSize={5}
                        filterable={true}
                        groupable={true}
                        actionable={true}
                        actionChildren={(
                            <>
                              <UpdateProgressDialog />
                            </>
                        )}
                        setSelectedItem={projectTaskStore.setSelectedProjectId}
                        tableKey={'stt'}
                    />
                )
              }
            </TabsContent>

            <TabsContent value="add" className="space-y-4">
                <CreateTaskTab/>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default observer(TablePage);
