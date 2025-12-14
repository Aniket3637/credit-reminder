import { DashboardSummary } from '@/components/DashboardSummary';
import Link from 'next/link';
import { ChevronRight, Calendar, MessageCircle } from 'lucide-react';

export default function DashboardPage() {
  const transactions = [
    {
      id: 1,
      customerId: 1,
      customerName: 'Ramesh Kumar',
      initials: 'RK',
      description: 'Monthly provisions',
      amount: 1200,
      dueDate: '09 Dec 2025',
      daysOverdue: 3,
    },
    {
      id: 2,
      customerId: 3,
      customerName: 'Amit Patel',
      initials: 'AP',
      description: 'Bulk order - 50kg rice',
      amount: 8500,
      dueDate: '11 Dec 2025',
      daysOverdue: 2,
    },
    {
      id: 3,
      customerId: 1,
      customerName: 'Ramesh Kumar',
      initials: 'RK',
      description: 'Grocery items - rice, dal, oil',
      amount: 450,
      dueDate: '12 Dec 2025',
      daysOverdue: 1,
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Track your customer credits at a glance</p>
      </div>
      
      {/* Summary Cards */}
      <DashboardSummary
        totalOutstanding={17500}
        customersWithDues={4}
        dueToday={0}
        dueThisWeek={2}
      />
      
      {/* Recent Transactions - Needs Attention */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Needs Attention</h3>
            <p className="text-sm text-gray-600">Overdue transactions requiring follow-up</p>
          </div>
          <Link 
            href="/customers" 
            className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center gap-1"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="space-y-3">
          {transactions.map((transaction, index) => (
            <Link 
              key={transaction.id} 
              href={`/customers/${transaction.customerId}`}
              className="block"
            >
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border border-red-200 hover:border-red-300 hover:shadow-md transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${
                    index % 2 === 0 ? 'from-blue-500 to-blue-600' : 'from-orange-500 to-orange-600'
                  } flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0`}>
                    {transaction.initials}
                  </div>
                  
                  {/* Transaction Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {transaction.customerName}
                    </h4>
                    <p className="text-sm text-gray-600 truncate">
                      {transaction.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar className="w-3.5 h-3.5 text-red-600" />
                      <span className="text-xs text-red-600 font-medium">
                        Due: {transaction.dueDate}
                      </span>
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                        {transaction.daysOverdue}d overdue
                      </span>
                    </div>
                  </div>
                  
                  {/* Amount */}
                  <div className="text-right flex-shrink-0">
                    <div className="text-xl font-bold text-red-600">
                      ₹{transaction.amount.toLocaleString('en-IN')}
                    </div>
                    <button className="mt-2 text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      Remind
                    </button>
                  </div>
                  
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
