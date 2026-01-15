// Orders: Kitchen Display System Page

"use client"

import { LayoutWrapper } from "@/src/shared/components/layout-wrapper"
import { KitchenDisplay } from "@/src/features/orders/components/kitchen-display"
import { useOrderStore } from "@/src/store/order.store"
import { useAuthRedirect } from "@/src/shared/hooks/use-auth-redirect"

export default function KitchenPage() {
  useAuthRedirect()
  const { updateOrderStatus } = useOrderStore()

  const handleMarkReady = async (orderId: string) => {
    await updateOrderStatus(orderId, "ready")
  }

  return (
    <LayoutWrapper title="Kitchen Display System" subtitle="Manage order preparation and timing">
      <KitchenDisplay onMarkReady={handleMarkReady} />
    </LayoutWrapper>
  )
}
