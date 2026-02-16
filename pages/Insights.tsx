import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';

const PIE_DATA = [
    { name: 'Services', value: 45000, color: '#14b8a6' },
    { name: 'Marketplace', value: 35000, color: '#8b5cf6' },
    { name: 'Events', value: 20000, color: '#f59e0b' },
];

const GROWTH_DATA = [
    { name: 'Jan', users: 1000 },
    { name: 'Feb', users: 1500 },
    { name: 'Mar', users: 2200 },
    { name: 'Apr', users: 2800 },
    { name: 'May', users: 3500 },
    { name: 'Jun', users: 4800 },
];

export const InsightsPage: React.FC = () => {
    return (
        <div className="space-y-6 animate-fade-in">
             <h1 className="text-2xl font-bold text-slate-900">Strategic Insights</h1>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Revenue Composition */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900 mb-6">Revenue Distribution</h3>
                    <div className="h-64 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                    {PIE_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="space-y-2">
                             {PIE_DATA.map((d) => (
                                 <div key={d.name} className="flex items-center gap-2 text-sm">
                                     <div className="w-3 h-3 rounded-full" style={{backgroundColor: d.color}}></div>
                                     <span className="text-slate-600">{d.name}</span>
                                     <span className="font-bold text-slate-900">${(d.value/1000).toFixed(0)}k</span>
                                 </div>
                             ))}
                        </div>
                    </div>
                </div>

                 {/* User Growth */}
                 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900 mb-6">User Growth Trajectory</h3>
                    <div className="h-64">
                         <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={GROWTH_DATA}>
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.2}/>
                                        <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                                <Tooltip />
                                <Area type="monotone" dataKey="users" stroke="#14b8a6" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
             </div>

             {/* Top Lists */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="font-semibold text-slate-900 mb-4">Top 5 Merchants</h3>
                    <ul className="space-y-3">
                        {[1,2,3,4,5].map((i) => (
                            <li key={i} className="flex justify-between text-sm items-center">
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-400 font-mono w-4">{i}</span>
                                    <span className="font-medium text-slate-700">Merchant {String.fromCharCode(64+i)}</span>
                                </div>
                                <span className="text-slate-900 font-bold">${150 - i*10}k</span>
                            </li>
                        ))}
                    </ul>
                </div>
                 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="font-semibold text-slate-900 mb-4">Top 5 Hosts</h3>
                    <ul className="space-y-3">
                        {[1,2,3,4,5].map((i) => (
                            <li key={i} className="flex justify-between text-sm items-center">
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-400 font-mono w-4">{i}</span>
                                    <span className="font-medium text-slate-700">Host {String.fromCharCode(64+i)}</span>
                                </div>
                                <span className="text-slate-900 font-bold">${80 - i*5}k</span>
                            </li>
                        ))}
                    </ul>
                </div>
                 <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="font-semibold text-slate-900 mb-4">Top 5 Spenders</h3>
                    <ul className="space-y-3">
                        {[1,2,3,4,5].map((i) => (
                            <li key={i} className="flex justify-between text-sm items-center">
                                <div className="flex items-center gap-2">
                                    <span className="text-slate-400 font-mono w-4">{i}</span>
                                    <span className="font-medium text-slate-700">User {String.fromCharCode(64+i)}</span>
                                </div>
                                <span className="text-slate-900 font-bold">${12 - i}k</span>
                            </li>
                        ))}
                    </ul>
                </div>
             </div>
        </div>
    );
};