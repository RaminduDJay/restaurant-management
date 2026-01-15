// Tables Feature: Table Form Component

"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { Table } from "@/domain/entities/table"
import { X } from "lucide-react"

interface TableFormProps {
  table?: Table
  onSubmit: (data: Omit<Table, "id" | "createdAt" | "updatedAt">) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

const SECTIONS = ["Dining Area", "Bar", "Patio", "VIP"]

export function TableForm({ table, onSubmit, onCancel, isLoading = false }: TableFormProps) {
  const [formData, setFormData] = useState({
    number: table?.number || "",
    capacity: table?.capacity || 2,
    section: table?.section || "Dining Area",
    status: table?.status || "available",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number.parseInt(value) || 0 : value,
    }))
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.number.trim()) newErrors.number = "Table number is required"
    if (formData.capacity < 1) newErrors.capacity = "Capacity must be at least 1"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    try {
      await onSubmit(formData as any)
    } catch (error) {
      console.error("Form submission error:", error)
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">{table ? "Edit Table" : "Add New Table"}</h2>
        <button onClick={onCancel} className="p-2 hover:bg-muted rounded-lg">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Table Number */}
          <div>
            <label className="block text-sm font-medium mb-2">Table Number *</label>
            <Input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="e.g., A1, 1, etc."
              disabled={isLoading}
            />
            {errors.number && <p className="text-destructive text-xs mt-1">{errors.number}</p>}
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-sm font-medium mb-2">Capacity *</label>
            <Input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              min="1"
              max="20"
              disabled={isLoading}
            />
            {errors.capacity && <p className="text-destructive text-xs mt-1">{errors.capacity}</p>}
          </div>

          {/* Section */}
          <div>
            <label className="block text-sm font-medium mb-2">Section</label>
            <select
              name="section"
              value={formData.section}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-input rounded-lg bg-background"
            >
              {SECTIONS.map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-input rounded-lg bg-background"
            >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="reserved">Reserved</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={isLoading} className="flex-1">
            {isLoading ? "Saving..." : table ? "Update Table" : "Add Table"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 bg-transparent"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}
