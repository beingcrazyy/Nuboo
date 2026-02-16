import React, { useState } from 'react';
import { Calendar, MapPin, Users, Ticket, TrendingUp, Music, Mic, X, DollarSign, BarChart3, AlertTriangle, FileText, CheckCircle } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { Event, EventPass } from '../types';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, Tooltip, BarChart, Bar, Legend } from 'recharts';

interface EventsPageProps {
    view: 'events' | 'passes';
}

const MOCK_EVENTS: Event[] = [
    { 
        id: 'E-01', title: 'Summer Music Festival', host: 'Global Beats', date: '2023-11-15', ticketsSold: 4500, revenue: '$225,000', status: 'Published', category: 'Music', capacity: 5000,
        location: 'Central Park Arena, NY', totalPassTypes: 3, reportsCount: 2, attendanceRate: '92%', platformCommission: '$22,500', refundAmount: '$1,200', complaints: 5, cancellationRate: '0.8%'
    },
    { 
        id: 'E-02', title: 'Tech Startups Meetup', host: 'Innovation Hub', date: '2023-11-20', ticketsSold: 120, revenue: '$6,000', status: 'Pending Approval', category: 'Business', capacity: 200,
        location: 'Convention Center, Hall B', totalPassTypes: 1, reportsCount: 0, attendanceRate: '85%', platformCommission: '$600', refundAmount: '$0', complaints: 0, cancellationRate: '2.5%'
    },
    { 
        id: 'E-03', title: 'Yoga & Wellness Retreat', host: 'Zen Life', date: '2023-12-05', ticketsSold: 45, revenue: '$13,500', status: 'Draft', category: 'Health', capacity: 50,
        location: 'Tranquil Gardens', totalPassTypes: 2, reportsCount: 0, attendanceRate: 'N/A', platformCommission: '$1,350', refundAmount: '$0', complaints: 0, cancellationRate: '0%'
    },
];

const MOCK_PASSES: EventPass[] = [
    { id: 'PASS-101', eventId: 'E-01', eventName: 'Summer Music Festival', type: 'VIP', price: '$150.00', totalAllocated: 500, sold: 450, status: 'Available' },
    { id: 'PASS-102', eventId: 'E-01', eventName: 'Summer Music Festival', type: 'General', price: '$40.00', totalAllocated: 4500, sold: 4050, status: 'Available' },
    { id: 'PASS-201', eventId: 'E-02', eventName: 'Tech Startups Meetup', type: 'Early Bird', price: '$40.00', totalAllocated: 50, sold: 50, status: 'Sold Out' },
];

const BOOKING_TREND_DATA = [
    { name: 'Week 1', bookings: 120 },
    { name: 'Week 2', bookings: 300 },
    { name: 'Week 3', bookings: 250 },
    { name: 'Week 4', bookings: 450 },
    { name: 'Week 5', bookings: 600 },
];

