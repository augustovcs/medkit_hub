"use client"

import { StatsCard } from "@/components/stats-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, ClipboardCheck, AlertCircle, Calendar, TrendingUp, Clock, UserPlus } from "lucide-react"

export default function Dashboard() {
  const recentExams = [
    { id: "1", patient: "Maria Silva", type: "Hemograma", status: "completed", date: "2024-01-15" },
    { id: "2", patient: "João Santos", type: "Raio-X", status: "pending", date: "2024-01-15" },
    { id: "3", patient: "Ana Costa", type: "Ultrassom", status: "in-progress", date: "2024-01-14" },
  ]

  const urgentDemands = [
    { id: "1", title: "Equipamento com defeito", priority: "urgent", assignedTo: "Técnico João" },
    { id: "2", title: "Resultado urgente", priority: "high", assignedTo: "Dr. Silva" },
    { id: "3", title: "Agendamento especial", priority: "medium", assignedTo: "Recepção" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do sistema Medkit Hub</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total de Pacientes"
          value="1,234"
          icon={Users}
          description="Pacientes ativos no sistema"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Exames Hoje"
          value="45"
          icon={FileText}
          description="Exames agendados para hoje"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Diagnósticos Pendentes"
          value="23"
          icon={ClipboardCheck}
          description="Aguardando finalização"
          trend={{ value: -5, isPositive: false }}
        />
        <StatsCard
          title="Demandas Abertas"
          value="12"
          icon={AlertCircle}
          description="Demandas em aberto"
          trend={{ value: -15, isPositive: true }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Exames Recentes
            </CardTitle>
            <CardDescription>Últimos exames realizados no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentExams.map((exam) => (
                <div key={exam.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{exam.patient}</p>
                    <p className="text-sm text-muted-foreground">{exam.type}</p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        exam.status === "completed" ? "default" : exam.status === "pending" ? "secondary" : "outline"
                      }
                    >
                      {exam.status === "completed"
                        ? "Concluído"
                        : exam.status === "pending"
                          ? "Pendente"
                          : "Em Andamento"}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{exam.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              Ver Todos os Exames
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Demandas Urgentes
            </CardTitle>
            <CardDescription>Demandas que precisam de atenção imediata</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {urgentDemands.map((demand) => (
                <div key={demand.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{demand.title}</p>
                    <p className="text-sm text-muted-foreground">Atribuído: {demand.assignedTo}</p>
                  </div>
                  <Badge
                    variant={
                      demand.priority === "urgent"
                        ? "destructive"
                        : demand.priority === "high"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {demand.priority === "urgent" ? "Urgente" : demand.priority === "high" ? "Alta" : "Média"}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              Ver Todas as Demandas
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <UserPlus className="w-4 h-4 mr-2" />
              Cadastrar Paciente
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Novo Exame
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Clock className="w-4 h-4 mr-2" />
              Agendar Consulta
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estatísticas do Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Exames Realizados</span>
                <span className="font-medium">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Novos Pacientes</span>
                <span className="font-medium">89</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Taxa de Conclusão</span>
                <span className="font-medium">94.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Status do Sistema</span>
                <Badge variant="default">Online</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Última Atualização</span>
                <span className="text-xs text-muted-foreground">15/01/2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Usuários Ativos</span>
                <span className="font-medium">23</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
