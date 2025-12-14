// components/DashboardSummary.tsx
import { TrendingUp, Users, Calendar, AlertCircle } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'red' | 'blue' | 'green' | 'orange';
}

function SummaryCard({ title, value, icon, color }: SummaryCardProps) {
  const colorClasses = {
    red: 'bg-red-50 text-red-600',
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
  };
  
  const textColors = {
    red: 'text-red-600',
    blue: 'text-blue-600',
    green: 'text-green-600',
    orange: 'text-orange-600',
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-2 font-medium">{title}</p>
          <p className={`text-3xl font-bold ${textColors[color]}`}>{value}</p>
        </div>
        <div className={`p-4 rounded-xl ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

interface DashboardSummaryProps {
  totalOutstanding: number;
  customersWithDues: number;
  dueToday: number;
  dueThisWeek: number;
}

export function DashboardSummary({ 
  totalOutstanding, 
  customersWithDues, 
  dueToday, 
  dueThisWeek 
}: DashboardSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <SummaryCard
        title="Total Outstanding"
        value={`₹${totalOutstanding.toLocaleString('en-IN')}`}
        icon={<TrendingUp className="w-6 h-6" />}
        color="red"
      />
      <SummaryCard
        title="Customers with Dues"
        value={customersWithDues}
        icon={<Users className="w-6 h-6" />}
        color="blue"
      />
      <SummaryCard
        title="Due Today"
        value={dueToday}
        icon={<Calendar className="w-6 h-6" />}
        color="orange"
      />
      <SummaryCard
        title="Due This Week"
        value={dueThisWeek}
        icon={<AlertCircle className="w-6 h-6" />}
        color="orange"
      />
    </div>
  );
}
