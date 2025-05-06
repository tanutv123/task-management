"use client"

import {useEffect, useState} from "react"
import DynamicTable from "./dynamic-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import CreateTaskTab from "@/components/create-task/create-task-tab";


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


export default function TablePage() {
  const [tableData, setTableData] = useState([]);
  const [useCustomColumns, setUseCustomColumns] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5045/api/ProjectTasks'); // or external URL
        const data = await res.json();
        setTableData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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
              {/*<div className="flex items-center space-x-2 mb-4">*/}
              {/*  <Button variant={useCustomColumns ? "default" : "outline"} onClick={() => setUseCustomColumns(true)}>*/}
              {/*    Custom Columns*/}
              {/*  </Button>*/}
              {/*  /!*<Button variant={!useCustomColumns ? "default" : "outline"} onClick={() => setUseCustomColumns(false)}>*!/*/}
              {/*  /!*  Auto Detection*!/*/}
              {/*  /!*</Button>*!/*/}
              {/*</div>*/}

              <DynamicTable
                data={tableData}
                columns={useCustomColumns ? customColumns : undefined}
                pageSize={5}
                filterable={true}
                groupable={true}
              />
            </TabsContent>

            <TabsContent value="add" className="space-y-4">
              <div className="space-y-2">
                <CreateTaskTab/>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
