// Global state: Table Store using Zustand

import { create } from "zustand"
import { devtools } from "zustand/middleware"
import type { Table } from "@/domain/entities/table"
import { tableRepository } from "@/infrastructure/api/repositories/table.repository"

interface TableState {
  tables: Table[]
  isLoading: boolean
  error: string | null

  fetchTables: () => Promise<void>
  updateTableStatus: (id: string, status: string) => Promise<void>
  createTable: (table: Omit<Table, "id" | "createdAt" | "updatedAt">) => Promise<void>
  updateTable: (id: string, table: Partial<Table>) => Promise<void>
  deleteTable: (id: string) => Promise<void>
  setError: (error: string | null) => void
}

export const useTableStore = create<TableState>()(
  devtools((set) => ({
    tables: [],
    isLoading: false,
    error: null,

    fetchTables: async () => {
      set({ isLoading: true })
      try {
        const response = await tableRepository.getTables()
        if (response.success && response.data) {
          set({ tables: response.data })
        }
      } catch (error) {
        set({ error: "Failed to fetch tables" })
      } finally {
        set({ isLoading: false })
      }
    },

    updateTableStatus: async (id, status) => {
      try {
        const response = await tableRepository.updateTableStatus(id, status)
        if (response.success) {
          set((state) => ({
            tables: state.tables.map((t) => (t.id === id ? { ...t, status: status as any } : t)),
          }))
        }
      } catch (error) {
        set({ error: "Failed to update table status" })
      }
    },

    createTable: async (table) => {
      try {
        const response = await tableRepository.createTable(table)
        if (response.success && response.data) {
          set((state) => ({ tables: [...state.tables, response.data!] }))
        }
      } catch (error) {
        set({ error: "Failed to create table" })
      }
    },

    updateTable: async (id, table) => {
      try {
        const response = await tableRepository.updateTable(id, table)
        if (response.success && response.data) {
          set((state) => ({
            tables: state.tables.map((t) => (t.id === id ? response.data! : t)),
          }))
        }
      } catch (error) {
        set({ error: "Failed to update table" })
      }
    },

    deleteTable: async (id) => {
      try {
        const response = await tableRepository.deleteTable(id)
        if (response.success) {
          set((state) => ({
            tables: state.tables.filter((t) => t.id !== id),
          }))
        }
      } catch (error) {
        set({ error: "Failed to delete table" })
      }
    },

    setError: (error) => set({ error }),
  })),
)
