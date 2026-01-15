// Application layer: Product Use Cases

import { ProductRepository } from "@/infrastructure/api/repositories/product.repository"
import type { Product } from "@/domain/entities/product"

export class ProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async getProducts() {
    return this.productRepository.getProducts()
  }

  async getProductById(id: string) {
    return this.productRepository.getProductById(id)
  }

  async createProduct(product: Omit<Product, "id" | "createdAt" | "updatedAt">) {
    return this.productRepository.createProduct(product)
  }

  async updateProduct(id: string, product: Partial<Product>) {
    return this.productRepository.updateProduct(id, product)
  }

  async deleteProduct(id: string) {
    return this.productRepository.deleteProduct(id)
  }

  async getCategories() {
    return this.productRepository.getCategories()
  }

  async getLowStockProducts(threshold?: number) {
    return this.productRepository.getLowStockProducts(threshold)
  }
}

export const productUseCase = new ProductUseCase(ProductRepository.prototype.constructor as any)
