// Products: Main Page

"use client"

import { useState } from "react"
import { LayoutWrapper } from "@/src/shared/components/layout-wrapper"
import { Button } from "@/components/ui/button"
import { ProductList } from "@/src/features/products/components/product-list"
import { ProductForm } from "@/src/features/products/components/product-form"
import { LowStockAlert } from "@/src/features/products/components/low-stock-alert"
import { useProductStore } from "@/src/store/product.store"
import { Plus } from "lucide-react"
import type { Product } from "@/domain/entities/product"
import { useAuthRedirect } from "@/src/shared/hooks/use-auth-redirect"

export default function ProductsPage() {
  useAuthRedirect()
  const [showForm, setShowForm] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>()
  const { addProduct, updateProduct, deleteProduct } = useProductStore()

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setShowForm(true)
  }

  const handleDelete = async (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(productId)
    }
  }

  const handleFormSubmit = async (data: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
    if (selectedProduct) {
      await updateProduct(selectedProduct.id, data)
    } else {
      await addProduct(data)
    }

    setShowForm(false)
    setSelectedProduct(undefined)
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setSelectedProduct(undefined)
  }

  return (
    <LayoutWrapper title="Products" subtitle="Manage your product inventory and catalog">
      <div className="space-y-6">
        {/* Low Stock Alert */}
        <LowStockAlert />

        {/* Header Action */}
        {!showForm && (
          <div className="flex justify-end">
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </div>
        )}

        {/* Form or List */}
        {showForm ? (
          <ProductForm product={selectedProduct} onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
        ) : (
          <ProductList onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
    </LayoutWrapper>
  )
}
