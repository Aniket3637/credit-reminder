export interface Customer {
  id: number
  name: string
  phone: string
}

export interface Credit {
  id: number
  customerId: number
  amount: number
  note: string
  dueDate: string
  status: "pending" | "paid"
  createdAt: string
}

export interface CreditWithCustomer extends Credit {
  customerName: string
  customerPhone: string
}
