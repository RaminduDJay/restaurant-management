// Type definitions and shared interfaces

export type UserRole = "admin" | "manager" | "staff" | "cashier" | "waiter" | "kitchen"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  restaurant_id: string
  avatar?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}
