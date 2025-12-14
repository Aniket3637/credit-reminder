// components/CustomerCard.tsx
import { Phone, ChevronRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface CustomerCardProps {
  id: number;
  name: string;
  phone: string;
  amount: number;
  status: 'due' | 'paid';
}

export function CustomerCard({ id, name, phone, amount, status }: CustomerCardProps) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
  
  const gradients = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-green-500 to-green-600',
    'from-orange-500 to-orange-600',
    'from-pink-500 to-pink-600',
  ];
  
  const gradient = gradients[id % gradients.length];
  
  return (
    <Link href={`/customers/${id}`}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-3 hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer group">
        <div className="flex items-center gap-4">
          {/* Avatar with gradient */}
          <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0`}>
            {initials}
          </div>
          
          {/* Customer Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-lg mb-1 truncate">
              {name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>{phone}</span>
            </div>
          </div>
          
          {/* Amount and Status */}
          <div className="text-right flex-shrink-0">
            <div className={`text-xl font-bold ${
              status === 'due' ? 'text-red-600' : 'text-green-600'
            }`}>
              ₹{amount.toLocaleString('en-IN')}
            </div>
            <span className={`inline-block text-xs px-3 py-1 rounded-full mt-1 font-medium ${
              status === 'due' 
                ? 'bg-red-50 text-red-700 border border-red-200' 
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {status === 'due' ? 'Due' : 'Paid'}
            </span>
          </div>
          
          {/* Arrow Icon */}
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" />
        </div>
      </div>
    </Link>
  );
}
