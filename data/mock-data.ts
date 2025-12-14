import { Customer, Credit } from "@/lib/types"

export const mockCustomers: Customer[] = [
  { id: 1, name: "Ramesh Kumar", phone: "9876543210" },
  { id: 2, name: "Priya Sharma", phone: "9876543211" },
  { id: 3, name: "Amit Patel", phone: "9876543212" },
  { id: 4, name: "Sunita Devi", phone: "9876543213" },
]

export const mockCredits: Credit[] = [
  {
    id: 1,
    customerId: 1,
    amount: 2500,
    note: "Grocery items - rice, dal, oil",
    dueDate: "2025-12-12",
    status: "pending",
    createdAt: "2024-11-01",
  },
  {
    id: 2,
    customerId: 1,
    amount: 1200,
    note: "Monthly provisions",
    dueDate: "2025-12-09",
    status: "pending",
    createdAt: "2024-10-25",
  },
  {
    id: 3,
    customerId: 2,
    amount: 3500,
    note: "Festival shopping - sweets, snacks",
    dueDate: "2025-12-15",
    status: "pending",
    createdAt: "2024-11-15",
  },
  {
    id: 4,
    customerId: 3,
    amount: 8500,
    note: "Bulk order - 50kg rice",
    dueDate: "2025-12-11",
    status: "pending",
    createdAt: "2024-11-10",
  },
  {
    id: 5,
    customerId: 4,
    amount: 1800,
    note: "Daily essentials",
    dueDate: "2025-12-19",
    status: "pending",
    createdAt: "2024-11-20",
  },
]
