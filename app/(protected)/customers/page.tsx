// Customers: Main Page

"use client"

import { useState } from "react"
import { LayoutWrapper } from "@/src/shared/components/layout-wrapper"
import { Button } from "@/components/ui/button"
import { CustomerList } from "@/src/features/customers/components/customer-list"
import { CustomerForm } from "@/src/features/customers/components/customer-form"
import { useCustomerStore } from "@/src/store/customer.store"
import type { Customer } from "@/domain/entities/customer"
import { Plus } from "lucide-react"
import { useAuthRedirect } from "@/src/shared/hooks/use-auth-redirect"

export default function CustomersPage() {
  useAuthRedirect()
  const [showForm, setShowForm] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>()
  const { addCustomer, updateCustomer, deleteCustomer } = useCustomerStore()

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer)
    setShowForm(true)
  }

  const handleDelete = async (customerId: string) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      await deleteCustomer(customerId)
    }
  }

  const handleFormSubmit = async (data: Omit<Customer, "id" | "createdAt" | "updatedAt">) => {
    if (selectedCustomer) {
      await updateCustomer(selectedCustomer.id, data)
    } else {
      await addCustomer(data)
    }

    setShowForm(false)
    setSelectedCustomer(undefined)
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setSelectedCustomer(undefined)
  }

  return (
    <LayoutWrapper title="Customers" subtitle="Manage customer information and loyalty program">
      <div className="space-y-6">
        {!showForm && (
          <div className="flex justify-end">
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Customer
            </Button>
          </div>
        )}

        {showForm ? (
          <CustomerForm customer={selectedCustomer} onSubmit={handleFormSubmit} onCancel={handleFormCancel} />
        ) : (
          <CustomerList onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
    </LayoutWrapper>
  )
}
