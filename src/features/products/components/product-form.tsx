// Products Feature: Product Form Component

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { Product } from "@/domain/entities/product"
import { X } from "lucide-react"

interface ProductFormProps {
  product?: Product
  onSubmit: (data: Omit<Product, "id" | "createdAt" | "updatedAt">) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

const UNITS = ["pcs", "kg", "g", "ltr", "ml", "box", "dozen"]
const CATEGORIES = ["Beverages", "Appetizers", "Main Course", "Desserts", "Condiments", "Produce"]

export function ProductForm({ product, onSubmit, onCancel, isLoading = false }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    category: product?.category || "Beverages",
    price: product?.price || 0,
    cost: product?.cost || 0,
    quantity: product?.quantity || 0,
    unit: product?.unit || "pcs",
    isActive: product?.isActive ?? true,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
            ? Number.parseFloat(value) || 0
            : value,
    }))
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Product name is required"
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0"
    if (formData.cost < 0) newErrors.cost = "Cost must be 0 or greater"
    if (formData.quantity < 0) newErrors.quantity = "Quantity must be 0 or greater"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    try {
      await onSubmit({
        ...formData,
        image: undefined,
      })
    } catch (error) {
      console.error("Form submission error:", error)
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">{product ? "Edit Product" : "Add New Product"}</h2>
        <button onClick={onCancel} className="p-2 hover:bg-muted rounded-lg">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Product Name *</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              disabled={isLoading}
            />
            {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-input rounded-lg bg-background"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-2">Selling Price *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                disabled={isLoading}
                className="pl-7"
              />
            </div>
            {errors.price && <p className="text-destructive text-xs mt-1">{errors.price}</p>}
          </div>

          {/* Cost */}
          <div>
            <label className="block text-sm font-medium mb-2">Cost</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
              <Input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                disabled={isLoading}
                className="pl-7"
              />
            </div>
            {errors.cost && <p className="text-destructive text-xs mt-1">{errors.cost}</p>}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <Input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="0"
              disabled={isLoading}
            />
            {errors.quantity && <p className="text-destructive text-xs mt-1">{errors.quantity}</p>}
          </div>

          {/* Unit */}
          <div>
            <label className="block text-sm font-medium mb-2">Unit</label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-input rounded-lg bg-background"
            >
              {UNITS.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange as any}
            placeholder="Enter product description"
            disabled={isLoading}
            rows={3}
            className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
          />
        </div>

        {/* Margin Display */}
        {formData.price > 0 && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm">
              <span className="font-medium">Profit Margin:</span>{" "}
              <span className="font-semibold text-green-600">
                {(((formData.price - formData.cost) / formData.price) * 100).toFixed(1)}%
              </span>
            </p>
          </div>
        )}

        {/* Active Status */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            disabled={isLoading}
            className="w-4 h-4"
          />
          <label htmlFor="isActive" className="text-sm font-medium cursor-pointer">
            Active product
          </label>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={isLoading} className="flex-1">
            {isLoading ? "Saving..." : product ? "Update Product" : "Add Product"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 bg-transparent"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}
