// Domain layer: Table Entity

export type TableStatus = "available" | "occupied" | "reserved" | "maintenance"

export interface Table {
  id: string
  number: string
  capacity: number
  status: TableStatus
  section: string
  currentOrderId?: string
  createdAt: Date
  updatedAt: Date
}
