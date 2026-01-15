// Products: Low Stock Page

"use client"

import { useEffect } from "react"
import { LayoutWrapper } from "@/src/shared/components/layout-wrapper"
import { Card } from "@/components/ui/card"
import { useProductStore } from "@/src/store/product.store"
import { AlertTriangle } from "lucide-react"
import { useAuthRedirect } from "@/src/shared/hooks/use-auth-redirect"

export default function LowStockPage() {
  useAuthRedirect()
  const { products, fetchProducts } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const lowStockProducts = products.filter((p) => p.quantity < 10 && p.isActive)

  return (
    <LayoutWrapper title="Low Stock Products" subtitle="Products that need reordering">
      <div className="space-y-4">
        {lowStockProducts.length === 0 ? (
          <Card className="p-8 text-center bg-green-50 border-green-200">
            <div className="text-green-700">
              <p className="text-lg font-semibold">All Good!</p>
              <p className="text-sm">No products are currently low in stock</p>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4">
            {lowStockProducts.map((product) => (
              <Card key={product.id} className="p-4 border-l-4 border-l-yellow-500">
                <div className="flex items-center gap-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-destructive">
                      {product.quantity} {product.unit}
                    </p>
                    <p className="text-sm text-muted-foreground">Reorder threshold: 10 {product.unit}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </LayoutWrapper>
  )
}
