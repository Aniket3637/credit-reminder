"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Phone,
  FileText,
  IndianRupee,
  Plus,
  Calendar,
  MessageSquare,
  Copy,
  Check,
} from "lucide-react";

interface Credit {
  id: number;
  amount: number;
  items: string;
  dueDate: string;
  addedDate: string;
  status: "pending" | "paid" | "overdue";
}

import { use } from 'react';

export default function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [credits, setCredits] = useState<Credit[]>([
    {
      id: 1,
      amount: 2500,
      items: "Monthly groceries",
      dueDate: "2024-04-15",
      addedDate: "2024-04-01",
      status: "pending",
    },
    {
      id: 2,
      amount: 1200,
      items: "Milk & bread",
      dueDate: "2024-04-10",
      addedDate: "2024-04-05",
      status: "paid",
    },
  ]);

  const [isAddCreditModalOpen, setIsAddCreditModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [selectedCredit, setSelectedCredit] = useState<Credit | null>(null);
  const [newAmount, setNewAmount] = useState("");
  const [newItems, setNewItems] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [copied, setCopied] = useState(false);

  // NEW: state for Groq AI integration
  const [aiMessage, setAiMessage] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const customer = {
    id: Number(id),
    name: "Ramesh Kumar",
    phone: "9876543210",
    isRegular: true,
  };

  // ... rest of your component code continues here


  const getTotalOutstanding = () => {
    return credits
      .filter((credit) => credit.status === "pending" || credit.status === "overdue")
      .reduce((sum, credit) => sum + credit.amount, 0);
  };

  const getPendingCreditsCount = () => {
    return credits.filter(
      (credit) => credit.status === "pending" || credit.status === "overdue"
    ).length;
  };

  const calculateDueStatus = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return `${Math.abs(diffDays)}d Overdue`;
    } else if (diffDays === 0) {
      return "Due Today";
    } else {
      return `Due in ${diffDays}d`;
    }
  };

  const getDaysOverdue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = today.getTime() - due.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleAddCredit = () => {
    if (!newAmount || !newItems || !newDueDate) return;

    const newCredit: Credit = {
      id: credits.length + 1,
      amount: Number(newAmount),
      items: newItems,
      dueDate: newDueDate,
      addedDate: new Date().toISOString().split("T")[0],
      status: "pending",
    };

    setCredits([newCredit, ...credits]);
    setIsAddCreditModalOpen(false);
    setNewAmount("");
    setNewItems("");
    setNewDueDate("");
  };

  const handleMarkPaid = (id: number) => {
    setCredits(
      credits.map((credit) =>
        credit.id === id ? { ...credit, status: "paid" } : credit
      )
    );
    setIsReminderModalOpen(false);
    setSelectedCredit(null);
  };

  // OLD local template (used as fallback if API fails)
  const generateReminderMessage = (credit: Credit) => {
    const daysOverdue = getDaysOverdue(credit.dueDate);

    if (daysOverdue > 0) {
      return `Dear ${customer.name},\n\nThis is a gentle reminder that your payment of ₹${credit.amount.toLocaleString(
        "en-IN"
      )} for "${credit.items}" is overdue by ${daysOverdue} days.\n\nDue Date: ${
        credit.dueDate
      }\n\nRequest you to please clear this amount at the earliest.\n\nThank you!`;
    }

    return `Dear ${customer.name},\n\nThis is a reminder for your upcoming payment of ₹${credit.amount.toLocaleString(
      "en-IN"
    )} for "${credit.items}".\n\nDue Date: ${
      credit.dueDate
    }\n\nRequest you to kindly keep this in mind.\n\nThank you!`;
  };

  // NEW: call Next.js API which uses Groq
  const handleRemind = async (credit: Credit) => {
    setSelectedCredit(credit);
    setIsReminderModalOpen(true);
    setAiMessage("");
    setIsGenerating(true);

    try {
      const res = await fetch("/api/generate-reminder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customer.name,
          amount: credit.amount,
          items: credit.items,
          dueDate: credit.dueDate,
          daysOverdue: getDaysOverdue(credit.dueDate),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate reminder");
      }

      const data = await res.json();
      setAiMessage(data.message || "");
    } catch (err) {
      console.error(err);
      // fallback to local template
      setAiMessage(generateReminderMessage(credit));
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (!selectedCredit) return;

    const messageToCopy =
      aiMessage || generateReminderMessage(selectedCredit);

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(messageToCopy)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {
          alert("Copy failed. Please copy manually.");
        });
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = messageToCopy;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        alert("Copy failed. Please copy manually.");
      }
      document.body.removeChild(textarea);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-4">
        {/* Header */}
        <button
          onClick={() => router.push("/customers")}
          className="flex items-center text-gray-600 mb-4 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Customers
        </button>

        {/* Customer Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-lg font-semibold text-indigo-600">
                {customer.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                {customer.name}
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Phone className="w-4 h-4" />
                <span>{customer.phone}</span>
                {customer.isRegular && (
                  <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full">
                    Regular Customer
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Total Outstanding</span>
              <IndianRupee className="w-4 h-4 text-indigo-500" />
            </div>
            <p className="text-2xl font-semibold text-gray-900">
              ₹{getTotalOutstanding().toLocaleString("en-IN")}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Pending Credits</span>
              <FileText className="w-4 h-4 text-orange-500" />
            </div>
            <p className="text-2xl font-semibold text-gray-900">
              {getPendingCreditsCount()}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-semibold text-gray-900">
            Credit History
          </h2>
          <button
            onClick={() => setIsAddCreditModalOpen(true)}
            className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-xl text-sm hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4" />
            Add Credit
          </button>
        </div>

        {/* Credit List */}
        <div className="space-y-3">
          {credits.map((credit) => (
            <div
              key={credit.id}
              className="bg-white rounded-2xl p-4 shadow-sm flex justify-between items-start"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-lg font-semibold text-gray-900">
                    ₹{credit.amount.toLocaleString("en-IN")}
                  </p>
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${
                      credit.status === "paid"
                        ? "bg-green-50 text-green-700"
                        : credit.status === "overdue"
                        ? "bg-red-50 text-red-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {credit.status === "paid"
                      ? "Paid"
                      : calculateDueStatus(credit.dueDate)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{credit.items}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Added: {credit.addedDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Due: {credit.dueDate}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {credit.status !== "paid" && (
                  <button
                    onClick={() => handleRemind(credit)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm border border-indigo-200 text-indigo-600 rounded-full hover:bg-indigo-50"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Remind
                  </button>
                )}
                {credit.status !== "paid" && (
                  <button
                    onClick={() => handleMarkPaid(credit.id)}
                    className="text-xs text-gray-500 hover:text-green-600"
                  >
                    Mark as Paid
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Credit Modal */}
      {isAddCreditModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-lg">
              <h3 className="text-base font-semibold mb-4">Add New Credit</h3>
              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-sm"
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Items / Note
                  </label>
                  <input
                    type="text"
                    value={newItems}
                    onChange={(e) => setNewItems(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-sm"
                    placeholder="e.g. Monthly kirana"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl text-sm"
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setIsAddCreditModalOpen(false)}
                  className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCredit}
                  className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                >
                  Save Credit
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Reminder Modal */}
      {isReminderModalOpen && selectedCredit && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setIsReminderModalOpen(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold">
                  Payment Reminder Message
                </h3>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 mb-3 border text-xs text-gray-600">
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <span className="text-gray-500">Customer</span>
                    <p className="font-semibold text-gray-900">
                      {customer.name}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Amount</span>
                    <p className="font-semibold text-gray-900">
                      ₹{selectedCredit.amount.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Due Date</span>
                    <p className="font-semibold text-gray-900">
                      {selectedCredit.dueDate}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Status</span>
                    <p className="font-semibold text-gray-900">
                      {calculateDueStatus(selectedCredit.dueDate)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 mb-3 border">
                <p className="text-xs text-gray-500 mb-1">WhatsApp Message</p>
                <p className="text-gray-700 whitespace-pre-line text-sm">
                  {isGenerating
                    ? "Generating WhatsApp message..."
                    : aiMessage || generateReminderMessage(selectedCredit)}
                </p>
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setIsReminderModalOpen(false)}
                  className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={copyToClipboard}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2 justify-center text-sm"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copied ? "Copied!" : "Copy Message"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
