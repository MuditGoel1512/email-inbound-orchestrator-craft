
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  timestamp: string;
  category: 'support' | 'sales' | 'marketing' | 'other';
  read: boolean;
  attachments?: string[];
}

interface EmailDashboardProps {
  emails: Email[];
}

export const EmailDashboard: React.FC<EmailDashboardProps> = ({ emails }) => {
  // Prepare data for charts
  const categoryData = [
    { name: 'Support', value: emails.filter(e => e.category === 'support').length, color: '#3B82F6' },
    { name: 'Sales', value: emails.filter(e => e.category === 'sales').length, color: '#8B5CF6' },
    { name: 'Marketing', value: emails.filter(e => e.category === 'marketing').length, color: '#10B981' },
    { name: 'Other', value: emails.filter(e => e.category === 'other').length, color: '#F59E0B' }
  ];

  // Email activity by hour (simulated)
  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    emails: Math.floor(Math.random() * 10) + 1
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      {/* Category Distribution */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Email Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {categoryData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-gray-600">{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Email Activity */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">24-Hour Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="hour" 
                  stroke="#6B7280"
                  fontSize={12}
                  tickFormatter={(value) => `${value}:00`}
                />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip 
                  labelFormatter={(value) => `${value}:00`}
                  formatter={(value) => [value, 'Emails']}
                />
                <Bar 
                  dataKey="emails" 
                  fill="url(#colorGradient)" 
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
