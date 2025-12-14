// "use client"

// import { useState } from "react"
// import { MessageSquare, Copy, X } from "lucide-react"

// interface ReminderDialogProps {
//   customerName: string
//   amount: number
//   note: string
//   dueDate: string
// }

// export default function ReminderDialog({
//   customerName,
//   amount,
//   note,
//   dueDate,
// }: ReminderDialogProps) {
//   const [isOpen, setIsOpen] = useState(false)
//   const [message, setMessage] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [copied, setCopied] = useState(false)

//   const generateReminder = async () => {
//     setLoading(true)
//     try {
//       const response = await fetch("/api/generate-reminder", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ customerName, amount, note, dueDate }),
//       })
//       const data = await response.json()
//       setMessage(data.messageText)
//     } catch (error) {
//       setMessage("Failed to generate reminder. Please try again.")
//     }
//     setLoading(false)
//   }

//   const handleOpen = () => {
//     setIsOpen(true)
//     generateReminder()
//   }

//   const copyMessage = () => {
//     navigator.clipboard.writeText(message)
//     setCopied(true)
//     setTimeout(() => setCopied(false), 2000)
//   }

//   if (!isOpen) {
//     return (
//       <button
//         onClick={handleOpen}
//         className="p-2 rounded-lg hover:bg-purple-50 transition-colors"
//         title="Send Reminder"
//       >
//         <MessageSquare className="w-5 h-5 text-purple-600" />
//       </button>
//     )
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-lg w-full p-6 relative">
//         <button
//           onClick={() => setIsOpen(false)}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
//         >
//           <X className="w-5 h-5" />
//         </button>

//         <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Reminder</h2>

//         <div className="mb-4 p-4 bg-gray-50 rounded-lg">
//           <div className="grid grid-cols-2 gap-2 text-sm">
//             <div className="text-gray-600">Customer:</div>
//             <div className="font-semibold">{customerName}</div>
//             <div className="text-gray-600">Amount:</div>
//             <div className="font-semibold">₹{amount.toLocaleString()}</div>
//             <div className="text-gray-600">Due Date:</div>
//             <div className="font-semibold">{new Date(dueDate).toLocaleDateString()}</div>
//             <div className="text-gray-600">Status:</div>
//             <div className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded w-fit">
//               Ready to send
//             </div>
//           </div>
//         </div>

//         <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
//           AI-Generated Reminder
//           <span className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded">
//             Personalized
//           </span>
//         </h3>

//         {loading ? (
//           <div className="p-4 bg-gray-50 rounded-lg text-center text-gray-600">
//             Generating reminder...
//           </div>
//         ) : (
//           <>
//             <div className="p-4 bg-gray-50 rounded-lg mb-4 whitespace-pre-wrap text-sm">
//               {message || "Click to generate reminder"}
//             </div>

//             <div className="flex gap-2">
//               <button
//                 onClick={copyMessage}
//                 className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
//               >
//                 <Copy className="w-4 h-4" />
//                 {copied ? "Copied!" : "Copy Message"}
//               </button>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   )
// }
