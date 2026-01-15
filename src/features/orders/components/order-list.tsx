// Orders Feature: Order List Component

"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useOrderStore } from "@/src/store/order.store"
import { Eye, Trash2, Search } from "lucide-react"
import type { Order } from "@/domain/entities/order"

interface OrderListProps {
  orderType?: "all" | "dine-in" | "takeaway" | "delivery"
  onView: (order: Order) => void
  onDelete: (orderId: string) => void
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  preparing: "bg-purple-100 text-purple-800",
  ready: "bg-green-100 text-green-800",
  served: "bg-gray-100 text-gray-800",
  completed: "bg-green-50 text-green-700",
  cancelled: "bg-red-100 text-red-800",
}

export function OrderList({ orderType = "all", onView, onDelete }: OrderListProps) {
  const { orders, isLoading, fetchOrders } = useOrderStore()
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = o.orderNumber.includes(searchTerm)
    const matchesType = orderType === "all" || o.type === orderType
    return matchesSearch && matchesType
  })

  if (isLoading) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Loading orders...</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by order number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Orders Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Order #</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Time</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">Items</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">Total</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-6 py-4 font-semibold">{order.orderNumber}</td>
                    <td className="px-6 py-4 text-sm capitalize">{order.type}</td>
                    <td className="px-6 py-4 text-sm">{new Date(order.createdAt).toLocaleTimeString()}</td>
                    <td className="px-6 py-4 text-right text-sm">{order.items.length} items</td>
                    <td className="px-6 py-4 text-right font-semibold">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => onView(order)} className="bg-transparent">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(order.id)}
                          className="bg-transparent text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
