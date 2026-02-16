import React, { useState } from 'react';
import { 
    Search, Filter, MoreHorizontal, User as UserIcon, Shield, AlertCircle, 
    ShoppingCart, Mail, Phone, Calendar, DollarSign, Activity, AlertTriangle, 
    MessageCircle, Users as UsersGroup, Tag, CreditCard, ChevronDown 
} from 'lucide-react';
import { User } from '../types';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Enhanced Mock Data
const MOCK_USERS: User[] = [
  { 
    id: 'U-001', name: 'Sydney Lockhead', email: 'sydney@gmail.com', phone: '+1 555-0101', role: 'User', status: 'Active', joinedDate: '2023-10-12', 
    groupsJoined: 12, groupsCreated: 0, threadsCreated: 5, commentsPosted: 124, 
    eventsParticipated: 3, eventsHosted: 0, servicesBooked: 4, productsPurchased: 8,
    totalOrders: 15, spent: '$450.00', totalRevenueGenerated: '$0.00', averageOrderValue: '$30.00', refundCount: 0, refundAmount: '$0.00',
    riskScore: 'Low', reportsAgainst: 0, cancellationRate: '0%', noShowRate: '0%', disputeCount: 0,
    contributionScore: 85, accountFlags: []
  },
  { 
    id: 'U-002', name: 'Hazel Mannion', email: 'hazel.m@yahoo.com', phone: '+1 555-0102', role: 'Merchant', status: 'Active', joinedDate: '2023-09-01', 
    groupsJoined: 5, groupsCreated: 1, threadsCreated: 20, commentsPosted: 450, 
    eventsParticipated: 1, eventsHosted: 0, servicesBooked: 2, productsPurchased: 12,
    totalOrders: 45, spent: '$1,200.00', totalRevenueGenerated: '$15,400.00', averageOrderValue: '$120.00', refundCount: 2, refundAmount: '$120.00',
    riskScore: 'Low', reportsAgainst: 1, cancellationRate: '2%', noShowRate: '0%', disputeCount: 0,
    contributionScore: 92, accountFlags: []
  },
  { 
    id: 'U-003', name: 'John Doe', email: 'johndoe@test.com', phone: '+1 555-0103', role: 'Provider', status: 'Flagged', joinedDate: '2024-01-15', 
    groupsJoined: 2, groupsCreated: 0, threadsCreated: 1, commentsPosted: 10, 
    eventsParticipated: 0, eventsHosted: 0, servicesBooked: 0, productsPurchased: 1,
    totalOrders: 2, spent: '$100.00', totalRevenueGenerated: '$500.00', averageOrderValue: '$50.00', refundCount: 1, refundAmount: '$50.00',
    riskScore: 'High', reportsAgainst: 5, cancellationRate: '25%', noShowRate: '15%', disputeCount: 2,
    contributionScore: 20, accountFlags: ['Suspicious Login', 'Multiple Disputes']
  },
  { 
    id: 'U-004', name: 'Alice Smith', email: 'alice@wonder.com', phone: '+1 555-0104', role: 'Host', status: 'Suspended', joinedDate: '2023-11-20', 
    groupsJoined: 20, groupsCreated: 5, threadsCreated: 45, commentsPosted: 890, 
    eventsParticipated: 10, eventsHosted: 4, servicesBooked: 5, productsPurchased: 20,
    totalOrders: 10, spent: '$800.00', totalRevenueGenerated: '$4,500.00', averageOrderValue: '$80.00', refundCount: 5, refundAmount: '$400.00',
    riskScore: 'Medium', reportsAgainst: 3, cancellationRate: '15%', noShowRate: '5%', disputeCount: 1,
    contributionScore: 60, accountFlags: ['Policy Violation']
  },
  { 
    id: 'U-005', name: 'Bob Brown', email: 'bobby@brown.com', phone: '+1 555-0105', role: 'User', status: 'Active', joinedDate: '2024-02-10', 
    groupsJoined: 8, groupsCreated: 0, threadsCreated: 2, commentsPosted: 45, 
    eventsParticipated: 2, eventsHosted: 0, servicesBooked: 1, productsPurchased: 4,
    totalOrders: 5, spent: '$250.00', totalRevenueGenerated: '$0.00', averageOrderValue: '$50.00', refundCount: 0, refundAmount: '$0.00',
    riskScore: 'Low', reportsAgainst: 0, cancellationRate: '0%', noShowRate: '0%', disputeCount: 0,
    contributionScore: 45, accountFlags: []
  },
];

