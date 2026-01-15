// Application layer: Order Use Cases

import { OrderRepository } from "@/infrastructure/api/repositories/order.repository"
import type { Order } from "@/domain/entities/order"

export class OrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async getOrders() {
    return this.orderRepository.getOrders()
  }

  async getOrderById(id: string) {
    return this.orderRepository.getOrderById(id)
  }

  async createOrder(order: Omit<Order, "id" | "createdAt" | "updatedAt">) {
    return this.orderRepository.createOrder(order)
  }

  async updateOrder(id: string, order: Partial<Order>) {
    return this.orderRepository.updateOrder(id, order)
  }

  async updateOrderStatus(id: string, status: string) {
    return this.orderRepository.updateOrderStatus(id, status)
  }

  async deleteOrder(id: string) {
    return this.orderRepository.deleteOrder(id)
  }

  async getKitchenOrders() {
    return this.orderRepository.getKitchenOrders()
  }
}

export const orderUseCase = new OrderUseCase(OrderRepository.prototype.constructor as any)
