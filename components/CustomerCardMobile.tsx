// components/CustomerCardMobile.tsx (Alternative for smaller screens)
import { Phone, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function CustomerCardMobile({ id, name, phone, amount, status }: any) {
  const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
  
  return (
    <Link href={`/customers/${id}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-2 active:bg-gray-50 transition-colors">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
            {initials}
          </div>
          
          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm truncate">{name}</h3>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Phone className="w-3 h-3" />
              <span>{phone}</span>
            </div>
          </div>
          
          {/* Amount */}
          <div className="text-right">
            <div className={`text-base font-bold ${
              status === 'due' ? 'text-red-600' : 'text-green-600'
            }`}>
              ₹{amount.toLocaleString('en-IN')}
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              status === 'due' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
            }`}>
              {status === 'due' ? 'Due' : 'Paid'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
