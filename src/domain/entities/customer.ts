// Domain layer: Customer Entity

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  loyaltyPoints: number
  totalSpent: number
  lastVisit: Date
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
