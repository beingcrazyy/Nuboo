import React, { useState } from 'react';
import { Briefcase, Star, Clock, UserCheck, Layers, X, DollarSign, BarChart3, AlertTriangle, CheckCircle, Activity, MapPin } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { Service, Provider, ServiceCategory, ServiceBooking } from '../types';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, Tooltip, AreaChart, Area } from 'recharts';

interface ServicesPageProps {
    view: 'categories' | 'services' | 'providers' | 'bookings';
}

const MOCK_CATEGORIES: ServiceCategory[] = [
    { id: 'SC-01', name: 'Home Cleaning', activeServices: 150, providersCount: 45, status: 'Active' },
    { id: 'SC-02', name: 'Medical Consultation', activeServices: 80, providersCount: 20, status: 'Active' },
    { id: 'SC-03', name: 'Education & Tutoring', activeServices: 200, providersCount: 110, status: 'Active' },
];

const MOCK_PROVIDERS: Provider[] = [
    { 
        id: 'P-01', name: 'Dr. Emily Stone', servicesCount: 4, activeServices: 3, servicesOffered: ['General Consultation', 'Pediatric Checkup'], rating: 4.9, totalRevenue: '$12,400', status: 'Verified', verificationDate: '2023-05-12',
        totalBookings: 89, complaintCount: 0, cancellationRate: '1.2%', mostBookedService: 'General Consultation', avgBookingValue: '$140', noShowRate: '0.5%'
    },
    { 
        id: 'P-02', name: 'Urban Cleaners', servicesCount: 12, activeServices: 10, servicesOffered: ['Deep Cleaning', 'Move-out Cleaning', 'Carpet Cleaning'], rating: 4.5, totalRevenue: '$45,200', status: 'Verified', verificationDate: '2023-02-10',
        totalBookings: 340, complaintCount: 5, cancellationRate: '3.5%', mostBookedService: 'Deep Cleaning', avgBookingValue: '$130', noShowRate: '2.0%'
    },
];

const MOCK_SERVICES: Service[] = [
    { 
        id: 'S-01', name: 'Deep House Cleaning', provider: 'Urban Cleaners', category: 'Home Cleaning', mode: 'Home', price: '$80.00', duration: '3h', totalBookings: 142, revenue: '$11,360', rating: 4.6, status: 'Active',
        cancellationRate: '2.1%', complaints: 1, completedBookings: 135, cancelledBookings: 3, noShowBookings: 4, refunds: '$240', platformCommission: '$1,136'
    },
    { 
        id: 'S-02', name: 'General Consultation', provider: 'Dr. Emily Stone', category: 'Medical', mode: 'Online', price: '$150.00', duration: '45m', totalBookings: 89, revenue: '$13,350', rating: 4.9, status: 'Active',
        cancellationRate: '0.5%', complaints: 0, completedBookings: 88, cancelledBookings: 1, noShowBookings: 0, refunds: '$0', platformCommission: '$1,335'
    },
];

const MOCK_BOOKINGS: ServiceBooking[] = [
    { id: 'B-901', serviceName: 'Deep House Cleaning', customer: 'Alice Johnson', provider: 'Urban Cleaners', date: '2023-11-01', time: '10:00 AM', status: 'Confirmed', amount: '$80.00' },
    { id: 'B-902', serviceName: 'React Tutoring', customer: 'Bob Smith', provider: 'Code Mentors', date: '2023-11-02', time: '2:00 PM', status: 'Completed', amount: '$40.00' },
];

const CHART_DATA = [
    { name: 'Jan', value: 4000 }, { name: 'Feb', value: 3000 }, { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 }, { name: 'May', value: 1890 }, { name: 'Jun', value: 2390 },
];

