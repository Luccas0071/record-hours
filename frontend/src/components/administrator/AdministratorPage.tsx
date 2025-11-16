"use client"

import { getStoredTimeEntries, mockUsers } from "@/lib/mock-data"
import { AdminMetrics } from "./admin-metrics"
import { AdminCharts } from "./admin-charts"
import { AdminTimeEntryTable } from "./admin-time-entry-table"

export default function AdministratorPage() {
  const timeEntries = getStoredTimeEntries().map(entry => ({
    ...entry,
    user_id: entry.userId || "", // Ensure user_id exists
  }))

  const employees = mockUsers.map(user => ({
    id: user.id,
    name: user.name, // Add name property
    role: user.role || "Employee", // Add role property with a default value
    full_name: user.name || null, // Ensure full_name exists
    email: user.email,
  }))

  return (
    <div className="min-h-svh bg-gradient-to-br from-slate-50 to-slate-100">

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard Administrativo</h1>
          <p className="text-muted-foreground">Visão completa de horas trabalhadas e métricas da equipe</p>
        </div>

        <div className="space-y-6">
          <AdminMetrics entries={timeEntries} employees={employees} />
          <AdminCharts entries={timeEntries} />
          <AdminTimeEntryTable 
          entries={timeEntries}
          employees={employees} />
        </div>
      </main>
    </div>
  )
}
