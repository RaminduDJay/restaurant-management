// Infrastructure layer: Table Repository

import { apiClient } from "../client"
import type { Table } from "@/domain/entities/table"

export class TableRepository {
  async getTables() {
    return apiClient.get<Table[]>("/tables")
  }

  async getTableById(id: string) {
    return apiClient.get<Table>(`/tables/${id}`)
  }

  async createTable(table: Omit<Table, "id" | "createdAt" | "updatedAt">) {
    return apiClient.post<Table>("/tables", table)
  }

  async updateTable(id: string, table: Partial<Table>) {
    return apiClient.put<Table>(`/tables/${id}`, table)
  }

  async deleteTable(id: string) {
    return apiClient.delete(`/tables/${id}`)
  }

  async updateTableStatus(id: string, status: string) {
    return apiClient.put(`/tables/${id}`, { status })
  }
}

export const tableRepository = new TableRepository()
