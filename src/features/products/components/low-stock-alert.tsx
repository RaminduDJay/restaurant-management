// Products Feature: Low Stock Alert Component

"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useProductStore } from "@/src/store/product.store"
import { AlertTriangle } from "lucide-react"

export function LowStockAlert() {
  const { products } = useProductStore()
  const [lowStockProducts, setLowStockProducts] = useState<typeof products>([])

  useEffect(() => {
    const low = products.filter((p) => p.quantity < 10)
    setLowStockProducts(low)
  }, [products])

  if (lowStockProducts.length === 0) return null

  return (
    <Alert className="border-yellow-200 bg-yellow-50">
      <AlertTriangle className="h-4 w-4 text-yellow-600" />
      <AlertTitle className="text-yellow-900">Low Stock Alert</AlertTitle>
      <AlertDescription className="text-yellow-700 mt-2">
        <div className="space-y-1">
          {lowStockProducts.slice(0, 3).map((product) => (
            <p key={product.id} className="text-sm">
              {product.name}: {product.quantity} {product.unit} remaining
            </p>
          ))}
          {lowStockProducts.length > 3 && (
            <p className="text-sm font-semibold">+{lowStockProducts.length - 3} more items</p>
          )}
        </div>
      </AlertDescription>
    </Alert>
  )
}
