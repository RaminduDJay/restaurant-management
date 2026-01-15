// Tables: Main Page

"use client"

import { useState } from "react"
import { LayoutWrapper } from "@/src/shared/components/layout-wrapper"
import { TableGrid } from "@/src/features/tables/components/table-grid"
import { TableForm } from "@/src/features/tables/components/table-form"
import { useTableStore } from "@/src/store/table.store"
import type { Table } from "@/domain/entities/table"
import { useAuthRedirect } from "@/src/shared/hooks/use-auth-redirect"

export default function TablesPage() {
  useAuthRedirect()
  const [showForm, setShowForm] = useState(false)
  const [selectedTable, setSelectedTable] = useState<Table | undefined>()
  const { createTable, updateTable } = useTableStore()

  const handleTableSelect = (table: Table) => {
    setSelectedTable(table)
    setShowForm(true)
  }

  const handleFormSubmit = async (data: Omit<Table, "id" | "createdAt" | "updatedAt">) => {
    if (selectedTable) {
      await updateTable(selectedTable.id, data)
    } else {
      await createTable(data)
    }

    setShowForm(false)
    setSelectedTable(undefined)
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setSelectedTable(undefined)
  }

  return (
    <LayoutWrapper title="Tables" subtitle="Manage restaurant tables and seating">
      <div className="space-y-6">
        {showForm ? (
          <TableForm table={selectedTable} onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
        ) : (
          <TableGrid onSelectTable={handleTableSelect} onAddTable={() => setShowForm(true)} />
        )}
      </div>
    </LayoutWrapper>
  )
}
