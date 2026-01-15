// Infrastructure layer: API Client

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

interface ApiRequestConfig extends RequestInit {
  params?: Record<string, any>
}

class ApiClient {
  private baseUrl: string
  private token?: string

  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl
  }

  setToken(token: string): void {
    this.token = token
  }

  clearToken(): void {
    this.token = undefined
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`
    }

    return headers
  }

  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(
      `${this.baseUrl}${endpoint}`,
      typeof window === "undefined" ? "http://localhost" : window.location.origin,
    )

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          url.searchParams.append(key, String(value))
        }
      })
    }

    return url.toString()
  }

  async get<T>(endpoint: string, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: "GET" })
  }

  async post<T>(endpoint: string, body?: any, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  async put<T>(endpoint: string, body?: any, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  async delete<T>(endpoint: string, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: "DELETE" })
  }

  private async request<T>(
    endpoint: string,
    config: RequestInit & { params?: Record<string, any> },
  ): Promise<ApiResponse<T>> {
    const { params, ...fetchConfig } = config
    const url = this.buildUrl(endpoint, params)

    try {
      const response = await fetch(url, {
        ...fetchConfig,
        headers: this.getHeaders(),
      })

      if (!response.ok) {
        const error = await response.text()
        return {
          success: false,
          error: error || `HTTP ${response.status}`,
        }
      }

      const data = await response.json()
      return {
        success: true,
        data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }
}

export const apiClient = new ApiClient()
