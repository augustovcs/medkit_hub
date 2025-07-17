"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Edit, Eye, Calendar, FileText } from "lucide-react"
import type { Exam } from "@/lib/types"

export default function Exames() {
  const [searchTerm, setSearchTerm] = useState("")

  const exams: Exam[] = [
    {
      id: "1",
      patientId: "1",
      patientName: "Maria Silva Santos",
      type: "Hemograma Completo",
      status: "completed",
      scheduledDate: "2024-01-15T09:00:00",
      createdAt: "2024-01-10",
    },
    {
      id: "2",
      patientId: "2",
      patientName: "João Pedro Oliveira",
      type: "Raio-X Tórax",
      status: "pending",
      scheduledDate: "2024-01-16T14:30:00",
      createdAt: "2024-01-12",
    },
    {
      id: "3",
      patientId: "3",
      patientName: "Ana Costa Lima",
      type: "Ultrassom Abdominal",
      status: "in-progress",
      scheduledDate: "2024-01-15T11:00:00",
      createdAt: "2024-01-13",
    },
    {
      id: "4",
      patientId: "1",
      patientName: "Maria Silva Santos",
      type: "Eletrocardiograma",
      status: "cancelled",
      scheduledDate: "2024-01-14T16:00:00",
      createdAt: "2024-01-11",
    },
  ]

  const filteredExams = exams.filter(
    (exam) =>
      exam.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: Exam["status"]) => {
    switch (status) {
      case "completed":
        return <Badge variant="default">Concluído</Badge>
      case "pending":
        return <Badge variant="secondary">Pendente</Badge>
      case "in-progress":
        return <Badge variant="outline">Em Andamento</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelado</Badge>
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString("pt-BR"),
      time: date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Exames</h1>
          <p className="text-muted-foreground">Gerencie todos os exames do sistema</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Exame
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Exames</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{exams.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{exams.filter((e) => e.status === "completed").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{exams.filter((e) => e.status === "pending").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{exams.filter((e) => e.status === "in-progress").length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Exames</CardTitle>
          <CardDescription>{filteredExams.length} exame(s) encontrado(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por paciente ou tipo de exame..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Tipo de Exame</TableHead>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExams.map((exam) => {
                  const { date, time } = formatDateTime(exam.scheduledDate)
                  return (
                    <TableRow key={exam.id}>
                      <TableCell className="font-medium">{exam.patientName}</TableCell>
                      <TableCell>{exam.type}</TableCell>
                      <TableCell>
                        <div>
                          <div>{date}</div>
                          <div className="text-sm text-muted-foreground">{time}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(exam.status)}</TableCell>
                      <TableCell>{new Date(exam.createdAt).toLocaleDateString("pt-BR")}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2">
                              <Eye className="w-4 h-4" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Edit className="w-4 h-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Calendar className="w-4 h-4" />
                              Reagendar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          {filteredExams.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nenhum exame encontrado</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
