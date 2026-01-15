// Shared component: Sidebar Navigation

"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  UtensilsCrossed,
  Users,
  FileText,
  BarChart3,
  Calendar,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from "lucide-react"
import { useAuthStore } from "@/store/auth.store"
import { Button } from "@/components/ui/button"

interface NavItem {
  label: string
  icon: React.ReactNode
  href: string
  children?: NavItem[]
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    href: "/dashboard",
  },
  {
    label: "Orders",
    icon: <ShoppingCart className="w-5 h-5" />,
    href: "/orders",
    children: [
      { label: "All Orders", icon: null, href: "/orders" },
      { label: "Dine-In", icon: null, href: "/orders/dine-in" },
      { label: "Takeaway", icon: null, href: "/orders/takeaway" },
      { label: "Kitchen Display", icon: null, href: "/orders/kitchen" },
    ],
  },
  {
    label: "Tables",
    icon: <UtensilsCrossed className="w-5 h-5" />,
    href: "/tables",
  },
  {
    label: "Products",
    icon: <Package className="w-5 h-5" />,
    href: "/products",
    children: [
      { label: "Inventory", icon: null, href: "/products" },
      { label: "Categories", icon: null, href: "/products/categories" },
      { label: "Low Stock", icon: null, href: "/products/low-stock" },
    ],
  },
  {
    label: "Menu",
    icon: <FileText className="w-5 h-5" />,
    href: "/menu",
  },
  {
    label: "Customers",
    icon: <Users className="w-5 h-5" />,
    href: "/customers",
  },
  {
    label: "Invoices",
    icon: <FileText className="w-5 h-5" />,
    href: "/invoices",
  },
  {
    label: "Analytics",
    icon: <BarChart3 className="w-5 h-5" />,
    href: "/analytics",
  },
  {
    label: "Calendar",
    icon: <Calendar className="w-5 h-5" />,
    href: "/calendar",
  },
  {
    label: "Notifications",
    icon: <Bell className="w-5 h-5" />,
    href: "/notifications",
  },
  {
    label: "Settings",
    icon: <Settings className="w-5 h-5" />,
    href: "/settings",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const { logout, user } = useAuthStore()

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) => (prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]))
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

  const handleLogout = async () => {
    await logout()
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-40 p-2 hover:bg-sidebar-accent rounded-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:relative md:translate-x-0 w-64 h-screen bg-sidebar text-sidebar-foreground transition-transform duration-300 z-30 flex flex-col`}
      >
        {/* Logo/Header */}
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-2xl font-bold text-sidebar-primary">RestaurantPOS</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              <Link href={item.href}>
                <button
                  onClick={() => item.children && toggleExpand(item.label)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "hover:bg-sidebar-accent"
                  }`}
                >
                  <span className="flex items-center gap-3 text-sm font-medium">
                    {item.icon}
                    {item.label}
                  </span>
                  {item.children && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        expandedItems.includes(item.label) ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>
              </Link>

              {/* Submenu */}
              {item.children && expandedItems.includes(item.label) && (
                <div className="ml-4 mt-2 space-y-1">
                  {item.children.map((child) => (
                    <Link key={child.label} href={child.href}>
                      <button
                        className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors ${
                          isActive(child.href) ? "bg-sidebar-accent text-sidebar-primary" : "hover:bg-sidebar-accent"
                        }`}
                      >
                        {child.label}
                      </button>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-sidebar-border space-y-3">
          {user && (
            <div className="px-4 py-2 rounded-lg bg-sidebar-accent">
              <p className="text-xs font-semibold text-sidebar-foreground">{user.name}</p>
              <p className="text-xs text-sidebar-foreground opacity-75">{user.role}</p>
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start gap-2 bg-transparent"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 md:hidden z-20" onClick={() => setIsOpen(false)} />}
    </>
  )
}
