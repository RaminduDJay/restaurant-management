// Tables Feature: Table Grid Component

"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTableStore } from "@/src/store/table.store"
import type { Table } from "@/domain/entities/table"
import { Users, Plus } from "lucide-react"

interface TableGridProps {
  onSelectTable: (table: Table) => void
  onAddTable: () => void
}

const STATUS_COLORS: Record<string, string> = {
  available: "bg-green-100 border-green-300 hover:bg-green-200",
  occupied: "bg-red-100 border-red-300 hover:bg-red-200",
  reserved: "bg-blue-100 border-blue-300 hover:bg-blue-200",
  maintenance: "bg-gray-100 border-gray-300 hover:bg-gray-200",
}

const STATUS_TEXT: Record<string, string> = {
  available: "Available",
  occupied: "Occupied",
  reserved: "Reserved",
  maintenance: "Maintenance",
}

export function TableGrid({ onSelectTable, onAddTable }: TableGridProps) {
  const { tables, isLoading, fetchTables } = useTableStore()
  const [selectedSection, setSelectedSection] = useState("all")

  useEffect(() => {
    fetchTables()
  }, [fetchTables])

  const sections = Array.from(new Set(tables.map((t) => t.section)))
  const filteredTables = selectedSection === "all" ? tables : tables.filter((t) => t.section === selectedSection)

  const tableStats = {
    total: tables.length,
    available: tables.filter((t) => t.status === "available").length,
    occupied: tables.filter((t) => t.status === "occupied").length,
    reserved: tables.filter((t) => t.status === "reserved").length,
  }

  if (isLoading) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Loading tables...</p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <p className="text-muted-foreground text-sm mb-1">Total Tables</p>
          <p className="text-2xl font-bold">{tableStats.total}</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-muted-foreground text-sm mb-1">Available</p>
          <p className="text-2xl font-bold text-green-600">{tableStats.available}</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-muted-foreground text-sm mb-1">Occupied</p>
          <p className="text-2xl font-bold text-red-600">{tableStats.occupied}</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-muted-foreground text-sm mb-1">Reserved</p>
          <p className="text-2xl font-bold text-blue-600">{tableStats.reserved}</p>
        </Card>
      </div>

      {/* Section Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedSection === "all" ? "default" : "outline"}
          onClick={() => setSelectedSection("all")}
          size="sm"
        >
          All Sections
        </Button>
        {sections.map((section) => (
          <Button
            key={section}
            variant={selectedSection === section ? "default" : "outline"}
            onClick={() => setSelectedSection(section)}
            size="sm"
          >
            {section}
          </Button>
        ))}
        <Button onClick={onAddTable} size="sm" className="ml-auto gap-2">
          <Plus className="w-4 h-4" />
          Add Table
        </Button>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredTables.map((table) => (
          <button
            key={table.id}
            onClick={() => onSelectTable(table)}
            className={`p-4 rounded-lg border-2 transition ${STATUS_COLORS[table.status]}`}
          >
            <div className="text-center">
              <p className="text-sm font-semibold mb-2">Table {table.number}</p>
              <div className="flex items-center justify-center gap-1 text-sm mb-2">
                <Users className="w-4 h-4" />
                {table.capacity}
              </div>
              <p className="text-xs font-medium">{STATUS_TEXT[table.status]}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
