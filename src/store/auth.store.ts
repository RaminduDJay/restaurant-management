// Global state: Auth Store using Zustand

import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import type { User } from "@/types"
import { authRepository } from "@/infrastructure/api/repositories/auth.repository"

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean

  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  setLoading: (isLoading: boolean) => void

  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,

        setUser: (user) => set({ user }),
        setToken: (token) => set({ token }),
        setLoading: (isLoading) => set({ isLoading }),

        login: async (email: string, password: string) => {
          set({ isLoading: true })
          try {
            const response = await authRepository.login({ email, password })
            if (response.success && response.data) {
              set({
                user: response.data.user,
                token: response.data.token,
                isAuthenticated: true,
              })
              return true
            }
            return false
          } finally {
            set({ isLoading: false })
          }
        },

        signup: async (name: string, email: string, password: string) => {
          set({ isLoading: true })
          try {
            const response = await authRepository.signup({ name, email, password })
            if (response.success && response.data) {
              set({
                user: response.data.user,
                token: response.data.token,
                isAuthenticated: true,
              })
              return true
            }
            return false
          } finally {
            set({ isLoading: false })
          }
        },

        logout: async () => {
          set({ isLoading: true })
          try {
            await authRepository.logout()
            set({ user: null, token: null, isAuthenticated: false })
          } finally {
            set({ isLoading: false })
          }
        },

        checkAuth: async () => {
          set({ isLoading: true })
          try {
            const response = await authRepository.getCurrentUser()
            if (response.success && response.data) {
              set({ user: response.data, isAuthenticated: true })
            } else {
              set({ user: null, isAuthenticated: false })
            }
          } finally {
            set({ isLoading: false })
          }
        },
      }),
      {
        name: "auth-store",
      },
    ),
  ),
)
