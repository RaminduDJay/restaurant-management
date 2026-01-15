// Invoices Feature: Invoice Detail Component

"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Invoice } from "@/domain/entities/invoice"
import { X, Printer, Download } from "lucide-react"

interface InvoiceDetailProps {
  invoice: Invoice
  onClose: () => void
}

export function InvoiceDetail({ invoice, onClose }: InvoiceDetailProps) {
  return (
    <Card className="p-6 max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Invoice #{invoice.invoiceNumber}</h2>
        <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Invoice Header */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <p className="text-sm text-muted-foreground">Invoice Date</p>
          <p className="font-semibold">{new Date(invoice.createdAt).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Order ID</p>
          <p className="font-semibold">{invoice.orderId}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Payment Method</p>
          <p className="font-semibold capitalize">{invoice.paymentMethod}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Status</p>
          <p
            className={`font-semibold ${invoice.paymentStatus === "completed" ? "text-green-600" : "text-yellow-600"}`}
          >
            {invoice.paymentStatus.charAt(0).toUpperCase() + invoice.paymentStatus.slice(1)}
          </p>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="bg-muted p-4 rounded-lg mb-6 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${invoice.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax:</span>
          <span>${invoice.tax.toFixed(2)}</span>
        </div>
        {invoice.discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount:</span>
            <span>-${invoice.discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-semibold text-lg border-t border-border pt-2">
          <span>Total Amount:</span>
          <span>${invoice.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Notes */}
      {invoice.notes && (
        <div className="mb-6">
          <p className="text-sm font-semibold mb-2">Notes</p>
          <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">{invoice.notes}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button className="flex-1 gap-2">
          <Printer className="w-4 h-4" />
          Print Invoice
        </Button>
        <Button variant="outline" className="flex-1 gap-2 bg-transparent">
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
        <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
          Close
        </Button>
      </div>
    </Card>
  )
}
