// components/EmptyState.tsx
import { Users, Plus } from 'lucide-react';

export function EmptyState({ onAddCustomer }: { onAddCustomer: () => void }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Users className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No customers yet</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Start adding customers to track their credit accounts and manage dues efficiently.
      </p>
      <button 
        onClick={onAddCustomer}
        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-sm hover:shadow transition-all"
      >
        <Plus className="w-5 h-5" />
        Add Your First Customer
      </button>
    </div>
  );
}
