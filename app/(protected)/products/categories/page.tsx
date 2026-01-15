// Products: Categories Page

"use client"

import { useState } from "react"
import { LayoutWrapper } from "@/src/shared/components/layout-wrapper"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Trash2 } from "lucide-react"
import { useAuthRedirect } from "@/src/shared/hooks/use-auth-redirect"

interface Category {
  id: string
  name: string
  description?: string
}

export default function CategoriesPage() {
  useAuthRedirect()
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Beverages", description: "Drinks and beverages" },
    { id: "2", name: "Appetizers", description: "Starters and appetizers" },
    { id: "3", name: "Main Course", description: "Main dishes" },
    { id: "4", name: "Desserts", description: "Sweet treats" },
    { id: "5", name: "Condiments", description: "Sauces and condiments" },
  ])
  const [showForm, setShowForm] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: "", description: "" })

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      setCategories([...categories, { id: Date.now().toString(), ...newCategory }])
      setNewCategory({ name: "", description: "" })
      setShowForm(false)
    }
  }

  const handleDeleteCategory = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((c) => c.id !== id))
    }
  }

  return (
    <LayoutWrapper title="Product Categories" subtitle="Manage product categories">
      <div className="space-y-6">
        {!showForm && (
          <div className="flex justify-end">
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Category
            </Button>
          </div>
        )}

        {showForm && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">New Category</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category Name *</label>
                <Input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={newCategory.description || ""}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  placeholder="Enter description"
                  rows={3}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background"
                />
              </div>
              <div className="flex gap-3">
                <Button onClick={handleAddCategory} className="flex-1">
                  Add Category
                </Button>
                <Button variant="outline" onClick={() => setShowForm(false)} className="flex-1 bg-transparent">
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Categories List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Card key={category.id} className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-lg">{category.name}</h4>
                <button onClick={() => handleDeleteCategory(category.id)} className="p-2 hover:bg-muted rounded-lg">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>
              {category.description && <p className="text-sm text-muted-foreground">{category.description}</p>}
            </Card>
          ))}
        </div>
      </div>
    </LayoutWrapper>
  )
}
