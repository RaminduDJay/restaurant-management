// Orders Feature: Bottle Ticket Order List Component

"use client"

import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useOrderStore } from "@/src/store/order.store"
import { Wine, Eye } from "lucide-react"
import type { Order } from "@/src/domain/entities/order"

interface BotListProps {
  onView: (bot: Order) => void
}

export function BotList({ onView }: BotListProps) {
  const { orders, fetchOrders, isLoading } = useOrderStore()

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const bottleOrders = orders.filter((order) => 
    order.items.some((item) => item.productName.toLowerCase().includes("bottle") || 
                               item.productName.toLowerCase().includes("wine") ||
                               item.productName.toLowerCase().includes("champagne"))
  )

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (bottleOrders.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Wine className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
        <p className="text-muted-foreground">No bottle orders found</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {bottleOrders.map((order) => (
        <Card key={order.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Wine className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold">Order #{order.orderNumber}</h3>
                <span className={`text-xs px-2 py-1 rounded capitalize ${
                  order.status === "completed" ? "bg-green-100 text-green-700" :
                  order.status === "cancelled" ? "bg-red-100 text-red-700" :
                  "bg-yellow-100 text-yellow-700"
                }`}>
                  {order.status}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {order.items.length} item(s) • ${order.total.toFixed(2)} • {order.type}
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => onView(order)}>
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
