// Orders: Bottle Ticket Order Page

"use client"

import { useState } from "react"
import { LayoutWrapper } from "@/src/shared/components/layout-wrapper"
import { BotList } from "@/src/features/orders/components/bot-list"
import { BotDetail } from "@/src/features/orders/components/bot-detail"
import type { Order } from "@/src/domain/entities/order"
import { useAuthRedirect } from "@/src/shared/hooks/use-auth-redirect"

export default function BotPage() {
  useAuthRedirect()
  const [selectedBot, setSelectedBot] = useState<Order | undefined>()

  return (
    <LayoutWrapper title="Bottle Ticket Orders" subtitle="Manage bottle service and beverage orders">
      <div className="space-y-6">
        {selectedBot ? (
          <BotDetail bot={selectedBot} onClose={() => setSelectedBot(undefined)} />
        ) : (
          <BotList onView={setSelectedBot} />
        )}
      </div>
    </LayoutWrapper>
  )
}
