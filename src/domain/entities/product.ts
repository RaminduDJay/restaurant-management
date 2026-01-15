// Domain layer: Product Entity

export interface Product {
  id: string
  name: string
  description: string
  category: string
  price: number
  cost: number
  quantity: number
  unit: string
  image?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ProductCategory {
  id: string
  name: string
  description?: string
}
