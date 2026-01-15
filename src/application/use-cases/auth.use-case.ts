// Application layer: Auth Use Cases

import { AuthRepository } from "@/infrastructure/api/repositories/auth.repository"

export class AuthUseCase {
  constructor(private authRepository: AuthRepository) {}

  async login(email: string, password: string) {
    return this.authRepository.login({ email, password })
  }

  async signup(name: string, email: string, password: string) {
    return this.authRepository.signup({ name, email, password })
  }

  async logout() {
    return this.authRepository.logout()
  }

  async getCurrentUser() {
    return this.authRepository.getCurrentUser()
  }

  async refreshToken() {
    return this.authRepository.refreshToken()
  }
}

export const authUseCase = new AuthUseCase(AuthRepository.prototype.constructor as any)
