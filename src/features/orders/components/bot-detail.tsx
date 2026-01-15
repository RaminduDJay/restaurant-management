// Orders Feature: Bottle Ticket Order Detail Component

"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Wine, Calendar, DollarSign } from "lucide-react"
import type { Order } from "@/src/domain/entities/order"

interface BotDetailProps {
  bot: Order
  onClose: () => void
}

export function BotDetail({ bot, onClose }: BotDetailProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Wine className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-bold">Order #{bot.orderNumber}</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-muted-foreground">Status</p>
          <p className="font-medium capitalize">{bot.status}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Type</p>
          <p className="font-medium capitalize">{bot.type}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Created
          </p>
          <p className="font-medium">{new Date(bot.createdAt).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            Total
          </p>
          <p className="font-medium">${bot.total.toFixed(2)}</p>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-semibold mb-3">Items</h3>
        <div className="space-y-2">
          {bot.items.map((item) => (
            <div key={item.id} className="flex justify-between p-3 bg-muted rounded">
              <div>
                <p className="font-medium">{item.productName}</p>
                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                {item.specialInstructions && (
                  <p className="text-xs text-muted-foreground italic mt-1">{item.specialInstructions}</p>
                )}
              </div>
              <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t mt-4 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${bot.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>${bot.tax.toFixed(2)}</span>
        </div>
        {bot.discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount</span>
            <span>-${bot.discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-lg border-t pt-2">
          <span>Total</span>
          <span>${bot.total.toFixed(2)}</span>
        </div>
      </div>
    </Card>
  )
}
