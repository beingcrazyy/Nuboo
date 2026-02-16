import React from 'react';
import { AlertTriangle, CheckCircle, Ban, Search, Filter } from 'lucide-react';
import { Report } from '../types';

const MOCK_REPORTS: Report[] = [
    { id: 'R-492', target: 'User: John Doe', type: 'User', reason: 'Harassment in comments', severity: 'High', status: 'Open', date: '2023-10-24' },
    { id: 'R-493', target: 'Event: Night Party', type: 'Event', reason: 'Misleading description', severity: 'Medium', status: 'Open', date: '2023-10-23' },
    { id: 'R-494', target: 'Product: Herbal Tea', type: 'Product', reason: 'Damaged item received', severity: 'Low', status: 'Resolved', date: '2023-10-22' },
    { id: 'R-495', target: 'Post: "Free Money"', type: 'Post', reason: 'Scam/Spam', severity: 'High', status: 'Dismissed', date: '2023-10-21' },
];

export const ReportsPage: React.FC = () => {
    return (
        <div className="space-y-6 animate-fade-in">
             <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Reports & Moderation</h1>
                    <p className="text-sm text-slate-500">Manage user reports and platform safety.</p>
                </div>
                 <div className="flex gap-2">
                    <div className="relative">
                        <input type="text" placeholder="Search ID..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-48" />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    </div>
                    <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">
                        <Filter size={16} /> Filter
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
                        <tr>
                            <th className="px-6 py-4">Report ID</th>
                            <th className="px-6 py-4">Target Entity</th>
                            <th className="px-6 py-4">Reason</th>
                            <th className="px-6 py-4">Severity</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {MOCK_REPORTS.map((r) => (
                            <tr key={r.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 text-sm font-medium text-slate-900">{r.id}</td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-slate-900 font-medium">{r.target}</div>
                                    <span className="text-xs px-2 py-0.5 bg-slate-100 rounded text-slate-500 mt-1 inline-block">{r.type}</span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">{r.reason}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${
                                        r.severity === 'High' ? 'bg-red-50 text-red-700 border-red-100' :
                                        r.severity === 'Medium' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                        'bg-blue-50 text-blue-700 border-blue-100'
                                    }`}>
                                        {r.severity === 'High' && <AlertTriangle size={12} />}
                                        {r.severity}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                     <span className={`text-xs font-medium ${
                                        r.status === 'Open' ? 'text-slate-900' : 'text-slate-500'
                                    }`}>
                                        {r.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {r.status === 'Open' ? (
                                        <div className="flex justify-end gap-2">
                                            <button className="p-1.5 text-green-600 hover:bg-green-50 rounded" title="Resolve">
                                                <CheckCircle size={18} />
                                            </button>
                                            <button className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Ban/Suspend">
                                                <Ban size={18} />
                                            </button>
                                        </div>
                                    ) : (
                                        <span className="text-xs text-slate-400 italic">No actions</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};