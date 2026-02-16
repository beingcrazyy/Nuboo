import React from 'react';
import { Activity, Search, Filter } from 'lucide-react';
import { AuditLog } from '../types';

const MOCK_LOGS: AuditLog[] = [
    { id: 'LOG-001', action: 'User Suspension', user: 'Admin User', role: 'Super Admin', timestamp: '2023-10-25 14:30:22', details: 'Suspended user U-004 for policy violation.', ipAddress: '192.168.1.1' },
    { id: 'LOG-002', action: 'Merchant Approval', user: 'Admin User', role: 'Super Admin', timestamp: '2023-10-25 11:15:00', details: 'Approved Green Goods merchant application.', ipAddress: '192.168.1.1' },
    { id: 'LOG-003', action: 'System Setting Change', user: 'Tech Support', role: 'Admin', timestamp: '2023-10-24 09:45:11', details: 'Updated global commission rate to 5%.', ipAddress: '10.0.0.45' },
    { id: 'LOG-004', action: 'Report Resolution', user: 'Moderator A', role: 'Moderator', timestamp: '2023-10-24 16:20:05', details: 'Resolved report R-494.', ipAddress: '172.16.0.23' },
];

export const AuditLogsPage: React.FC = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Audit Logs</h1>
                    <p className="text-sm text-slate-500">Track all system activities and administrative actions.</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <input type="text" placeholder="Search logs..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-64" />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    </div>
                    <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">
                        <Filter size={16} /> Filter
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
                        <tr>
                            <th className="px-6 py-4">Timestamp</th>
                            <th className="px-6 py-4">Action</th>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Details</th>
                            <th className="px-6 py-4 text-right">IP Address</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {MOCK_LOGS.map((log) => (
                            <tr key={log.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 text-sm text-slate-500 font-mono">{log.timestamp}</td>
                                <td className="px-6 py-4">
                                    <span className="font-medium text-slate-900">{log.action}</span>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <div className="font-medium text-slate-900">{log.user}</div>
                                    <div className="text-xs text-slate-500">{log.role}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600 max-w-md truncate">{log.details}</td>
                                <td className="px-6 py-4 text-right text-xs text-slate-500 font-mono">{log.ipAddress}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};