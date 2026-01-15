// Global state: Customer Store using Zustand

import { create } from "zustand"
import { devtools } from "zustand/middleware"
import type { Customer } from "@/domain/entities/customer"
import { customerRepository } from "@/infrastructure/api/repositories/customer.repository"

interface CustomerState {
  customers: Customer[]
  isLoading: boolean
  error: string | null

  fetchCustomers: () => Promise<void>
  addCustomer: (customer: Omit<Customer, "id" | "createdAt" | "updatedAt">) => Promise<void>
  updateCustomer: (id: string, customer: Partial<Customer>) => Promise<void>
  deleteCustomer: (id: string) => Promise<void>
  searchCustomers: (query: string) => Promise<void>
  addLoyaltyPoints: (customerId: string, points: number) => Promise<void>
  setError: (error: string | null) => void
}

export const useCustomerStore = create<CustomerState>()(
  devtools((set) => ({
    customers: [],
    isLoading: false,
    error: null,

    fetchCustomers: async () => {
      set({ isLoading: true })
      try {
        const response = await customerRepository.getCustomers()
        if (response.success && response.data) {
          set({ customers: response.data })
        }
      } catch (error) {
        set({ error: "Failed to fetch customers" })
      } finally {
        set({ isLoading: false })
      }
    },

    addCustomer: async (customer) => {
      try {
        const response = await customerRepository.createCustomer(customer)
        if (response.success && response.data) {
          set((state) => ({ customers: [...state.customers, response.data!] }))
        }
      } catch (error) {
        set({ error: "Failed to add customer" })
      }
    },

    updateCustomer: async (id, customer) => {
      try {
        const response = await customerRepository.updateCustomer(id, customer)
        if (response.success && response.data) {
          set((state) => ({
            customers: state.customers.map((c) => (c.id === id ? response.data! : c)),
          }))
        }
      } catch (error) {
        set({ error: "Failed to update customer" })
      }
    },

    deleteCustomer: async (id) => {
      try {
        const response = await customerRepository.deleteCustomer(id)
        if (response.success) {
          set((state) => ({
            customers: state.customers.filter((c) => c.id !== id),
          }))
        }
      } catch (error) {
        set({ error: "Failed to delete customer" })
      }
    },

    searchCustomers: async (query) => {
      try {
        const response = await customerRepository.searchCustomers(query)
        if (response.success && response.data) {
          set({ customers: response.data })
        }
      } catch (error) {
        set({ error: "Failed to search customers" })
      }
    },

    addLoyaltyPoints: async (customerId, points) => {
      try {
        const response = await customerRepository.addLoyaltyPoints(customerId, points)
        if (response.success) {
          set((state) => ({
            customers: state.customers.map((c) =>
              c.id === customerId ? { ...c, loyaltyPoints: c.loyaltyPoints + points } : c,
            ),
          }))
        }
      } catch (error) {
        set({ error: "Failed to add loyalty points" })
      }
    },

    setError: (error) => set({ error }),
  })),
)