export const ServicesPage: React.FC<ServicesPageProps> = ({ view }) => {
    const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    // Reset selections when view changes
    React.useEffect(() => {
        setSelectedProvider(null);
        setSelectedService(null);
    }, [view]);

    const renderProviderDetail = () => {
        if (!selectedProvider) return null;
        return (
            <div className="w-full xl:w-1/2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col animate-fade-in-right">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-xl font-bold">
                            {selectedProvider.name.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">{selectedProvider.name}</h2>
                            <p className="text-sm text-slate-500">ID: {selectedProvider.id} • Verified: {selectedProvider.verificationDate}</p>
                        </div>
                    </div>
                    <button onClick={() => setSelectedProvider(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <X size={24} className="text-slate-500" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50 custom-scrollbar">
                    {/* Services Summary */}
                    <section>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                            <Briefcase size={18} className="text-blue-600"/> Services Summary
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500">Total Services</p>
                                <p className="text-xl font-bold text-slate-900">{selectedProvider.servicesCount}</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500">Active Services</p>
                                <p className="text-xl font-bold text-green-600">{selectedProvider.activeServices}</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm col-span-2">
                                <p className="text-xs text-slate-500">Most Booked Service</p>
                                <p className="text-xl font-bold text-slate-900 truncate">{selectedProvider.mostBookedService}</p>
                            </div>
                        </div>
                    </section>

                    {/* Financials */}
                    <section>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                            <DollarSign size={18} className="text-blue-600"/> Financials
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                    <p className="text-xs text-slate-500">Total Revenue Generated</p>
                                    <p className="text-2xl font-bold text-slate-900">{selectedProvider.totalRevenue}</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                    <p className="text-xs text-slate-500">Avg Booking Value</p>
                                    <p className="text-2xl font-bold text-slate-900">{selectedProvider.avgBookingValue}</p>
                                </div>
                            </div>
                            <div className="md:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-64">
                                <h4 className="text-sm font-semibold text-slate-900 mb-4">Monthly Revenue Chart</h4>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={CHART_DATA}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                                        <Tooltip />
                                        <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </section>

                    {/* Risk */}
                    <section>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                            <AlertTriangle size={18} className="text-blue-600"/> Risk Metrics
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-slate-500">Complaints</p>
                                    <p className={`text-xl font-bold ${selectedProvider.complaintCount > 0 ? 'text-red-600' : 'text-slate-900'}`}>{selectedProvider.complaintCount}</p>
                                </div>
                                <AlertTriangle className="text-slate-300" size={20}/>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-slate-500">No-show %</p>
                                    <p className="text-xl font-bold text-slate-900">{selectedProvider.noShowRate}</p>
                                </div>
                                <UserCheck className="text-slate-300" size={20}/>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-slate-500">Cancellation %</p>
                                    <p className="text-xl font-bold text-slate-900">{selectedProvider.cancellationRate}</p>
                                </div>
                                <X className="text-slate-300" size={20}/>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    };

    const renderServiceDetail = () => {
        if (!selectedService) return null;
        return (
            <div className="w-full xl:w-1/2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col animate-fade-in-right">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">{selectedService.name}</h2>
                        <p className="text-sm text-slate-500">ID: {selectedService.id} • Provider: {selectedService.provider}</p>
                    </div>
                    <button onClick={() => setSelectedService(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <X size={24} className="text-slate-500" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50 custom-scrollbar">
                    {/* Booking Analytics */}
                    <section>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                            <BarChart3 size={18} className="text-teal-600"/> Booking Analytics
                        </h3>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500">Total Bookings</p>
                                <p className="text-xl font-bold text-slate-900">{selectedService.totalBookings}</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500">Completed</p>
                                <p className="text-xl font-bold text-green-600">{selectedService.completedBookings}</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500">Cancelled</p>
                                <p className="text-xl font-bold text-red-500">{selectedService.cancelledBookings}</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500">No-shows</p>
                                <p className="text-xl font-bold text-slate-900">{selectedService.noShowBookings}</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-64">
                            <h4 className="text-sm font-semibold text-slate-900 mb-4">Monthly Booking Trend</h4>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={CHART_DATA}>
                                    <defs>
                                        <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#0d9488" stopOpacity={0.2}/>
                                            <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="value" stroke="#0d9488" fillOpacity={1} fill="url(#colorBookings)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </section>

                    {/* Financial */}
                    <section>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                            <DollarSign size={18} className="text-teal-600"/> Financial Performance
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500">Gross Revenue</p>
                                <p className="text-xl font-bold text-slate-900">{selectedService.revenue}</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500">Platform Commission</p>
                                <p className="text-xl font-bold text-slate-600">{selectedService.platformCommission}</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500">Refunds</p>
                                <p className="text-xl font-bold text-red-500">{selectedService.refunds}</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    };
    
    const renderContent = () => {
        const hasSelection = selectedProvider || selectedService;
        
        switch(view) {
            case 'categories':
                return (
                     <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex-1 flex flex-col">
                        <div className="flex-1 overflow-x-auto custom-scrollbar">
                            <table className="w-full text-left whitespace-nowrap">
                                <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-4">Category Name</th>
                                        <th className="px-6 py-4 text-center">Active Services</th>
                                        <th className="px-6 py-4 text-center">Providers</th>
                                        <th className="px-6 py-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {MOCK_CATEGORIES.map(c => (
                                        <tr key={c.id} className="hover:bg-slate-50">
                                            <td className="px-6 py-4 font-medium text-slate-900">{c.name}</td>
                                            <td className="px-6 py-4 text-center text-sm text-slate-600">{c.activeServices}</td>
                                            <td className="px-6 py-4 text-center text-sm text-slate-600">{c.providersCount}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${c.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>{c.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'services':
                return (
                     <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex-1 flex flex-col">
                        <div className="flex-1 overflow-x-auto custom-scrollbar">
                            <table className="w-full text-left whitespace-nowrap">
                                <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-4">Service</th>
                                        <th className="px-6 py-4">Provider</th>
                                        <th className="px-6 py-4">Mode</th>
                                        <th className="px-6 py-4 text-right">Price</th>
                                        <th className="px-6 py-4 text-center">Duration</th>
                                        <th className="px-6 py-4 text-center">Bookings</th>
                                        <th className="px-6 py-4 text-right">Revenue</th>
                                        <th className="px-6 py-4 text-center">Rating</th>
                                        <th className="px-6 py-4 text-center">Cancel %</th>
                                        <th className="px-6 py-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {MOCK_SERVICES.map(s => (
                                        <tr 
                                            key={s.id} 
                                            onClick={() => setSelectedService(s)} 
                                            className={`hover:bg-slate-50 cursor-pointer transition-colors ${selectedService?.id === s.id ? 'bg-blue-50' : ''}`}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-900">{s.name}</div>
                                                <div className="text-xs text-slate-500">{s.category}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600">{s.provider}</td>
                                            <td className="px-6 py-4 text-sm text-slate-600">
                                                <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium">{s.mode}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right font-medium text-slate-900">{s.price}</td>
                                            <td className="px-6 py-4 text-center text-sm text-slate-500">{s.duration}</td>
                                            <td className="px-6 py-4 text-center text-sm text-slate-900 font-bold">{s.totalBookings}</td>
                                            <td className="px-6 py-4 text-right text-sm text-slate-900">{s.revenue}</td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-1 text-sm font-medium text-slate-700">
                                                    <Star size={12} className="text-yellow-400 fill-yellow-400" /> {s.rating}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center text-sm text-slate-500">{s.cancellationRate}</td>
                                            <td className="px-6 py-4">
                                                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${s.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>{s.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'providers':
                return (
                     <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex-1 flex flex-col">
                        <div className="flex-1 overflow-x-auto custom-scrollbar">
                            <table className="w-full text-left whitespace-nowrap">
                                <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-4">Provider</th>
                                        <th className="px-6 py-4">Services Offered</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-center">Bookings</th>
                                        <th className="px-6 py-4 text-right">Revenue</th>
                                        <th className="px-6 py-4 text-center">Rating</th>
                                        <th className="px-6 py-4 text-center">Complaints</th>
                                        <th className="px-6 py-4 text-center">Cancel %</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {MOCK_PROVIDERS.map(p => (
                                        <tr 
                                            key={p.id} 
                                            onClick={() => setSelectedProvider(p)} 
                                            className={`hover:bg-slate-50 cursor-pointer transition-colors ${selectedProvider?.id === p.id ? 'bg-blue-50' : ''}`}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-900">{p.name}</div>
                                                <div className="text-xs text-slate-500">ID: {p.id}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">
                                                {p.servicesOffered.join(', ')}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    p.status === 'Verified' ? 'bg-green-100 text-green-700' : 
                                                    p.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                                }`}>{p.status}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center text-sm font-bold text-slate-900">{p.totalBookings}</td>
                                            <td className="px-6 py-4 text-right text-sm font-medium text-slate-900">{p.totalRevenue}</td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-1 text-sm font-medium text-slate-700">
                                                    <Star size={14} className="text-yellow-400 fill-yellow-400" /> {p.rating}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {p.complaintCount > 0 ? (
                                                    <span className="px-2 py-0.5 bg-red-50 text-red-600 rounded text-xs font-bold">{p.complaintCount}</span>
                                                ) : <span className="text-slate-300">-</span>}
                                            </td>
                                            <td className="px-6 py-4 text-center text-sm text-slate-500">{p.cancellationRate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'bookings':
                return (
                     <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex-1 flex flex-col">
                        <div className="flex-1 overflow-x-auto custom-scrollbar">
                            <table className="w-full text-left whitespace-nowrap">
                                <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-4">Booking ID</th>
                                        <th className="px-6 py-4">Service</th>
                                        <th className="px-6 py-4">Customer</th>
                                        <th className="px-6 py-4">Provider</th>
                                        <th className="px-6 py-4">Date/Time</th>
                                        <th className="px-6 py-4 text-right">Amount</th>
                                        <th className="px-6 py-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {MOCK_BOOKINGS.map(b => (
                                        <tr key={b.id} className="hover:bg-slate-50">
                                            <td className="px-6 py-4 text-xs font-medium text-slate-500">{b.id}</td>
                                            <td className="px-6 py-4 text-sm font-medium text-slate-900">{b.serviceName}</td>
                                            <td className="px-6 py-4 text-sm text-slate-600">{b.customer}</td>
                                            <td className="px-6 py-4 text-sm text-slate-600">{b.provider}</td>
                                            <td className="px-6 py-4 text-sm text-slate-600">{b.date} <span className="text-slate-400">at</span> {b.time}</td>
                                            <td className="px-6 py-4 text-right text-sm font-medium text-slate-900">{b.amount}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    b.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                                                    b.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                    'bg-slate-100 text-slate-600'
                                                }`}>{b.status}</span>
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

    const hasSelection = selectedProvider || selectedService;

    return (
        <div className="h-[calc(100vh-8rem)] flex gap-6">
            <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${hasSelection ? 'hidden xl:flex xl:w-1/2' : 'w-full'}`}>
                 <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
                    <h1 className="text-2xl font-bold text-slate-900 mb-6 capitalize">Services {view}</h1>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                        <StatCard title="Total Providers" value="1,240" change="5%" isPositive={true} icon={<UserCheck size={20} />} />
                        <StatCard title="Active Services" value="5,890" change="12%" isPositive={true} icon={<Briefcase size={20} />} />
                        <StatCard title="Total Bookings" value="892" change="3.4%" isPositive={true} icon={<Clock size={20} />} />
                        <StatCard title="Revenue" value="$84.5k" change="6%" isPositive={true} icon={<Layers size={20} />} />
                    </div>
                    {renderContent()}
                 </div>
            </div>
            
            {renderProviderDetail()}
            {renderServiceDetail()}
        </div>
    );
};