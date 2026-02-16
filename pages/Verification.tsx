import React, { useState } from 'react';
import { Check, X, FileText, AlertCircle, Shield, User, Building, Stethoscope, Ticket, Users, Eye, ChevronRight, Store } from 'lucide-react';
import { VerificationRequest } from '../types';

const MOCK_VERIFICATIONS: VerificationRequest[] = [
    { 
        id: 'V-101', type: 'Merchant', status: 'Pending', submittedDate: '2 hours ago', riskScore: 'Low',
        applicantName: 'James Wilson', email: 'james@techhaven.com', phone: '+1 555-0192',
        businessName: 'TechHaven Ltd', gst: 'GSTIN123456789', pan: 'ABCDE1234F', category: 'Electronics',
        documents: [
            { name: 'Business Registration', type: 'PDF', status: 'Pending' },
            { name: 'Tax ID Proof', type: 'PDF', status: 'Pending' },
            { name: 'Owner ID (Aadhar)', type: 'JPG', status: 'Pending' }
        ]
    },
    { 
        id: 'V-102', type: 'Provider', status: 'Pending', submittedDate: '5 hours ago', riskScore: 'Medium',
        applicantName: 'Dr. Sarah Connor', email: 'sarah.c@medical.com', phone: '+1 555-0293',
        qualification: 'MBBS, MD', certifications: ['Board Certified Pediatrician'], licenseNumber: 'MED-99283',
        experience: '8 Years', serviceMode: 'Clinic', clinicAddress: '123 Health St, Wellness City',
        documents: [
            { name: 'Medical License', type: 'PDF', status: 'Pending' },
            { name: 'Degree Certificate', type: 'PDF', status: 'Verified' },
            { name: 'Clinic Address Proof', type: 'JPG', status: 'Pending' }
        ]
    },
    { 
        id: 'V-103', type: 'Host', status: 'Needs Revision', submittedDate: '1 day ago', riskScore: 'Low',
        applicantName: 'Yoga Masters Inc.', email: 'events@yogamasters.com', phone: '+1 555-0394',
        pastEventHistory: 12, hostCancellationRate: '0%',
        documents: [
            { name: 'ID Proof', type: 'JPG', status: 'Verified' },
            { name: 'Event Portfolio', type: 'PDF', status: 'Rejected' }
        ]
    },
    { 
        id: 'V-104', type: 'GroupCreator', status: 'Pending', submittedDate: '30 mins ago', riskScore: 'High',
        applicantName: 'Community Leader', email: 'leader@groups.com', phone: '+1 555-0495',
        engagementScore: 92, groupsCreated: 3, reportCount: 5,
        documents: []
    }
];

