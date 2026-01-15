// Orders Feature: Order Detail Component

"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Order } from "@/domain/entities/order"
import { X, Printer } from "lucide-react"

interface OrderDetailProps {
  order: Order
  onClose: () => void
  onStatusChange: (status: string) => void
}

const STATUSES = ["pending", "confirmed", "preparing", "ready", "served", "completed", "cancelled"]

export function OrderDetail({ order, onClose, onStatusChange }: OrderDetailProps) {
  return (
    <Card className="p-6 max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Order #{order.orderNumber}</h2>
        <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Order Header Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <p className="text-sm text-muted-foreground">Type</p>
          <p className="font-semibold capitalize">{order.type}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Time</p>
          <p className="font-semibold">{new Date(order.createdAt).toLocaleTimeString()}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Status</p>
          <p className="font-semibold capitalize">{order.status}</p>
        </div>
        {order.tableId && (
          <div>
            <p className="text-sm text-muted-foreground">Table</p>
            <p className="font-semibold">Table {order.tableId}</p>
          </div>
        )}
      </div>

      {/* Items */}
      <div className="mb-6">
        <h3 className="font-semibold mb-4">Order Items</h3>
        <div className="space-y-2">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">{item.productName}</p>
                {item.specialInstructions && (
                  <p className="text-xs text-muted-foreground italic">{item.specialInstructions}</p>
                )}
              </div>
              <div className="text-right">
                <p className="font-semibold">{item.quantity}x</p>
                <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="bg-muted p-4 rounded-lg mb-6 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${order.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax:</span>
          <span>${order.tax.toFixed(2)}</span>
        </div>
        {order.discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount:</span>
            <span>-${order.discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-semibold text-lg border-t border-border pt-2">
          <span>Total:</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Status Update */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Update Status</label>
        <select
          value={order.status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="w-full px-4 py-2 border border-input rounded-lg bg-background"
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button className="flex-1 gap-2">
          <Printer className="w-4 h-4" />
          Print Receipt
        </Button>
        <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
          Close
        </Button>
      </div>
    </Card>
  )
}