export const EventsPage: React.FC<EventsPageProps> = ({ view }) => {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    
    // Reset selection when view changes
    React.useEffect(() => {
        setSelectedEvent(null);
    }, [view]);

    const renderEventDetail = () => {
        if (!selectedEvent) return null;
        
        const eventPasses = MOCK_PASSES.filter(p => p.eventId === selectedEvent.id);

        return (
            <div className="w-full xl:w-1/2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col animate-fade-in-right">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-100 text-orange-700 rounded-lg flex items-center justify-center text-xl font-bold">
                            <Calendar size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">{selectedEvent.title}</h2>
                            <p className="text-sm text-slate-500">ID: {selectedEvent.id} • Host: {selectedEvent.host}</p>
                        </div>
                    </div>
                    <button onClick={() => setSelectedEvent(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <X size={24} className="text-slate-500" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50 custom-scrollbar">
                        {/* Overview Section */}
                    <section>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                            <FileText size={18} className="text-orange-600"/> Event Overview
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500">Date</p>
                                <p className="text-sm font-bold text-slate-900 mt-1">{selectedEvent.date}</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500">Location</p>
                                <p className="text-sm font-bold text-slate-900 mt-1 truncate" title={selectedEvent.location}>{selectedEvent.location}</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500">Category</p>
                                <p className="text-sm font-bold text-slate-900 mt-1">{selectedEvent.category}</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500">Status</p>
                                <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-bold ${
                                    selectedEvent.status === 'Published' ? 'bg-green-100 text-green-700' :
                                    selectedEvent.status === 'Pending Approval' ? 'bg-amber-100 text-amber-700' :
                                    'bg-slate-100 text-slate-700'
                                }`}>
                                    {selectedEvent.status}
                                </span>
                            </div>
                        </div>
                    </section>

                        {/* Booking Analytics */}
                        <section>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                            <BarChart3 size={18} className="text-orange-600"/> Booking Analytics
                        </h3>
                        <div className="space-y-6 mb-6">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                    <p className="text-xs text-slate-500">Total Bookings</p>
                                    <p className="text-xl font-bold text-slate-900">{selectedEvent.ticketsSold} <span className="text-xs font-normal text-slate-400">/ {selectedEvent.capacity}</span></p>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                    <p className="text-xs text-slate-500">Total Revenue</p>
                                    <p className="text-xl font-bold text-slate-900">{selectedEvent.revenue}</p>
                                </div>
                                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                    <p className="text-xs text-slate-500">Attendance Rate</p>
                                    <p className="text-xl font-bold text-slate-900">{selectedEvent.attendanceRate}</p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-64">
                                <h4 className="text-sm font-semibold text-slate-900 mb-4">Booking Trend</h4>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={BOOKING_TREND_DATA}>
                                        <defs>
                                            <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#f97316" stopOpacity={0.2}/>
                                                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="bookings" stroke="#f97316" fillOpacity={1} fill="url(#colorBookings)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        
                        {/* Pass-wise Breakdown */}
                        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                                <h4 className="text-sm font-semibold text-slate-700">Pass-wise Breakdown</h4>
                            </div>
                            <table className="w-full text-left">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-3">Type</th>
                                        <th className="px-6 py-3 text-right">Price</th>
                                        <th className="px-6 py-3 text-center">Sold</th>
                                        <th className="px-6 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {eventPasses.length > 0 ? eventPasses.map(pass => (
                                        <tr key={pass.id}>
                                            <td className="px-6 py-3 text-sm font-medium text-slate-900">{pass.type}</td>
                                            <td className="px-6 py-3 text-sm text-right text-slate-600">{pass.price}</td>
                                            <td className="px-6 py-3 text-sm text-center font-bold text-slate-900">{pass.sold}</td>
                                            <td className="px-6 py-3">
                                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${pass.status === 'Available' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{pass.status}</span>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan={5} className="px-6 py-4 text-center text-sm text-slate-500">No pass data available.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Financial */}
                        <section>
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                                <DollarSign size={18} className="text-orange-600"/> Financials
                            </h3>
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                                <div className="flex justify-between border-b border-slate-50 pb-2">
                                    <span className="text-sm text-slate-500">Gross Revenue</span>
                                    <span className="font-medium text-slate-900">{selectedEvent.revenue}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-50 pb-2">
                                    <span className="text-sm text-slate-500">Platform Commission</span>
                                    <span className="font-medium text-slate-900">{selectedEvent.platformCommission}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-slate-500">Refund Amount</span>
                                    <span className="font-medium text-red-600">{selectedEvent.refundAmount}</span>
                                </div>
                            </div>
                        </section>

                            {/* Risk & Reports */}
                            <section>
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                                <AlertTriangle size={18} className="text-orange-600"/> Risk & Reports
                            </h3>
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                                    <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500">Reports</span>
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${selectedEvent.reportsCount > 0 ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
                                        {selectedEvent.reportsCount}
                                    </span>
                                </div>
                                    <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500">Complaints</span>
                                    <span className="px-2 py-1 bg-orange-50 text-orange-700 rounded text-xs font-bold">{selectedEvent.complaints}</span>
                                </div>
                                    <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500">Cancellation %</span>
                                    <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-bold">{selectedEvent.cancellationRate}</span>
                                </div>
                            </div>
                        </section>
                    </div>

                </div>
            </div>
        );
    }

    const renderContent = () => {
        if (view === 'events') {
             return (
                 <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex-1 flex flex-col">
                    <div className="flex-1 overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left whitespace-nowrap">
                            <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase sticky top-0 z-10">
                                <tr>
                                    <th className="px-6 py-4">Event Title</th>
                                    <th className="px-6 py-4">Host</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 text-center">Pass Types</th>
                                    <th className="px-6 py-4 text-center">Passes Sold</th>
                                    <th className="px-6 py-4 text-right">Revenue</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-center">Reports</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {MOCK_EVENTS.map((evt) => (
                                    <tr 
                                        key={evt.id} 
                                        onClick={() => setSelectedEvent(evt)} 
                                        className={`hover:bg-slate-50 cursor-pointer transition-colors ${selectedEvent?.id === evt.id ? 'bg-orange-50' : ''}`}
                                    >
                                        <td className="px-6 py-4 font-medium text-slate-900">{evt.title}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600">{evt.host}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                             <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-xs font-medium text-slate-700">
                                                {evt.category}
                                             </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">{evt.date}</td>
                                        <td className="px-6 py-4 text-center text-sm text-slate-600">{evt.totalPassTypes}</td>
                                        <td className="px-6 py-4 text-center text-sm font-bold text-slate-700">{evt.ticketsSold}</td>
                                        <td className="px-6 py-4 text-right text-sm font-medium text-green-600">{evt.revenue}</td>
                                        <td className="px-6 py-4">
                                             <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                evt.status === 'Published' ? 'bg-green-100 text-green-700' : 
                                                evt.status === 'Pending Approval' ? 'bg-amber-100 text-amber-700' :
                                                evt.status === 'Draft' ? 'bg-slate-100 text-slate-600' : 'bg-red-100 text-red-700'
                                            }`}>{evt.status}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                             {evt.reportsCount > 0 ? (
                                                 <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">{evt.reportsCount}</span>
                                             ) : (
                                                 <span className="text-slate-300">-</span>
                                             )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
             );
        } else {
             return (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex-1 flex flex-col">
                    <div className="flex-1 overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left whitespace-nowrap">
                            <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase sticky top-0 z-10">
                                <tr>
                                    <th className="px-6 py-4">Pass Type</th>
                                    <th className="px-6 py-4">Event</th>
                                    <th className="px-6 py-4 text-right">Price</th>
                                    <th className="px-6 py-4 text-center">Sold / Allocated</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {MOCK_PASSES.map((pass) => (
                                    <tr key={pass.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-900">{pass.type}</div>
                                            <div className="text-xs text-slate-500">{pass.id}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">{pass.eventName}</td>
                                        <td className="px-6 py-4 text-right font-medium text-slate-900">{pass.price}</td>
                                        <td className="px-6 py-4 text-center text-sm text-slate-600">
                                            {pass.sold} / {pass.totalAllocated}
                                        </td>
                                        <td className="px-6 py-4">
                                             <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                pass.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>{pass.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
             );
        }
    }

    return (
        <div className="h-[calc(100vh-8rem)] flex gap-6">
            <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${selectedEvent ? 'hidden xl:flex xl:w-1/2' : 'w-full'}`}>
                 <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-slate-900 capitalize">Events {view}</h1>
                        <button className="px-4 py-2 bg-brand-500 text-white rounded-lg text-sm font-medium hover:bg-brand-600 shadow-sm shadow-brand-200">
                            Create Event
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                        <StatCard title="Live Events" value="142" change="8" isPositive={true} icon={<Calendar size={20} />} />
                        <StatCard title="Tickets Sold (24h)" value="1,204" change="15%" isPositive={true} icon={<Ticket size={20} />} />
                        <StatCard title="Event Revenue" value="$45.2k" change="2.1%" isPositive={true} icon={<TrendingUp size={20} />} />
                        <StatCard title="Total Passes" value="8,500" change="10%" isPositive={true} icon={<Users size={20} />} />
                    </div>

                    {renderContent()}
                 </div>
            </div>

            {renderEventDetail()}
        </div>
    );
};