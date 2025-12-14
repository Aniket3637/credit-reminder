"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"

interface AddCreditModalProps {
  customerId: number
  customerName: string
}

export default function AddCreditModal({ customerId, customerName }: AddCreditModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const [dueDate, setDueDate] = useState("")

  const setQuickDueDate = (days: number) => {
    const date = new Date()
    date.setDate(date.getDate() + days)
    setDueDate(date.toISOString().split("T")[0])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Credit added for ${customerName}: ₹${amount}`)
    setIsOpen(false)
    setAmount("")
    setNote("")
    setDueDate("")
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
      >
        <Plus className="w-5 h-5" />
        Add Credit
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Add Credit for {customerName}
              </h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (₹) *
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Items / Note *
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g., Rice 5kg, Dal 2kg, Oil 1L"
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date *
                </label>
                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => setQuickDueDate(7)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                  >
                    +7 days
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuickDueDate(15)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                  >
                    +15 days
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuickDueDate(30)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                  >
                    +30 days
                  </button>
                </div>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Add Credit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
