"use client"

// Shared hook: Auth Redirect

import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { useAuthStore } from "@/store/auth.store"

export function useAuthRedirect() {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, isLoading } = useAuthStore()

  useEffect(() => {
    if (isLoading) return

    const publicRoutes = ["/login", "/signup", "/"]
    const isPublicRoute = publicRoutes.includes(pathname)

    if (!isAuthenticated && !isPublicRoute) {
      router.push("/login")
    }

    if (isAuthenticated && (pathname === "/login" || pathname === "/signup")) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isLoading, pathname, router])
}
