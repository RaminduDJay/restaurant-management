// Global state: Invoice Store using Zustand

import { create } from "zustand"
import { devtools } from "zustand/middleware"
import type { Invoice } from "@/domain/entities/invoice"
import { invoiceRepository } from "@/infrastructure/api/repositories/invoice.repository"

interface InvoiceState {
  invoices: Invoice[]
  isLoading: boolean
  error: string | null

  fetchInvoices: () => Promise<void>
  createInvoice: (invoice: Omit<Invoice, "id" | "createdAt">) => Promise<void>
  updateInvoice: (id: string, invoice: Partial<Invoice>) => Promise<void>
  getInvoicesByDateRange: (startDate: string, endDate: string) => Promise<void>
  setError: (error: string | null) => void
}

export const useInvoiceStore = create<InvoiceState>()(
  devtools((set) => ({
    invoices: [],
    isLoading: false,
    error: null,

    fetchInvoices: async () => {
      set({ isLoading: true })
      try {
        const response = await invoiceRepository.getInvoices()
        if (response.success && response.data) {
          set({ invoices: response.data })
        }
      } catch (error) {
        set({ error: "Failed to fetch invoices" })
      } finally {
        set({ isLoading: false })
      }
    },

    createInvoice: async (invoice) => {
      try {
        const response = await invoiceRepository.createInvoice(invoice)
        if (response.success && response.data) {
          set((state) => ({ invoices: [...state.invoices, response.data!] }))
        }
      } catch (error) {
        set({ error: "Failed to create invoice" })
      }
    },

    updateInvoice: async (id, invoice) => {
      try {
        const response = await invoiceRepository.updateInvoice(id, invoice)
        if (response.success && response.data) {
          set((state) => ({
            invoices: state.invoices.map((i) => (i.id === id ? response.data! : i)),
          }))
        }
      } catch (error) {
        set({ error: "Failed to update invoice" })
      }
    },

    getInvoicesByDateRange: async (startDate, endDate) => {
      set({ isLoading: true })
      try {
        const response = await invoiceRepository.getInvoicesByDateRange(startDate, endDate)
        if (response.success && response.data) {
          set({ invoices: response.data })
        }
      } catch (error) {
        set({ error: "Failed to fetch invoices" })
      } finally {
        set({ isLoading: false })
      }
    },

    setError: (error) => set({ error }),
  })),
)
