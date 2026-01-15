// Invoices: Main Page

"use client"

import { useState } from "react"
import { LayoutWrapper } from "@/src/shared/components/layout-wrapper"
import { InvoiceList } from "@/src/features/invoices/components/invoice-list"
import { InvoiceDetail } from "@/src/features/invoices/components/invoice-detail"
import type { Invoice } from "@/domain/entities/invoice"
import { useAuthRedirect } from "@/src/shared/hooks/use-auth-redirect"

export default function InvoicesPage() {
  useAuthRedirect()
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | undefined>()

  return (
    <LayoutWrapper title="Invoices" subtitle="Manage invoices and payment tracking">
      <div className="space-y-6">
        {selectedInvoice ? (
          <InvoiceDetail invoice={selectedInvoice} onClose={() => setSelectedInvoice(undefined)} />
        ) : (
          <InvoiceList onView={setSelectedInvoice} />
        )}
      </div>
    </LayoutWrapper>
  )
}
