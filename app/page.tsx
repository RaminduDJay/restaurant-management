// Landing page with authentication options

"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, BarChart3, ShoppingCart, Users } from "lucide-react"
import { useAuthStore } from "@/store/auth.store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LandingPage() {
  const { isAuthenticated, setUser, setToken } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  const handleDevMode = () => {
    const store = useAuthStore.getState()
    store.setUser({ id: "dev-user", name: "Dev User", email: "dev@example.com" })
    store.setToken("dev-token")
    useAuthStore.setState({ isAuthenticated: true })
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">RestaurantPOS</h1>
          <div className="flex gap-4">
            <Button onClick={handleDevMode} variant="outline">Dev Mode</Button>
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Complete Restaurant Management System</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Streamline your restaurant operations with our modern, feature-rich POS and management platform.
        </p>
        <Link href="/signup">
          <Button size="lg" className="gap-2">
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </section>

      {/* Features */}
      <section className="bg-card py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <ShoppingCart className="w-8 h-8" />,
                title: "Order Management",
                description: "Manage dine-in, takeaway, and delivery orders seamlessly",
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: "Analytics & Reports",
                description: "Real-time insights into sales, inventory, and performance metrics",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Staff Management",
                description: "Manage roles, permissions, and staff schedules efficiently",
              },
            ].map((feature, idx) => (
              <Card key={idx} className="p-6 text-center">
                <div className="text-primary mb-4 flex justify-center">{feature.icon}</div>
                <h4 className="font-semibold text-lg mb-2">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h3 className="text-3xl font-bold mb-6">Ready to Transform Your Restaurant?</h3>
        <Link href="/signup">
          <Button size="lg">Sign Up Now</Button>
        </Link>
      </section>
    </div>
  )
}