const ENGAGEMENT_GRAPH_DATA = [
    { name: 'W1', value: 20 }, { name: 'W2', value: 45 }, { name: 'W3', value: 30 },
    { name: 'W4', value: 60 }, { name: 'W5', value: 55 }, { name: 'W6', value: 80 }
];

export const UsersPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filterOptions = [
      { label: 'All Users', value: 'All' },
      { label: 'High Revenue (> $1k)', value: 'Revenue' },
      { label: 'Top Spenders', value: 'Spenders' },
      { label: 'High Risk', value: 'Risk' },
      { label: 'Most Active', value: 'Active' },
      { label: 'Top Hosts', value: 'Hosts' },
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* List Section */}
      <div className={`flex-1 flex flex-col ${selectedUser ? 'hidden xl:flex xl:w-1/2' : 'w-full'} transition-all duration-300`}>
        {/* Header Filters */}
        <div className="mb-6 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900">User Intelligence</h1>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
                        <Filter size={16} /> Advanced Filters
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-brand-500 text-white rounded-lg text-sm font-medium hover:bg-brand-600">
                        Export CSV
                    </button>
                </div>
            </div>
            
            <div className="flex flex-wrap gap-3 items-center">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search by name, email, ID..." 
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                    />
                </div>
                <div className="flex bg-white rounded-lg border border-slate-200 p-1">
                    {filterOptions.map(opt => (
                        <button
                            key={opt.value}
                            onClick={() => setActiveFilter(opt.value)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                                activeFilter === opt.value ? 'bg-brand-50 text-brand-700 shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                            }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Sortable Table */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex-1 overflow-hidden flex flex-col">
            <div className="overflow-x-auto flex-1 custom-scrollbar">
                <table className="w-full text-left whitespace-nowrap">
                    <thead className="bg-slate-50 border-b border-slate-100 sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50">User Details</th>
                            <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50">Status</th>
                            
                            {/* Financial */}
                            <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right bg-slate-50">Spent</th>
                            <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right bg-slate-50">Generated</th>
                            <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right bg-slate-50">Orders</th>
                            
                            {/* Engagement */}
                            <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-center bg-slate-50">Groups</th>
                            <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-center bg-slate-50">Events</th>
                            
                            {/* Risk */}
                            <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-center bg-slate-50">Risk Score</th>
                            <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-center bg-slate-50">Reports</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {MOCK_USERS.map((user) => (
                            <tr 
                                key={user.id} 
                                onClick={() => setSelectedUser(user)}
                                className={`hover:bg-slate-50 cursor-pointer transition-colors ${selectedUser?.id === user.id ? 'bg-brand-50' : ''}`}
                            >
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-slate-900">{user.name}</div>
                                            <div className="text-xs text-slate-500 flex items-center gap-1">
                                                {user.role} • <span className="font-mono">{user.id}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                                        user.status === 'Active' ? 'bg-green-50 text-green-700 border-green-100' :
                                        user.status === 'Suspended' ? 'bg-red-50 text-red-700 border-red-100' :
                                        'bg-amber-50 text-amber-700 border-amber-100'
                                    }`}>
                                        {user.status}
                                    </span>
                                </td>
                                
                                <td className="px-4 py-3 text-sm text-slate-900 font-medium text-right">{user.spent}</td>
                                <td className="px-4 py-3 text-sm text-green-600 font-medium text-right">{user.totalRevenueGenerated}</td>
                                <td className="px-4 py-3 text-sm text-slate-600 text-right">{user.totalOrders}</td>
                                
                                <td className="px-4 py-3 text-sm text-slate-600 text-center">{user.groupsJoined}</td>
                                <td className="px-4 py-3 text-sm text-slate-600 text-center">{user.eventsParticipated}</td>
                                
                                <td className="px-4 py-3 text-center">
                                     <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded ${
                                        user.riskScore === 'High' ? 'bg-red-100 text-red-700' : 
                                        user.riskScore === 'Medium' ? 'bg-orange-100 text-orange-700' : 
                                        'bg-slate-100 text-slate-500'
                                     }`}>
                                        {user.riskScore}
                                     </span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    {user.reportsAgainst > 0 ? (
                                        <span className="text-xs font-bold text-red-600 flex items-center justify-center gap-1">
                                            <AlertTriangle size={12} /> {user.reportsAgainst}
                                        </span>
                                    ) : (
                                        <span className="text-slate-300">-</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center text-sm text-slate-500">
                <span>Showing 1-5 of 124 users</span>
                <div className="flex gap-2">
                    <button className="px-3 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50 disabled:opacity-50">Prev</button>
                    <button className="px-3 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50">Next</button>
                </div>
            </div>
        </div>
      </div>

      {/* 👤 User Detail Page (Full Activity Intelligence) */}
      {selectedUser && (
        <div className="w-full xl:w-1/2 bg-white border border-slate-200 rounded-2xl shadow-xl flex flex-col animate-fade-in-right overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-start">
                <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center text-2xl font-bold text-white shadow-md">
                        {selectedUser.name.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">{selectedUser.name}</h2>
                        <div className="flex flex-col text-xs text-slate-500 mt-1 gap-1">
                             <span className="flex items-center gap-1"><Mail size={12} /> {selectedUser.email}</span>
                             <span className="flex items-center gap-1"><Phone size={12} /> {selectedUser.phone}</span>
                             <span className="flex items-center gap-1"><Calendar size={12} /> Joined: {selectedUser.joinedDate}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <button onClick={() => setSelectedUser(null)} className="text-slate-400 hover:text-slate-600 mb-1">
                        <ChevronDown className="rotate-90" size={24}/>
                    </button>
                    <div className="flex gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-bold border ${
                            selectedUser.status === 'Active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'
                        }`}>{selectedUser.status}</span>
                         <span className="px-2 py-1 rounded text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200">
                            Score: {selectedUser.contributionScore}
                        </span>
                    </div>
                </div>
            </div>
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 custom-scrollbar">
                
                {/* 1. Account Flags & Actions */}
                {selectedUser.accountFlags.length > 0 && (
                     <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
                        <AlertCircle className="text-red-600 shrink-0" size={20} />
                        <div>
                            <h4 className="text-sm font-bold text-red-800">Account Flags Detected</h4>
                            <div className="flex gap-2 mt-2 flex-wrap">
                                {selectedUser.accountFlags.map(flag => (
                                    <span key={flag} className="px-2 py-1 bg-white border border-red-200 text-red-700 text-xs rounded-md font-medium">
                                        {flag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                
                <div className="flex gap-3">
                    <button className="flex-1 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 shadow-sm">
                        View Audit Log
                    </button>
                    <button className="flex-1 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">
                        Send Message
                    </button>
                    <button className="flex-1 py-2 bg-white border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 flex items-center justify-center gap-2">
                        <Shield size={14} /> Suspend
                    </button>
                </div>

                {/* 2. Financial Summary */}
                <section>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                        <DollarSign size={16} className="text-slate-400"/> Financial Intelligence
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-xs text-slate-500">Total Spent</p>
                            <p className="text-lg font-bold text-slate-900">{selectedUser.spent}</p>
                        </div>
                         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-xs text-slate-500">Revenue Generated</p>
                            <p className="text-lg font-bold text-green-600">{selectedUser.totalRevenueGenerated}</p>
                        </div>
                         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-xs text-slate-500">Avg Order Value</p>
                            <p className="text-lg font-bold text-slate-900">{selectedUser.averageOrderValue}</p>
                        </div>
                         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-xs text-slate-500">Total Orders</p>
                            <p className="text-lg font-bold text-slate-900">{selectedUser.totalOrders}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-xs text-slate-500">Refunds</p>
                            <p className="text-lg font-bold text-red-600">{selectedUser.refundCount} <span className="text-xs text-slate-400 font-normal">({selectedUser.refundAmount})</span></p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-xs text-slate-500">Cancellation Rate</p>
                            <p className="text-lg font-bold text-slate-900">{selectedUser.cancellationRate}</p>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* 3. Community Activity */}
                    <section>
                         <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                            <UsersGroup size={16} className="text-slate-400"/> Community Stats
                        </h3>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm h-full">
                            <div className="grid grid-cols-2 gap-y-4 mb-4">
                                <div>
                                    <p className="text-xs text-slate-500">Groups Joined</p>
                                    <p className="font-semibold text-slate-900">{selectedUser.groupsJoined}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Threads Created</p>
                                    <p className="font-semibold text-slate-900">{selectedUser.threadsCreated}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Comments</p>
                                    <p className="font-semibold text-slate-900">{selectedUser.commentsPosted}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Groups Created</p>
                                    <p className="font-semibold text-slate-900">{selectedUser.groupsCreated}</p>
                                </div>
                            </div>
                            <div className="h-32 mt-auto">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={ENGAGEMENT_GRAPH_DATA}>
                                        <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                                        <Tooltip cursor={{fill: 'transparent'}} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </section>

                    {/* 7. Reports & Violations */}
                    <section>
                         <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                            <Shield size={16} className="text-slate-400"/> Reports & Risk
                        </h3>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm h-full space-y-4">
                            <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                                <span className="text-sm text-slate-600">Reports Against</span>
                                <span className={`font-bold ${selectedUser.reportsAgainst > 0 ? 'text-red-600' : 'text-slate-900'}`}>{selectedUser.reportsAgainst}</span>
                            </div>
                             <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                                <span className="text-sm text-slate-600">Disputes</span>
                                <span className="font-bold text-slate-900">{selectedUser.disputeCount}</span>
                            </div>
                             <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                                <span className="text-sm text-slate-600">No-show Rate</span>
                                <span className="font-bold text-slate-900">{selectedUser.noShowRate}</span>
                            </div>
                            <div className="pt-2">
                                <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Recent Flags</p>
                                <div className="space-y-2">
                                    {selectedUser.accountFlags.length > 0 ? selectedUser.accountFlags.map(flag => (
                                        <div key={flag} className="flex items-center gap-2 text-xs text-red-700 bg-red-50 p-2 rounded">
                                            <AlertTriangle size={12} /> {flag}
                                        </div>
                                    )) : (
                                        <p className="text-xs text-slate-400 italic">No recent violations.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* 4. Events, 5. Services, 6. Marketplace */}
                <section>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                        <Activity size={16} className="text-slate-400"/> Ecosystem Activity
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <h4 className="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-1"><Calendar size={12}/> Events</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex justify-between"><span className="text-slate-600">Participated</span> <b>{selectedUser.eventsParticipated}</b></li>
                                <li className="flex justify-between"><span className="text-slate-600">Hosted</span> <b>{selectedUser.eventsHosted}</b></li>
                            </ul>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <h4 className="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-1"><Tag size={12}/> Services</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex justify-between"><span className="text-slate-600">Booked</span> <b>{selectedUser.servicesBooked}</b></li>
                                <li className="flex justify-between"><span className="text-slate-600">Complaints</span> <b>0</b></li>
                            </ul>
                        </div>
                         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <h4 className="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-1"><ShoppingCart size={12}/> Marketplace</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex justify-between"><span className="text-slate-600">Purchased</span> <b>{selectedUser.productsPurchased}</b></li>
                                <li className="flex justify-between"><span className="text-slate-600">Sold</span> <b>0</b></li>
                            </ul>
                        </div>
                    </div>
                </section>

            </div>
        </div>
      )}
    </div>
  );
};