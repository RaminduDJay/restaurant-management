// Domain layer: Invoice Entity

export interface Invoice {
  id: string
  invoiceNumber: string
  orderId: string
  customerId?: string
  subtotal: number
  tax: number
  discount: number
  total: number
  paymentMethod: string
  paymentStatus: "pending" | "completed" | "failed"
  notes?: string
  createdAt: Date
}
