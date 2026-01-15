// Global state: Order Store using Zustand

import { create } from "zustand"
import { devtools } from "zustand/middleware"
import type { Order } from "@/domain/entities/order"
import { orderRepository } from "@/infrastructure/api/repositories/order.repository"

interface OrderState {
  orders: Order[]
  kitchenOrders: Order[]
  isLoading: boolean
  error: string | null

  fetchOrders: () => Promise<void>
  fetchKitchenOrders: () => Promise<void>
  createOrder: (order: Omit<Order, "id" | "createdAt" | "updatedAt">) => Promise<void>
  updateOrder: (id: string, order: Partial<Order>) => Promise<void>
  updateOrderStatus: (id: string, status: string) => Promise<void>
  deleteOrder: (id: string) => Promise<void>
  setError: (error: string | null) => void
}

export const useOrderStore = create<OrderState>()(
  devtools((set) => ({
    orders: [],
    kitchenOrders: [],
    isLoading: false,
    error: null,

    fetchOrders: async () => {
      set({ isLoading: true })
      try {
        const response = await orderRepository.getOrders()
        if (response.success && response.data) {
          set({ orders: response.data })
        }
      } catch (error) {
        set({ error: "Failed to fetch orders" })
      } finally {
        set({ isLoading: false })
      }
    },

    fetchKitchenOrders: async () => {
      try {
        const response = await orderRepository.getKitchenOrders()
        if (response.success && response.data) {
          set({ kitchenOrders: response.data })
        }
      } catch (error) {
        set({ error: "Failed to fetch kitchen orders" })
      }
    },

    createOrder: async (order) => {
      try {
        const response = await orderRepository.createOrder(order)
        if (response.success && response.data) {
          set((state) => ({ orders: [...state.orders, response.data!] }))
        }
      } catch (error) {
        set({ error: "Failed to create order" })
      }
    },

    updateOrder: async (id, order) => {
      try {
        const response = await orderRepository.updateOrder(id, order)
        if (response.success && response.data) {
          set((state) => ({
            orders: state.orders.map((o) => (o.id === id ? response.data! : o)),
          }))
        }
      } catch (error) {
        set({ error: "Failed to update order" })
      }
    },

    updateOrderStatus: async (id, status) => {
      try {
        const response = await orderRepository.updateOrderStatus(id, status)
        if (response.success) {
          set((state) => ({
            orders: state.orders.map((o) => (o.id === id ? { ...o, status: status as any } : o)),
          }))
        }
      } catch (error) {
        set({ error: "Failed to update order status" })
      }
    },

    deleteOrder: async (id) => {
      try {
        const response = await orderRepository.deleteOrder(id)
        if (response.success) {
          set((state) => ({
            orders: state.orders.filter((o) => o.id !== id),
          }))
        }
      } catch (error) {
        set({ error: "Failed to delete order" })
      }
    },

    setError: (error) => set({ error }),
  })),
)
