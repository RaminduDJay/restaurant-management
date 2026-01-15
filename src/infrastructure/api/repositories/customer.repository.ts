// Infrastructure layer: Customer Repository

import { apiClient } from "../client"
import type { Customer } from "@/domain/entities/customer"

export class CustomerRepository {
  async getCustomers() {
    return apiClient.get<Customer[]>("/customers")
  }

  async getCustomerById(id: string) {
    return apiClient.get<Customer>(`/customers/${id}`)
  }

  async createCustomer(customer: Omit<Customer, "id" | "createdAt" | "updatedAt">) {
    return apiClient.post<Customer>("/customers", customer)
  }

  async updateCustomer(id: string, customer: Partial<Customer>) {
    return apiClient.put<Customer>(`/customers/${id}`, customer)
  }

  async deleteCustomer(id: string) {
    return apiClient.delete(`/customers/${id}`)
  }

  async getCustomerOrders(customerId: string) {
    return apiClient.get(`/customers/${customerId}/orders`)
  }

  async searchCustomers(query: string) {
    return apiClient.get<Customer[]>("/customers/search", { params: { q: query } })
  }

  async addLoyaltyPoints(customerId: string, points: number) {
    return apiClient.post(`/customers/${customerId}/loyalty`, { points })
  }
}

export const customerRepository = new CustomerRepository()
