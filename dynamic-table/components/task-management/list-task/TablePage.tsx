"use client"

import {useEffect, useState} from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {useStore} from "@/store/useStore";
import {observer} from "mobx-react-lite";
import UpdateProgressDialog from "@/components/task-management/update-task/update-progress/UpdateProgressDialog";
import CreateTaskTab from "@/components/task-management/create-task/create-task-tab";
import DynamicTable from "@/components/dynamic-table";
import TableLoadingSkeleton from "@/components/task-management/list-task/TableLoadingSkeleton";
import UpdateProjectTaskDialog
  from "@/components/task-management/update-task/update-projectTask/UpdateProjectTaskDialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import Link from "next/link";


// Columnas personalizadas para la tabla
const customColumns: any[] = [
  { key: "stt", label: "STT", type: "number", sortable: true },
  { key: "title", label: "Title", type: "string", sortable: true },
  { key: "description", label: "Description", type: "string", sortable: false },
  // { key: "deadlineFrom", label: "Deadline From", type: "date", sortable: true },
  { key: "deadlineTo", label: "Deadline To", type: "date", sortable: true },
  { key: "status", label: "Status", type: "string", sortable: true },
  { key: "assignee", label: "Assignee", type: "string", sortable: true },
  { key: "creator", label: "Creator", type: "string", sortable: true },
  { key: "department", label: "Department", type: "string", sortable: true },
  { key: "createdDate", label: "Created Date", type: "date", sortable: true },
  { key: "completedDate", label: "Completed Date", type: "date", sortable: true },
];


function TablePage() {
  const [tableData, setTableData] = useState<any[]>([]);
  const [error, setError] = useState("")
  const [jsonInput, setJsonInput] = useState("")
  const { projectTaskStore, userStore } = useStore();
  const { loading, projectTasks } = projectTaskStore;
  useEffect(() => {
    // userStore.persistence();
    projectTaskStore.getProjectTasks();
  }, []);

  const handleLoadJson = () => {
    try {
      const parsedData = JSON.parse(jsonInput)
      if (!Array.isArray(parsedData)) {
        throw new Error("Los datos deben ser un array de objetos")
      }
      setTableData(parsedData)
      setError("")
    } catch (err) {
      setError("Error al parsear JSON: " + (err instanceof Error ? err.message : String(err)))
    }
  }


  return (
      <div className="w-full">
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
              <TabsTrigger value="add" className={'border-amber-200 border-r-2'}>Add Task</TabsTrigger>
              <TabsTrigger value="json">JSON</TabsTrigger>
              <TabsTrigger value="tableJson">Table JSON</TabsTrigger>
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
                              <UpdateProjectTaskDialog />
                              <Button variant={"outline"}>
                                <Link href={"/task-management/comment"}>
                                  View Comments
                                </Link>
                              </Button>
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

            <TabsContent value="json" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="jsonInput">Datos JSON (array de objetos)</Label>
                <div className="grid gap-4">
                  <textarea
                      id="jsonInput"
                      className="min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder='[{"id": 1, "nombre": "Ejemplo", "edad": 30}]'
                      value={jsonInput}
                      onChange={(e) => setJsonInput(e.target.value)}
                  />
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <div className="flex space-x-2">
                    <Button onClick={handleLoadJson}>Load JSON</Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tableJson" className="space-y-4">
              <DynamicTable
                  data={tableData}
                  columns={undefined}
                  pageSize={5}
                  filterable={true}
                  groupable={true}
                  actionable={false}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default observer(TablePage);
