// Infrastructure layer: Auth Repository

import { apiClient } from "../client"
import type { User } from "@/types"

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupCredentials extends LoginCredentials {
  name: string
}

export class AuthRepository {
  async login(credentials: LoginCredentials) {
    return apiClient.post<{ user: User; token: string }>("/auth/login", credentials)
  }

  async signup(credentials: SignupCredentials) {
    return apiClient.post<{ user: User; token: string }>("/auth/signup", credentials)
  }

  async logout() {
    return apiClient.post("/auth/logout")
  }

  async getCurrentUser() {
    return apiClient.get<User>("/auth/me")
  }

  async refreshToken() {
    return apiClient.post<{ token: string }>("/auth/refresh")
  }
}

export const authRepository = new AuthRepository()
