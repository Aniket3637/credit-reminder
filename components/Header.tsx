"use client";

import { Menu, Bell, User, LayoutDashboard, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const handleLogout = () => {
    // Add your logout logic here
    alert('Logout functionality - Redirect to login page');
    setShowUserMenu(false);
  };

  const handleProfileSettings = () => {
    alert('Profile Settings - Coming soon!');
    setShowUserMenu(false);
  };

  const handleBusinessSettings = () => {
    alert('Business Settings - Coming soon!');
    setShowUserMenu(false);
  };

  const handleHelpSupport = () => {
    alert('Help & Support - Coming soon!');
    setShowUserMenu(false);
  };
  
  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-2xl font-bold backdrop-blur-sm group-hover:bg-white/30 transition-colors">
              ₹
            </div>
            <h1 className="text-xl font-bold tracking-tight">BahiKhata</h1>
          </Link>
          
          <nav className="hidden md:flex gap-2">
            <Link 
              href="/" 
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                pathname === '/' 
                  ? 'bg-white/20 backdrop-blur-sm' 
                  : 'hover:bg-white/10'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <Link 
              href="/customers" 
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                pathname === '/customers' 
                  ? 'bg-white/20 backdrop-blur-sm' 
                  : 'hover:bg-white/10'
              }`}
            >
              <Users className="w-4 h-4" />
              Customers
            </Link>
          </nav>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {showNotifications && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowNotifications(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="p-4 max-h-96 overflow-y-auto">
                      <div className="space-y-3">
                        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                          <p className="text-sm font-semibold text-gray-900">Payment Overdue</p>
                          <p className="text-xs text-gray-600 mt-1">Ramesh Kumar - ₹2,500 overdue by 2 days</p>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <p className="text-sm font-semibold text-gray-900">Payment Due Soon</p>
                          <p className="text-xs text-gray-600 mt-1">Amit Patel - ₹8,500 due in 2 days</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <User className="w-5 h-5" />
              </button>
              
              {showUserMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <p className="font-semibold text-gray-900">Shop Owner</p>
                      <p className="text-xs text-gray-600">shop@example.com</p>
                    </div>
                    <div className="p-2">
                      <button 
                        onClick={handleProfileSettings}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        Profile Settings
                      </button>
                      <button 
                        onClick={handleBusinessSettings}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        Business Settings
                      </button>
                      <button 
                        onClick={handleHelpSupport}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        Help & Support
                      </button>
                      <hr className="my-2" />
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
