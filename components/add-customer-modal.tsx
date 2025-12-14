"use client";

import { useState } from 'react';
import { X, UserPlus, Mail } from 'lucide-react'; // ← Added Mail icon

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddCustomerModal({ isOpen, onClose }: AddCustomerModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',  // ← Added email field
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Customer data:', formData);
    setFormData({ name: '', phone: '', email: '', notes: '' }); // ← Updated reset
    onClose();
  };

  const handleCancel = () => {
    setFormData({ name: '', phone: '', email: '', notes: '' }); // ← Updated reset
    onClose();
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={handleCancel}
      />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Add New Customer</h2>
            </div>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            {/* Customer Name */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Customer Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter customer name"
                className="w-full px-4 py-3 border-2 border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
            
            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="10-digit mobile number"
                pattern="[0-9]{10}"
                maxLength={10}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.phone.length}/10 digits
              </p>
            </div>
            
            {/* ✨ NEW EMAIL FIELD - Add this section ✨ */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-600" />
                Email <span className="text-gray-400 font-normal text-xs">(Optional)</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="customer@example.com"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <span>📧</span>
                <span>For sending payment reminder emails</span>
              </p>
            </div>
            
            {/* Notes */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any notes about this customer..."
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-sm"
              >
                Add Customer
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
