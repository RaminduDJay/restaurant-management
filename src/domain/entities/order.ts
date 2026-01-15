// Domain layer: Order Entity

export type OrderStatus = "pending" | "confirmed" | "preparing" | "ready" | "served" | "completed" | "cancelled"
export type OrderType = "dine-in" | "takeaway" | "delivery"

export interface OrderItem {
  id: string
  productId: string
  productName: string
  quantity: number
  price: number
  specialInstructions?: string
  status: "pending" | "preparing" | "ready"
}

export interface Order {
  id: string
  orderNumber: string
  type: OrderType
  status: OrderStatus
  tableId?: string
  customerId?: string
  items: OrderItem[]
  subtotal: number
  tax: number
  discount: number
  total: number
  paymentMethod?: string
  createdAt: Date
  updatedAt: Date
}
