import React from 'react';
import { MessageSquare, Users, Flag, TrendingUp, MessageCircle } from 'lucide-react';
import { CommunityGroup } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const MOCK_GROUPS: CommunityGroup[] = [
    { id: 'G-1', name: 'Tech Enthusiasts', members: 15400, postsPerDay: 340, reports: 2, status: 'Active' },
    { id: 'G-2', name: 'Local Buy & Sell', members: 45000, postsPerDay: 1200, reports: 45, status: 'Flagged' },
    { id: 'G-3', name: 'Photography Lovers', members: 8900, postsPerDay: 150, reports: 0, status: 'Active' },
    { id: 'G-4', name: 'Gaming Zone', members: 22100, postsPerDay: 890, reports: 12, status: 'Active' },
];

const ENGAGEMENT_DATA = [
    { name: 'Mon', posts: 4000 },
    { name: 'Tue', posts: 3000 },
    { name: 'Wed', posts: 2000 },
    { name: 'Thu', posts: 2780 },
    { name: 'Fri', posts: 1890 },
    { name: 'Sat', posts: 2390 },
    { name: 'Sun', posts: 3490 },
];

export const CommunityPage: React.FC = () => {
    return (
        <div className="space-y-6 animate-fade-in">
             <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900">Community Intelligence</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <p className="text-slate-500 text-sm font-medium">Active Groups</p>
                            <h3 className="text-3xl font-bold text-slate-900 mt-2">1,240</h3>
                        </div>
                        <div className="mt-4 flex items-center text-green-600 text-sm font-medium">
                            <TrendingUp size={16} className="mr-1"/> +12 this week
                        </div>
                     </div>
                     <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <p className="text-slate-500 text-sm font-medium">Daily Discussions</p>
                            <h3 className="text-3xl font-bold text-slate-900 mt-2">15.4k</h3>
                        </div>
                        <div className="mt-4 flex items-center text-green-600 text-sm font-medium">
                            <MessageSquare size={16} className="mr-1"/> +5% vs avg
                        </div>
                     </div>
                     <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <p className="text-slate-500 text-sm font-medium">Reported Content</p>
                            <h3 className="text-3xl font-bold text-slate-900 mt-2">142</h3>
                        </div>
                        <div className="mt-4 flex items-center text-red-600 text-sm font-medium">
                            <Flag size={16} className="mr-1"/> Action needed
                        </div>
                     </div>

                    <div className="col-span-3 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                         <h3 className="font-semibold text-slate-900 mb-6">Top Communities</h3>
                         <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
                                    <tr>
                                        <th className="px-4 py-3 rounded-l-lg">Group Name</th>
                                        <th className="px-4 py-3 text-right">Members</th>
                                        <th className="px-4 py-3 text-right">Posts/Day</th>
                                        <th className="px-4 py-3 text-right">Reports</th>
                                        <th className="px-4 py-3 rounded-r-lg">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {MOCK_GROUPS.map(g => (
                                        <tr key={g.id}>
                                            <td className="px-4 py-3 font-medium text-slate-900">{g.name}</td>
                                            <td className="px-4 py-3 text-right text-sm text-slate-600">{(g.members/1000).toFixed(1)}k</td>
                                            <td className="px-4 py-3 text-right text-sm text-slate-600">{g.postsPerDay}</td>
                                            <td className="px-4 py-3 text-right text-sm text-slate-600">
                                                <span className={g.reports > 10 ? 'text-red-600 font-bold' : 'text-slate-600'}>{g.reports}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${g.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {g.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                         </div>
                    </div>
                </div>

                <div className="space-y-6">
                     <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-64">
                        <h3 className="font-semibold text-slate-900 mb-4">Engagement Trend</h3>
                        <ResponsiveContainer width="100%" height="80%">
                            <BarChart data={ENGAGEMENT_DATA}>
                                <Bar dataKey="posts" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                                <Tooltip cursor={{fill: 'transparent'}} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <h3 className="font-semibold text-slate-900 mb-4">Trending Threads</h3>
                        <div className="space-y-4">
                            {[1,2,3].map(i => (
                                <div key={i} className="flex gap-3 items-start p-3 bg-slate-50 rounded-xl">
                                    <div className="bg-white p-2 rounded-lg border border-slate-100 text-brand-600">
                                        <MessageCircle size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900 line-clamp-2">Best places for hiking near the city center?</p>
                                        <p className="text-xs text-slate-500 mt-1">124 replies • 2h ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};