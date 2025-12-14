import { mockCustomers, mockCredits } from "@/data/mock-data"
import { CreditWithCustomer } from "./types"
import { isToday, parseISO, isWithinInterval, addDays } from "date-fns"

export async function getCustomers() {
  return mockCustomers
}

export async function getCustomer(id: number) {
  return mockCustomers.find((c) => c.id === id)
}

export async function getCustomerCredits(customerId: number) {
  return mockCredits.filter((c) => c.customerId === customerId && c.status === "pending")
}

export async function getCreditsWithCustomers(): Promise<CreditWithCustomer[]> {
  return mockCredits
    .filter((c) => c.status === "pending")
    .map((credit) => {
      const customer = mockCustomers.find((cust) => cust.id === credit.customerId)!
      return {
        ...credit,
        customerName: customer.name,
        customerPhone: customer.phone,
      }
    })
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
}

export async function getStats() {
  const pendingCredits = mockCredits.filter((c) => c.status === "pending")
  const today = new Date()

  return {
    totalOutstanding: pendingCredits.reduce((sum, c) => sum + c.amount, 0),
    customersWithDues: new Set(pendingCredits.map((c) => c.customerId)).size,
    dueToday: pendingCredits.filter((c) => isToday(parseISO(c.dueDate))).length,
    dueThisWeek: pendingCredits.filter((c) => {
      const due = parseISO(c.dueDate)
      return isWithinInterval(due, { start: today, end: addDays(today, 7) })
    }).length,
  }
}

export async function getCustomerTotal(customerId: number) {
  return mockCredits
    .filter((c) => c.customerId === customerId && c.status === "pending")
    .reduce((sum, c) => sum + c.amount, 0)
}
