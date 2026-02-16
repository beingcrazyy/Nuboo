import React from 'react';
import { Settings, Bell, Lock, Globe, CreditCard } from 'lucide-react';

export const SettingsPage: React.FC = () => {
    return (
        <div className="max-w-4xl space-y-8 animate-fade-in">
             <div>
                <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
                <p className="text-slate-500 text-sm">Manage global configurations, permissions, and billing.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-4 min-h-[400px]">
                    {/* Settings Sidebar */}
                    <div className="bg-slate-50 border-r border-slate-200 p-4">
                        <nav className="space-y-1">
                            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-brand-700 bg-white rounded-lg shadow-sm">
                                <Globe size={18} /> General
                            </button>
                            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white hover:shadow-sm rounded-lg transition-all">
                                <Lock size={18} /> Security & Roles
                            </button>
                            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white hover:shadow-sm rounded-lg transition-all">
                                <Bell size={18} /> Notifications
                            </button>
                            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white hover:shadow-sm rounded-lg transition-all">
                                <CreditCard size={18} /> Billing & Fees
                            </button>
                        </nav>
                    </div>

                    {/* Settings Content */}
                    <div className="col-span-3 p-8">
                        <h3 className="text-lg font-semibold text-slate-900 mb-6">General Configuration</h3>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Platform Name</label>
                                <input type="text" defaultValue="Nuboo CMS" className="w-full max-w-md px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Support Email</label>
                                <input type="email" defaultValue="support@nuboo.com" className="w-full max-w-md px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
                            </div>

                             <div className="pt-4 border-t border-slate-100">
                                <h4 className="text-sm font-medium text-slate-900 mb-3">Maintenance Mode</h4>
                                <div className="flex items-center justify-between max-w-md p-3 bg-slate-50 rounded-lg border border-slate-200">
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">Enable Maintenance</p>
                                        <p className="text-xs text-slate-500">Only admins will be able to access the platform.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
                                    </label>
                                </div>
                            </div>
                            
                            <div className="flex justify-end pt-4">
                                <button className="px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-lg hover:bg-brand-700">Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};