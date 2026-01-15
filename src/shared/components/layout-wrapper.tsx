// Shared component: Layout Wrapper

"use client"

import type React from "react"
import { useMobileView } from "@/shared/hooks/use-mobile"
import { Sidebar } from "./sidebar"
import { Header } from "./header"

interface LayoutWrapperProps {
  children: React.ReactNode
  title: string
  subtitle?: string
}

export function LayoutWrapper({ children, title, subtitle }: LayoutWrapperProps) {
  const isMobile = useMobileView()

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header title={title} subtitle={subtitle} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
