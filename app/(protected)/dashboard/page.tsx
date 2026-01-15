// Dashboard: Overview Page

"use client"

import { useEffect } from "react"
import { LayoutWrapper } from "@/src/shared/components/layout-wrapper"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Users, TrendingUp, Clock } from "lucide-react"
import { useAuthStore } from "@/src/store/auth.store"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { isAuthenticated, isLoading } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  const stats = [
    {
      label: "Today's Orders",
      value: "24",
      icon: <ShoppingCart className="w-6 h-6" />,
      trend: "+12%",
      color: "text-blue-600",
    },
    {
      label: "Active Customers",
      value: "156",
      icon: <Users className="w-6 h-6" />,
      trend: "+5%",
      color: "text-green-600",
    },
    {
      label: "Revenue Today",
      value: "$2,450",
      icon: <TrendingUp className="w-6 h-6" />,
      trend: "+18%",
      color: "text-purple-600",
    },
    {
      label: "Avg Wait Time",
      value: "12 min",
      icon: <Clock className="w-6 h-6" />,
      trend: "-3%",
      color: "text-orange-600",
    },
  ]

  return (
    <LayoutWrapper title="Dashboard" subtitle="Welcome back! Here's your restaurant overview.">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className={`${stat.color}`}>{stat.icon}</span>
              <span className="text-sm font-semibold text-green-600">{stat.trend}</span>
            </div>
            <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Order #{1000 + i}</p>
                    <p className="text-sm text-muted-foreground">Table 5 • 2:30 PM</p>
                  </div>
                  <span className="text-sm font-semibold">$45.50</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Orders
            </Button>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                New Order
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Manage Tables
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                View Kitchen
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Generate Report
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </LayoutWrapper>
  )
}
