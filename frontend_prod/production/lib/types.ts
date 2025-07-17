export interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

export interface Patient {
  id: string
  name: string
  cpf: string
  birthDate: string
  phone: string
  email?: string
  status: "active" | "inactive" | "archived"
  createdAt: string
}

export interface Exam {
  id: string
  patientId: string
  patientName: string
  type: string
  status: "pending" | "in-progress" | "completed" | "cancelled"
  scheduledDate: string
  createdAt: string
}

export interface Diagnosis {
  id: string
  patientId: string
  patientName: string
  examId: string
  diagnosis: string
  status: "draft" | "final" | "reviewed"
  createdAt: string
  doctorId: string
}

export interface Demand {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "open" | "in-progress" | "resolved" | "closed"
  assignedTo?: string
  createdAt: string
}
