"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Edit, Eye, Archive, Filter } from "lucide-react"
import type { Patient } from "@/lib/types"

export default function Pacientes() {
  const [searchTerm, setSearchTerm] = useState("")

  const patients: Patient[] = [
    {
      id: "1",
      name: "Maria Silva Santos",
      cpf: "123.456.789-00",
      birthDate: "1985-03-15",
      phone: "(11) 99999-9999",
      email: "maria.silva@email.com",
      status: "active",
      createdAt: "2024-01-10",
    },
    {
      id: "2",
      name: "João Pedro Oliveira",
      cpf: "987.654.321-00",
      birthDate: "1990-07-22",
      phone: "(11) 88888-8888",
      email: "joao.pedro@email.com",
      status: "active",
      createdAt: "2024-01-12",
    },
    {
      id: "3",
      name: "Ana Costa Lima",
      cpf: "456.789.123-00",
      birthDate: "1978-11-08",
      phone: "(11) 77777-7777",
      status: "inactive",
      createdAt: "2024-01-08",
    },
  ]

  const filteredPatients = patients.filter(
    (patient) => patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || patient.cpf.includes(searchTerm),
  )

  const getStatusBadge = (status: Patient["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Ativo</Badge>
      case "inactive":
        return <Badge variant="secondary">Inativo</Badge>
      case "archived":
        return <Badge variant="outline">Arquivado</Badge>
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  const calculateAge = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }

    return age
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pacientes</h1>
          <p className="text-muted-foreground">Gerencie todos os pacientes cadastrados no sistema</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Paciente
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Pacientes</CardTitle>
          <CardDescription>{filteredPatients.length} paciente(s) encontrado(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por nome ou CPF..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              Filtros
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead>Idade</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Cadastrado em</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div>{patient.name}</div>
                        {patient.email && <div className="text-sm text-muted-foreground">{patient.email}</div>}
                      </div>
                    </TableCell>
                    <TableCell>{patient.cpf}</TableCell>
                    <TableCell>{calculateAge(patient.birthDate)} anos</TableCell>
                    <TableCell>{patient.phone}</TableCell>
                    <TableCell>{getStatusBadge(patient.status)}</TableCell>
                    <TableCell>{new Date(patient.createdAt).toLocaleDateString("pt-BR")}</TableCell>
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
                            <Archive className="w-4 h-4" />
                            Arquivar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredPatients.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nenhum paciente encontrado</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
