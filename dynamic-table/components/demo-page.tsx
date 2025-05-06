"use client"

import {useEffect, useState} from "react"
import DynamicTable from "./dynamic-table"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"


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


export default function DemoPage() {
  const [jsonInput, setJsonInput] = useState("")
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState("")
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

  // Cargar datos JSON personalizados
  const handleLoadJson = () => {
    try {
      const parsedData = JSON.parse(jsonInput)
      if (!Array.isArray(parsedData)) {
        throw new Error("Data must be an array of objects")
      }
      setTableData(parsedData)
      setError("")
    } catch (err) {
      setError("Error parsing JSON: " + (err instanceof Error ? err.message : String(err)))
    }
  }

  // Restablecer datos de ejemplo
  const handleResetData = () => {
    setTableData([])
    setJsonInput("")
    setError("")
  }

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
              <TabsTrigger value="data">Data</TabsTrigger>
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

            <TabsContent value="data" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="jsonInput">JSON Data (array of objects)</Label>
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
                    <Button variant="outline" onClick={handleResetData}>
                      Reset Data
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
