// Infrastructure layer: Product Repository

import { apiClient } from "../client"
import type { Product, ProductCategory } from "@/domain/entities/product"

export class ProductRepository {
  async getProducts() {
    return apiClient.get<Product[]>("/products")
  }

  async getProductById(id: string) {
    return apiClient.get<Product>(`/products/${id}`)
  }

  async createProduct(product: Omit<Product, "id" | "createdAt" | "updatedAt">) {
    return apiClient.post<Product>("/products", product)
  }

  async updateProduct(id: string, product: Partial<Product>) {
    return apiClient.put<Product>(`/products/${id}`, product)
  }

  async deleteProduct(id: string) {
    return apiClient.delete(`/products/${id}`)
  }

  async getCategories() {
    return apiClient.get<ProductCategory[]>("/products/categories")
  }

  async getLowStockProducts(threshold = 10) {
    return apiClient.get<Product[]>("/products/low-stock", { params: { threshold } })
  }
}

export const productRepository = new ProductRepository()
