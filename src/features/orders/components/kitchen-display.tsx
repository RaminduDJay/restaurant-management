// Orders Feature: Kitchen Display System Component

"use client"

import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { useOrderStore } from "@/src/store/order.store"
import { CheckCircle, Clock } from "lucide-react"
import type { Order } from "@/domain/entities/order"

interface KitchenDisplayProps {
  onMarkReady: (orderId: string) => void
}

export function KitchenDisplay({ onMarkReady }: KitchenDisplayProps) {
  const { kitchenOrders, fetchKitchenOrders } = useOrderStore()

  useEffect(() => {
    fetchKitchenOrders()
    const interval = setInterval(fetchKitchenOrders, 5000)
    return () => clearInterval(interval)
  }, [fetchKitchenOrders])

  const pendingOrders = kitchenOrders.filter((o) => o.status === "confirmed" || o.status === "preparing")
  const readyOrders = kitchenOrders.filter((o) => o.status === "ready")

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Pending Orders */}
      <div>
        <h3 className="font-semibold text-lg mb-4">Pending Orders ({pendingOrders.length})</h3>
        <div className="space-y-3">
          {pendingOrders.length === 0 ? (
            <Card className="p-6 text-center bg-green-50 border-green-200">
              <p className="text-green-700 font-medium">All caught up!</p>
            </Card>
          ) : (
            pendingOrders.map((order) => <KitchenOrderCard key={order.id} order={order} onMarkReady={onMarkReady} />)
          )}
        </div>
      </div>

      {/* Ready Orders */}
      <div>
        <h3 className="font-semibold text-lg mb-4">Ready for Pickup ({readyOrders.length})</h3>
        <div className="space-y-3">
          {readyOrders.length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-muted-foreground">No orders ready</p>
            </Card>
          ) : (
            readyOrders.map((order) => (
              <Card key={order.id} className="p-4 bg-green-50 border-green-200">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-lg">Order #{order.orderNumber}</p>
                    <p className="text-sm text-green-700 font-medium flex items-center gap-1 mt-1">
                      <CheckCircle className="w-4 h-4" />
                      Ready for pickup
                    </p>
                  </div>
                  <span className="text-xs font-semibold bg-green-200 text-green-800 px-2 py-1 rounded">
                    {order.type.toUpperCase()}
                  </span>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

function KitchenOrderCard({ order, onMarkReady }: { order: Order; onMarkReady: (id: string) => void }) {
  const preparingItems = order.items.filter((i) => i.status !== "ready")

  return (
    <Card className="p-4 border-l-4 border-l-yellow-500">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold text-lg">Order #{order.orderNumber}</p>
          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
            <Clock className="w-4 h-4" />
            {new Date(order.createdAt).toLocaleTimeString()}
          </p>
        </div>
        <span className="text-xs font-semibold bg-yellow-100 text-yellow-800 px-2 py-1 rounded capitalize">
          {order.type}
        </span>
      </div>

      {/* Items */}
      <div className="space-y-2 mb-4">
        {order.items.map((item) => (
          <div key={item.id} className="text-sm p-2 bg-muted rounded">
            <p className="font-medium">
              {item.quantity}x {item.productName}
            </p>
            {item.specialInstructions && (
              <p className="text-xs text-muted-foreground italic">{item.specialInstructions}</p>
            )}
          </div>
        ))}
      </div>

      {/* Mark Ready Button */}
      <button
        onClick={() => onMarkReady(order.id)}
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm transition"
      >
        Mark Ready
      </button>
    </Card>
  )
}
