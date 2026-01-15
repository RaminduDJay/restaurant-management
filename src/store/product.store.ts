// Global state: Product Store using Zustand

import { create } from "zustand"
import { devtools } from "zustand/middleware"
import type { Product } from "@/domain/entities/product"
import { productRepository } from "@/infrastructure/api/repositories/product.repository"

interface ProductState {
  products: Product[]
  isLoading: boolean
  error: string | null

  fetchProducts: () => Promise<void>
  addProduct: (product: Omit<Product, "id" | "createdAt" | "updatedAt">) => Promise<void>
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
  setError: (error: string | null) => void
}

export const useProductStore = create<ProductState>()(
  devtools((set) => ({
    products: [],
    isLoading: false,
    error: null,

    fetchProducts: async () => {
      set({ isLoading: true })
      try {
        const response = await productRepository.getProducts()
        if (response.success && response.data) {
          set({ products: response.data })
        }
      } catch (error) {
        set({ error: "Failed to fetch products" })
      } finally {
        set({ isLoading: false })
      }
    },

    addProduct: async (product) => {
      try {
        const response = await productRepository.createProduct(product)
        if (response.success && response.data) {
          set((state) => ({ products: [...state.products, response.data!] }))
        }
      } catch (error) {
        set({ error: "Failed to add product" })
      }
    },

    updateProduct: async (id, product) => {
      try {
        const response = await productRepository.updateProduct(id, product)
        if (response.success && response.data) {
          set((state) => ({
            products: state.products.map((p) => (p.id === id ? response.data! : p)),
          }))
        }
      } catch (error) {
        set({ error: "Failed to update product" })
      }
    },

    deleteProduct: async (id) => {
      try {
        const response = await productRepository.deleteProduct(id)
        if (response.success) {
          set((state) => ({
            products: state.products.filter((p) => p.id !== id),
          }))
        }
      } catch (error) {
        set({ error: "Failed to delete product" })
      }
    },

    setError: (error) => set({ error }),
  })),
)
