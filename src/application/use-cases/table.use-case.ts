// Application layer: Table Use Cases

import { TableRepository } from "@/infrastructure/api/repositories/table.repository"
import type { Table } from "@/domain/entities/table"

export class TableUseCase {
  constructor(private tableRepository: TableRepository) {}

  async getTables() {
    return this.tableRepository.getTables()
  }

  async getTableById(id: string) {
    return this.tableRepository.getTableById(id)
  }

  async createTable(table: Omit<Table, "id" | "createdAt" | "updatedAt">) {
    return this.tableRepository.createTable(table)
  }

  async updateTable(id: string, table: Partial<Table>) {
    return this.tableRepository.updateTable(id, table)
  }

  async updateTableStatus(id: string, status: string) {
    return this.tableRepository.updateTableStatus(id, status)
  }

  async deleteTable(id: string) {
    return this.tableRepository.deleteTable(id)
  }
}

export const tableUseCase = new TableUseCase(TableRepository.prototype.constructor as any)
