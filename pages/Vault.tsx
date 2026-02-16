import React from 'react';
import { FileText, Download, Shield, Clock } from 'lucide-react';
import { VaultDocument } from '../types';

const MOCK_DOCS: VaultDocument[] = [
    { id: 'D-101', name: 'Business_Reg_2023.pdf', user: 'TechHaven Ltd', type: 'Merchant Reg', expiryDate: '2024-12-31', status: 'Valid' },
    { id: 'D-102', name: 'Med_License_Scan.jpg', user: 'Dr. Sarah Connor', type: 'Provider Lic', expiryDate: '2023-11-01', status: 'Expiring Soon' },
    { id: 'D-103', name: 'ID_Proof_Passport.pdf', user: 'John Doe', type: 'Identity', expiryDate: '2025-05-20', status: 'Valid' },
    { id: 'D-104', name: 'Event_Portfolio_v2.pdf', user: 'Yoga Masters', type: 'Host Portfolio', expiryDate: 'N/A', status: 'Valid' },
    { id: 'D-105', name: 'Tax_Cert_Expired.pdf', user: 'Old Shop', type: 'Tax Doc', expiryDate: '2022-01-01', status: 'Expired' },
];

export const VaultPage: React.FC = () => {
    return (
        <div className="space-y-6 animate-fade-in">
             <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900">Document Vault</h1>
                <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                    <Shield size={16} className="text-brand-600"/> Secure Storage
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {MOCK_DOCS.map((doc) => (
                    <div key={doc.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-slate-50 rounded-xl text-brand-600">
                                <FileText size={24} />
                            </div>
                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${
                                doc.status === 'Valid' ? 'bg-green-50 text-green-700' :
                                doc.status === 'Expiring Soon' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                            }`}>
                                {doc.status}
                            </span>
                        </div>
                        <h3 className="font-semibold text-slate-900 truncate" title={doc.name}>{doc.name}</h3>
                        <p className="text-xs text-slate-500 mt-1">Owner: {doc.user}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{doc.type}</p>
                        
                        <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                             <div className="flex items-center gap-1 text-xs text-slate-500">
                                <Clock size={12} /> {doc.expiryDate}
                             </div>
                             <button className="text-slate-400 hover:text-brand-600 transition-colors">
                                <Download size={16} />
                             </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};