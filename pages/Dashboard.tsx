import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Legend, LineChart, Line 
} from 'recharts';
import { 
  Users, DollarSign, ShoppingBag, AlertTriangle, Activity, 
  Briefcase, Calendar, MessageSquare, TrendingUp, RefreshCcw, FileText,
  UserCheck, Store, ShieldAlert, Layers
} from 'lucide-react';
import { StatCard } from '../components/StatCard';

// Mock Data for Graphs
const REVENUE_DATA = [
  { name: 'Mon', services: 4000, marketplace: 2400, events: 1200 },
  { name: 'Tue', services: 3000, marketplace: 1398, events: 2210 },
  { name: 'Wed', services: 2000, marketplace: 5800, events: 2290 },
  { name: 'Thu', services: 2780, marketplace: 3908, events: 2000 },
  { name: 'Fri', services: 1890, marketplace: 4800, events: 2181 },
  { name: 'Sat', services: 2390, marketplace: 3800, events: 2500 },
  { name: 'Sun', services: 3490, marketplace: 4300, events: 2100 },
];

const USER_GROWTH_DATA = [
  { name: 'Jan', users: 1000 }, { name: 'Feb', users: 1500 }, 
  { name: 'Mar', users: 2200 }, { name: 'Apr', users: 3800 }, 
  { name: 'May', users: 4500 }, { name: 'Jun', users: 6000 }
];

const ORDER_TREND_DATA = [
  { name: 'Jan', orders: 120 }, { name: 'Feb', orders: 150 },
  { name: 'Mar', orders: 200 }, { name: 'Apr', orders: 180 },
  { name: 'May', orders: 250 }, { name: 'Jun', orders: 300 }
];

const BOOKING_TREND_DATA = [
  { name: 'W1', events: 40, services: 60 },
  { name: 'W2', events: 30, services: 75 },
  { name: 'W3', events: 50, services: 80 },
  { name: 'W4', events: 70, services: 65 },
];

const GMV_TREND_DATA = [
  { name: 'Jan', gmv: 50000 }, { name: 'Feb', gmv: 65000 },
  { name: 'Mar', gmv: 55000 }, { name: 'Apr', gmv: 80000 },
  { name: 'May', gmv: 95000 }, { name: 'Jun', gmv: 120000 }
];

