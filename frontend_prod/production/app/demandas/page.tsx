"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Edit, Eye, AlertCircle, Clock } from "lucide-react"
import type { Demand } from "@/lib/types"

export default function Demandas() {
  const [searchTerm, setSearchTerm] = useState("")

  const demands: Demand[] = [
    {
      id: "1",
      title: "Equipamento de Raio-X com defeito",
      description: "O equipamento de Raio-X da sala 3 está apresentando problemas na geração de imagens",
      priority: "urgent",
      status: "open",
      assignedTo: "Técnico João Silva",
      createdAt: "2024-01-15T08:30:00",
    },
    {
      id: "2",
      title: "Resultado de exame urgente",
      description: "Paciente Maria Silva precisa do resultado do hemograma com urgência",
      priority: "high",
      status: "in-progress",
      assignedTo: "Dr. Roberto Santos",
      createdAt: "2024-01-15T10:15:00",
    },
    {
      id: "3",
      title: "Agendamento especial para cirurgia",
      description: "Necessário agendar cirurgia de emergência para paciente João Pedro",
      priority: "medium",
      status: "resolved",
      assignedTo: "Recepção Ana",
      createdAt: "2024-01-14T16:45:00",
    },
    {
      id: "4",
      title: "Falta de material para coleta",
      description: "Estoque de tubos para coleta de sangue está baixo",
      priority: "low",
      status: "open",
      assignedTo: "Almoxarifado",
      createdAt: "2024-01-14T14:20:00",
    },
  ]

  const filteredDemands = demands.filter(
    (demand) =>
      demand.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      demand.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getPriorityBadge = (priority: Demand["priority"]) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="destructive">Urgente</Badge>
      case "high":
        return <Badge variant="default">Alta</Badge>
      case "medium":
        return <Badge variant="secondary">Média</Badge>
      case "low":
        return <Badge variant="outline">Baixa</Badge>
      default:
        return <Badge variant="secondary">Desconhecida</Badge>
    }
  }

  const getStatusBadge = (status: Demand["status"]) => {
    switch (status) {
      case "open":
        return <Badge variant="destructive">Aberta</Badge>
      case "in-progress":
        return <Badge variant="default">Em Andamento</Badge>
      case "resolved":
        return <Badge variant="secondary">Resolvida</Badge>
      case "closed":
        return <Badge variant="outline">Fechada</Badge>
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
          <h1 className="text-3xl font-bold tracking-tight">Demandas</h1>
          <p className="text-muted-foreground">Gerencie todas as demandas e solicitações do sistema</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Nova Demanda
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{demands.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Abertas</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{demands.filter((d) => d.status === "open").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{demands.filter((d) => d.status === "in-progress").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgentes</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{demands.filter((d) => d.priority === "urgent").length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Demandas</CardTitle>
          <CardDescription>{filteredDemands.length} demanda(s) encontrada(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar demandas..."
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
                  <TableHead>Título</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Atribuído para</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDemands.map((demand) => {
                  const { date, time } = formatDateTime(demand.createdAt)
                  return (
                    <TableRow key={demand.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{demand.title}</div>
                          <div className="text-sm text-muted-foreground line-clamp-2">{demand.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getPriorityBadge(demand.priority)}</TableCell>
                      <TableCell>{getStatusBadge(demand.status)}</TableCell>
                      <TableCell>{demand.assignedTo}</TableCell>
                      <TableCell>
                        <div>
                          <div>{date}</div>
                          <div className="text-sm text-muted-foreground">{time}</div>
                        </div>
                      </TableCell>
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
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          {filteredDemands.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nenhuma demanda encontrada</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