export const VerificationPage: React.FC = () => {
    const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
    const [activeTab, setActiveTab] = useState<'All' | 'Merchant' | 'Provider' | 'Host' | 'GroupCreator'>('All');

    const filteredRequests = activeTab === 'All' 
        ? MOCK_VERIFICATIONS 
        : MOCK_VERIFICATIONS.filter(req => req.type === activeTab);

    const renderDetailModal = () => {
        if (!selectedRequest) return null;

        return (
            <div className="w-full xl:w-1/2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col animate-fade-in-right">
                {/* Modal Header */}
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold
                            ${selectedRequest.type === 'Merchant' ? 'bg-purple-100 text-purple-700' :
                                selectedRequest.type === 'Provider' ? 'bg-blue-100 text-blue-700' :
                                selectedRequest.type === 'Host' ? 'bg-orange-100 text-orange-700' : 'bg-pink-100 text-pink-700'}`}>
                            {selectedRequest.type === 'Merchant' && <Store size={24}/>}
                            {selectedRequest.type === 'Provider' && <Stethoscope size={24}/>}
                            {selectedRequest.type === 'Host' && <Ticket size={24}/>}
                            {selectedRequest.type === 'GroupCreator' && <Users size={24}/>}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">{selectedRequest.applicantName}</h2>
                            <p className="text-sm text-slate-500">
                                {selectedRequest.type} Application • ID: {selectedRequest.id}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                            <div className={`px-3 py-1 rounded-full text-sm font-bold border flex items-center gap-2 ${
                            selectedRequest.riskScore === 'Low' ? 'bg-green-50 text-green-700 border-green-200' :
                            selectedRequest.riskScore === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                            'bg-red-50 text-red-700 border-red-200'
                            }`}>
                            <Shield size={14}/> Risk: {selectedRequest.riskScore}
                            </div>
                        <button onClick={() => setSelectedRequest(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                            <X size={24} className="text-slate-500" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50 custom-scrollbar">
                    <div className="grid grid-cols-1 gap-6">
                        {/* Details Section */}
                        <div className="space-y-6">
                            {/* Basic Info */}
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">Contact Information</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-slate-500">Email</p>
                                        <p className="font-medium text-slate-900">{selectedRequest.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500">Phone</p>
                                        <p className="font-medium text-slate-900">{selectedRequest.phone}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Type Specific Info */}
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">Application Details</h3>
                                
                                {selectedRequest.type === 'Merchant' && (
                                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                                        <div><p className="text-slate-500">Business Name</p><p className="font-medium text-slate-900">{selectedRequest.businessName}</p></div>
                                        <div><p className="text-slate-500">Category</p><p className="font-medium text-slate-900">{selectedRequest.category}</p></div>
                                        <div><p className="text-slate-500">GST Number</p><p className="font-medium text-slate-900">{selectedRequest.gst}</p></div>
                                        <div><p className="text-slate-500">PAN Number</p><p className="font-medium text-slate-900">{selectedRequest.pan}</p></div>
                                    </div>
                                )}

                                {selectedRequest.type === 'Provider' && (
                                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                                        <div><p className="text-slate-500">Qualification</p><p className="font-medium text-slate-900">{selectedRequest.qualification}</p></div>
                                        <div><p className="text-slate-500">Experience</p><p className="font-medium text-slate-900">{selectedRequest.experience}</p></div>
                                        <div><p className="text-slate-500">License Number</p><p className="font-medium text-slate-900">{selectedRequest.licenseNumber}</p></div>
                                        <div><p className="text-slate-500">Service Mode</p><p className="font-medium text-slate-900">{selectedRequest.serviceMode}</p></div>
                                        <div className="col-span-2"><p className="text-slate-500">Clinic Address</p><p className="font-medium text-slate-900">{selectedRequest.clinicAddress || 'N/A'}</p></div>
                                        <div className="col-span-2 mt-2">
                                            <p className="text-slate-500 mb-1">Certifications</p>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedRequest.certifications?.map((c, i) => (
                                                    <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs border border-blue-100">{c}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {selectedRequest.type === 'Host' && (
                                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                                        <div><p className="text-slate-500">Past Events</p><p className="font-medium text-slate-900">{selectedRequest.pastEventHistory}</p></div>
                                        <div><p className="text-slate-500">Cancellation Rate</p><p className="font-medium text-slate-900">{selectedRequest.hostCancellationRate}</p></div>
                                    </div>
                                )}

                                {selectedRequest.type === 'GroupCreator' && (
                                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                                        <div><p className="text-slate-500">Groups Created</p><p className="font-medium text-slate-900">{selectedRequest.groupsCreated}</p></div>
                                        <div><p className="text-slate-500">Engagement Score</p><p className="font-medium text-slate-900">{selectedRequest.engagementScore}</p></div>
                                        <div><p className="text-slate-500">Total Reports</p><p className={`font-bold ${selectedRequest.reportCount && selectedRequest.reportCount > 0 ? 'text-red-600' : 'text-slate-900'}`}>{selectedRequest.reportCount}</p></div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Documents & Actions */}
                        <div className="space-y-6">
                            {/* Documents */}
                            {selectedRequest.type !== 'GroupCreator' && (
                                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">Submitted Documents</h3>
                                    <div className="space-y-3">
                                        {selectedRequest.documents.map((doc, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                                                <div className="flex items-center gap-3">
                                                    <FileText size={18} className="text-slate-400"/>
                                                    <div>
                                                        <p className="text-sm font-medium text-slate-900">{doc.name}</p>
                                                        <p className="text-xs text-slate-500">{doc.type}</p>
                                                    </div>
                                                </div>
                                                <button className="text-brand-600 hover:bg-brand-50 p-1.5 rounded transition-colors" title="View Document">
                                                    <Eye size={16}/>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Admin Actions */}
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">Admin Decision</h3>
                                <div className="space-y-3">
                                    {selectedRequest.type === 'Merchant' && (
                                        <>
                                            <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                                                <Check size={18}/> Approve Merchant
                                            </button>
                                            <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg font-medium transition-colors">
                                                Request More Info
                                            </button>
                                            <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-red-200 hover:bg-red-50 text-red-600 rounded-lg font-medium transition-colors">
                                                <X size={18}/> Reject Application
                                            </button>
                                        </>
                                    )}
                                    {selectedRequest.type === 'Provider' && (
                                        <>
                                            <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                                                <Check size={18}/> Approve Full Access
                                            </button>
                                            <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                                                <Check size={18}/> Approve Online Only
                                            </button>
                                            <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-red-200 hover:bg-red-50 text-red-600 rounded-lg font-medium transition-colors">
                                                <X size={18}/> Reject Application
                                            </button>
                                        </>
                                    )}
                                    {selectedRequest.type === 'Host' && (
                                        <>
                                            <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                                                <Check size={18}/> Approve Host Badge
                                            </button>
                                            <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-amber-200 hover:bg-amber-50 text-amber-700 rounded-lg font-medium transition-colors">
                                                Limit Event Capacity
                                            </button>
                                        </>
                                    )}
                                    {selectedRequest.type === 'GroupCreator' && (
                                        <>
                                            <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                                                <Check size={18}/> Grant Creator Access
                                            </button>
                                            <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-red-200 hover:bg-red-50 text-red-600 rounded-lg font-medium transition-colors">
                                                <X size={18}/> Revoke/Block
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex gap-6">
            <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${selectedRequest ? 'hidden xl:flex xl:w-1/2' : 'w-full'}`}>
                 <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Verification Center</h1>
                            <p className="text-sm text-slate-500">Review onboarding requests and manage access controls.</p>
                        </div>
                        <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
                            {['All', 'Merchant', 'Provider', 'Host', 'GroupCreator'].map((t) => (
                                <button 
                                    key={t} 
                                    onClick={() => setActiveTab(t as any)}
                                    className={`px-4 py-2 text-xs font-medium rounded-md transition-colors ${
                                        activeTab === t ? 'bg-brand-50 text-brand-700 shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                                    }`}
                                >
                                    {t === 'GroupCreator' ? 'Group Creator' : t}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                            <p className="text-slate-500 text-sm font-medium">Pending Review</p>
                            <div className="flex justify-between items-end">
                                <p className="text-3xl font-bold text-brand-600">{MOCK_VERIFICATIONS.filter(v => v.status === 'Pending').length}</p>
                                <AlertCircle className="text-brand-200 mb-1" size={24}/>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                            <p className="text-slate-500 text-sm font-medium">Action Required</p>
                            <div className="flex justify-between items-end">
                                <p className="text-3xl font-bold text-amber-500">2</p>
                                <AlertCircle className="text-amber-200 mb-1" size={24}/>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                            <p className="text-slate-500 text-sm font-medium">High Risk</p>
                            <div className="flex justify-between items-end">
                                <p className="text-3xl font-bold text-red-500">{MOCK_VERIFICATIONS.filter(v => v.riskScore === 'High').length}</p>
                                <Shield className="text-red-200 mb-1" size={24}/>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                            <p className="text-slate-500 text-sm font-medium">Approved Today</p>
                            <div className="flex justify-between items-end">
                                <p className="text-3xl font-bold text-slate-900">8</p>
                                <Check className="text-slate-200 mb-1" size={24}/>
                            </div>
                        </div>
                    </div>

                    {/* List Table */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <table className="w-full text-left whitespace-nowrap">
                            <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
                                <tr>
                                    <th className="px-6 py-4">Applicant</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Submitted</th>
                                    <th className="px-6 py-4">Risk Score</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredRequests.map((req) => (
                                    <tr 
                                        key={req.id} 
                                        onClick={() => setSelectedRequest(req)} 
                                        className={`hover:bg-slate-50 cursor-pointer transition-colors ${selectedRequest?.id === req.id ? 'bg-indigo-50' : ''}`}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-900">{req.applicantName}</div>
                                            <div className="text-xs text-slate-500">{req.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-md text-xs font-medium border
                                                ${req.type === 'Merchant' ? 'bg-purple-50 text-purple-700 border-purple-100' : 
                                                req.type === 'Provider' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                req.type === 'Host' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                                'bg-pink-50 text-pink-700 border-pink-100'}`}>
                                                {req.type === 'GroupCreator' ? 'Group Creator' : req.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">{req.submittedDate}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border
                                                ${req.riskScore === 'Low' ? 'bg-green-50 text-green-700 border-green-200' :
                                                req.riskScore === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                'bg-red-50 text-red-700 border-red-200'}`}>
                                                <Shield size={12} /> {req.riskScore}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
                                                ${req.status === 'Pending' ? 'bg-slate-100 text-slate-800' :
                                                req.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                                req.status === 'Needs Revision' ? 'bg-orange-100 text-orange-800' :
                                                'bg-red-100 text-red-800'}`}>
                                                {req.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-slate-400 hover:text-brand-600 transition-colors">
                                                <ChevronRight size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredRequests.length === 0 && (
                            <div className="p-8 text-center text-slate-500">
                                No pending requests found for this category.
                            </div>
                        )}
                    </div>
                 </div>
            </div>

            {renderDetailModal()}
        </div>
    );
};