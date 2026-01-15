// Orders: Main Page

"use client"

import { useState } from "react"
import { LayoutWrapper } from "@/src/shared/components/layout-wrapper"
import { Button } from "@/components/ui/button"
import { OrderList } from "@/src/features/orders/components/order-list"
import { OrderDetail } from "@/src/features/orders/components/order-detail"
import { useOrderStore } from "@/src/store/order.store"
import type { Order } from "@/domain/entities/order"
import { Plus } from "lucide-react"
import { useAuthRedirect } from "@/src/shared/hooks/use-auth-redirect"

export default function OrdersPage() {
  useAuthRedirect()
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>()
  const [activeTab, setActiveTab] = useState<"all" | "dine-in" | "takeaway" | "delivery">("all")
  const { updateOrderStatus, deleteOrder } = useOrderStore()

  const handleStatusChange = async (status: string) => {
    if (selectedOrder) {
      await updateOrderStatus(selectedOrder.id, status)
      setSelectedOrder(undefined)
    }
  }

  const handleDelete = async (orderId: string) => {
    if (confirm("Are you sure you want to delete this order?")) {
      await deleteOrder(orderId)
    }
  }

  return (
    <LayoutWrapper title="Orders" subtitle="Manage all restaurant orders">
      <div className="space-y-6">
        {/* Tabs */}
        <div className="flex gap-2 border-b border-border">
          {(["all", "dine-in", "takeaway", "delivery"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium border-b-2 transition ${
                activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground"
              }`}
            >
              {tab === "all" ? "All Orders" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {selectedOrder ? (
          <OrderDetail
            order={selectedOrder}
            onClose={() => setSelectedOrder(undefined)}
            onStatusChange={handleStatusChange}
          />
        ) : (
          <>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create New Order
            </Button>
            <OrderList orderType={activeTab} onView={setSelectedOrder} onDelete={handleDelete} />
          </>
        )}
      </div>
    </LayoutWrapper>
  )
}
