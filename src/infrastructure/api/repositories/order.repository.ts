// Infrastructure layer: Order Repository

import { apiClient } from "../client"
import type { Order } from "@/domain/entities/order"

export class OrderRepository {
  async getOrders() {
    return apiClient.get<Order[]>("/orders")
  }

  async getOrderById(id: string) {
    return apiClient.get<Order>(`/orders/${id}`)
  }

  async createOrder(order: Omit<Order, "id" | "createdAt" | "updatedAt">) {
    return apiClient.post<Order>("/orders", order)
  }

  async updateOrder(id: string, order: Partial<Order>) {
    return apiClient.put<Order>(`/orders/${id}`, order)
  }

  async deleteOrder(id: string) {
    return apiClient.delete(`/orders/${id}`)
  }

  async getKitchenOrders() {
    return apiClient.get<Order[]>("/orders/kitchen")
  }

  async updateOrderStatus(id: string, status: string) {
    return apiClient.put(`/orders/${id}`, { status })
  }
}

export const orderRepository = new OrderRepository()
