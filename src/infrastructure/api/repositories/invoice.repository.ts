// Infrastructure layer: Invoice Repository

import { apiClient } from "../client"
import type { Invoice } from "@/domain/entities/invoice"

export class InvoiceRepository {
  async getInvoices() {
    return apiClient.get<Invoice[]>("/invoices")
  }

  async getInvoiceById(id: string) {
    return apiClient.get<Invoice>(`/invoices/${id}`)
  }

  async createInvoice(invoice: Omit<Invoice, "id" | "createdAt">) {
    return apiClient.post<Invoice>("/invoices", invoice)
  }

  async updateInvoice(id: string, invoice: Partial<Invoice>) {
    return apiClient.put<Invoice>(`/invoices/${id}`, invoice)
  }

  async getInvoicesByDateRange(startDate: string, endDate: string) {
    return apiClient.get<Invoice[]>("/invoices", { params: { startDate, endDate } })
  }

  // Additional methods can be added here if needed
}

export const invoiceRepository = new InvoiceRepository()