export const Dashboard: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('Today');

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      {/* Header & Time Filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Executive Overview</h1>
          <p className="text-slate-500 text-sm">Real-time platform performance monitoring.</p>
        </div>
        <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
            {['Today', 'Week', 'Month', 'Quarter', 'Year'].map((t) => (
                <button 
                  key={t} 
                  onClick={() => setTimeFilter(t)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    timeFilter === t ? 'bg-brand-50 text-brand-700 shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                    {t}
                </button>
            ))}
        </div>
      </div>

      {/* 🔹 Global Metrics Grid */}
      <div>
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Key Performance Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Revenue" value="$128,430" change="12.5%" isPositive={true} icon={<DollarSign size={20} />} />
          <StatCard title="Total Orders" value="1,245" change="0.8%" isPositive={true} icon={<ShoppingBag size={20} />} />
          <StatCard title="Total Users" value="45.2k" change="3.2%" isPositive={true} icon={<Users size={20} />} />
          <StatCard title="Active Users (DAU)" value="12.5k" change="5.1%" isPositive={true} icon={<Activity size={20} />} />
          
          <StatCard title="Total Providers" value="850" change="2%" isPositive={true} icon={<UserCheck size={20} />} />
          <StatCard title="Total Merchants" value="340" change="4%" isPositive={true} icon={<Store size={20} />} />
          <StatCard title="Total Groups" value="124" change="1" isPositive={true} icon={<Layers size={20} />} />
          <StatCard title="Total Threads" value="15.4k" change="12%" isPositive={true} icon={<MessageSquare size={20} />} />

          <StatCard title="Total Events" value="142" change="8" isPositive={true} icon={<Calendar size={20} />} />
          <StatCard title="Total Refunds" value="$1,240" change="15%" isPositive={false} icon={<RefreshCcw size={20} />} />
          <StatCard title="Open Reports" value="18" change="5 new" isPositive={false} icon={<FileText size={20} />} />
          <StatCard title="Avg Order Value" value="$85.00" change="1.2%" isPositive={true} icon={<TrendingUp size={20} />} />
        </div>
      </div>

      {/* 📊 Revenue Breakdown & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Breakdown */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
           <h3 className="text-lg font-bold text-slate-900 mb-6">Revenue Breakdown</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-4 bg-brand-50 rounded-xl border border-brand-100">
                  <p className="text-xs text-brand-600 font-bold uppercase mb-1">Services</p>
                  <p className="text-2xl font-bold text-slate-900">$54,200</p>
                  <p className="text-xs text-slate-500 mt-1">42% of total</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <p className="text-xs text-purple-600 font-bold uppercase mb-1">Marketplace</p>
                  <p className="text-2xl font-bold text-slate-900">$45,100</p>
                  <p className="text-xs text-slate-500 mt-1">35% of total</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <p className="text-xs text-orange-600 font-bold uppercase mb-1">Events</p>
                  <p className="text-2xl font-bold text-slate-900">$29,130</p>
                  <p className="text-xs text-slate-500 mt-1">23% of total</p>
              </div>
           </div>
           
           <div className="h-64">
              <p className="text-sm font-semibold text-slate-700 mb-4">Revenue Trend (Last 7 Days)</p>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={REVENUE_DATA}>
                  <defs>
                    <linearGradient id="colorServices" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorMarket" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend />
                  <Area type="monotone" dataKey="services" name="Services" stroke="#14b8a6" fill="url(#colorServices)" strokeWidth={2} />
                  <Area type="monotone" dataKey="marketplace" name="Marketplace" stroke="#8b5cf6" fill="url(#colorMarket)" strokeWidth={2} />
                  <Area type="monotone" dataKey="events" name="Events" stroke="#f59e0b" fill="transparent" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* 🚨 Alerts System */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <ShieldAlert className="text-red-500" /> System Alerts
            </h3>
            <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                <div className="p-4 bg-red-50 rounded-xl border border-red-100 animate-pulse">
                    <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">CRITICAL</span>
                        <span className="text-xs text-red-400">Now</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800">Suspicious User Activity</p>
                    <p className="text-xs text-slate-600 mt-1">Multiple high-value failed transactions detected from IP block 192.168.x.x.</p>
                </div>

                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                    <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">WARNING</span>
                        <span className="text-xs text-amber-400">2h ago</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800">High Cancellation Rate</p>
                    <p className="text-xs text-slate-600 mt-1">Provider "Urban Cleaners" has >20% cancellation rate today.</p>
                </div>

                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                    <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">WARNING</span>
                        <span className="text-xs text-amber-400">4h ago</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800">Refund Spike</p>
                    <p className="text-xs text-slate-600 mt-1">Abnormal refund volume in "Electronics" category.</p>
                </div>

                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">NOTICE</span>
                        <span className="text-xs text-blue-400">1d ago</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800">Merchant Dispute</p>
                    <p className="text-xs text-slate-600 mt-1">New dispute raised against "TechHaven Ltd".</p>
                </div>
            </div>
        </div>
      </div>

      {/* 📈 Detailed Graphs Grid */}
      <div>
         <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Growth & Analytics</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* User Growth Trend */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="font-semibold text-slate-900 mb-4">User Growth Trend</h4>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={USER_GROWTH_DATA}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                            <Tooltip />
                            <Line type="monotone" dataKey="users" stroke="#14b8a6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Order Trend */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="font-semibold text-slate-900 mb-4">Total Order Trend</h4>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={ORDER_TREND_DATA}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                            <Tooltip cursor={{fill: 'transparent'}} />
                            <Bar dataKey="orders" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Event & Service Bookings */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="font-semibold text-slate-900 mb-4">Bookings (Events vs Services)</h4>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={BOOKING_TREND_DATA}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                            <Tooltip cursor={{fill: 'transparent'}} />
                            <Legend />
                            <Bar dataKey="events" name="Event Bookings" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="services" name="Service Bookings" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Marketplace GMV */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="font-semibold text-slate-900 mb-4">Marketplace GMV Trend</h4>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={GMV_TREND_DATA}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                            <Tooltip />
                            <Area type="monotone" dataKey="gmv" stroke="#8b5cf6" fill="#f3e8ff" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

         </div>
      </div>
    </div>
  );
};