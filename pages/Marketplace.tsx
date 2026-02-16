import React, { useState } from 'react';
import { Package, Tag, Layers, TrendingUp, AlertTriangle, List, ShoppingCart, Box, Store, ChevronDown, DollarSign, BarChart3, ShieldAlert, FileText, X } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { ProductCategory, Product, MarketplaceOrder, Merchant } from '../types';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, Tooltip } from 'recharts';

interface MarketplacePageProps {
    view: 'categories' | 'products' | 'orders' | 'merchants';
}

const MOCK_CATEGORIES: ProductCategory[] = [
    { id: 'C-01', name: 'Electronics', subcategory: 'Gadgets', productsCount: 1240, totalSales: '$450,000', status: 'Active', commissionRate: '5%' },
    { id: 'C-02', name: 'Fashion', subcategory: 'Men & Women', productsCount: 3500, totalSales: '$320,000', status: 'Active', commissionRate: '8%' },
    { id: 'C-03', name: 'Home & Living', subcategory: 'Decor', productsCount: 890, totalSales: '$150,000', status: 'Active', commissionRate: '6%' },
];

const MOCK_PRODUCTS: Product[] = [
    { id: 'P-101', name: 'Wireless Headphones', merchant: 'TechHaven', category: 'Electronics', price: '$120.00', totalQuantity: 100, quantitySold: 55, stock: 45, ordersCount: 52, revenue: '$144,000', status: 'Active', reportsCount: 2 },
    { id: 'P-102', name: 'Cotton T-Shirt', merchant: 'StyleHub', category: 'Fashion', price: '$25.00', totalQuantity: 200, quantitySold: 80, stock: 120, ordersCount: 75, revenue: '$12,500', status: 'Active', reportsCount: 0 },
];

const MOCK_ORDERS: MarketplaceOrder[] = [
    { id: 'ORD-5521', customer: 'John Doe', date: '2023-10-25', items: 3, total: '$145.00', status: 'Completed', paymentMethod: 'Credit Card' },
    { id: 'ORD-5522', customer: 'Jane Smith', date: '2023-10-25', items: 1, total: '$25.00', status: 'Pending', paymentMethod: 'PayPal' },
];

const MOCK_MERCHANTS: Merchant[] = [
    { 
        id: 'M-001', name: 'TechHaven Ltd', totalProducts: 150, activeListings: 140, inactiveListings: 10, mostSoldProduct: 'Wireless Headphones',
        totalOrders: 1200, totalRevenue: '$450,000', netRevenue: '$405,000', platformCommission: '$45,000', averageOrderValue: '$120.00',
        disputeCount: 2, refundRate: '1.2%', refundAmount: '$5,400', rating: 4.8, status: 'Active',
        complaints: 5, policyViolations: 0, payoutHistory: ['2023-10-01', '2023-09-01'], conversionRate: '3.5%', cancellationRate: '0.5%'
    },
    { 
        id: 'M-002', name: 'StyleHub Inc', totalProducts: 320, activeListings: 300, inactiveListings: 20, mostSoldProduct: 'Cotton T-Shirt',
        totalOrders: 4500, totalRevenue: '$220,000', netRevenue: '$198,000', platformCommission: '$22,000', averageOrderValue: '$48.00',
        disputeCount: 15, refundRate: '4.5%', refundAmount: '$9,900', rating: 4.2, status: 'Active',
        complaints: 12, policyViolations: 1, payoutHistory: ['2023-10-01', '2023-09-01'], conversionRate: '2.1%', cancellationRate: '2.0%'
    },
];

const SALES_CHART_DATA = [
    { name: 'Jan', sales: 4000 }, { name: 'Feb', sales: 3000 }, { name: 'Mar', sales: 2000 },
    { name: 'Apr', sales: 2780 }, { name: 'May', sales: 1890 }, { name: 'Jun', sales: 2390 },
];

export const MarketplacePage: React.FC<MarketplacePageProps> = ({ view }) => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
    
    // Reset selections when view changes
    React.useEffect(() => {
        setSelectedProduct(null);
        setSelectedMerchant(null);
    }, [view]);

    const renderProductDetail = () => {
        if (!selectedProduct) return null;
        return (
            <div className="w-full xl:w-1/2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col animate-fade-in-right">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">{selectedProduct.name}</h2>
                        <p className="text-sm text-slate-500">ID: {selectedProduct.id} • Merchant: {selectedProduct.merchant}</p>
                    </div>
                    <button onClick={() => setSelectedProduct(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <X size={24} className="text-slate-500" />
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50">
                    {/* Inventory Section */}
                    <section>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                            <Box size={18} className="text-brand-500"/> Inventory Analytics
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500">Total Stock Added</p>
                                <p className="text-xl font-bold text-slate-900">{selectedProduct.totalQuantity}</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500">Total Sold</p>
                                <p className="text-xl font-bold text-green-600">{selectedProduct.quantitySold}</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500">Current Stock</p>
                                <p className="text-xl font-bold text-blue-600">{selectedProduct.stock}</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500">Stock Status</p>
                                <p className="text-sm font-bold text-slate-900 mt-1">{selectedProduct.status}</p>
                            </div>
                        </div>
                    </section>

                    {/* Financial Section */}
                    <section>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                            <DollarSign size={18} className="text-brand-500"/> Financial Performance
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500">Gross Revenue</p>
                                <p className="text-xl font-bold text-slate-900">{selectedProduct.revenue}</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500">Net Revenue</p>
                                <p className="text-xl font-bold text-green-600">$129,600</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500">Refund Amount</p>
                                <p className="text-xl font-bold text-red-500">$500</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500">Commission Deducted</p>
                                <p className="text-xl font-bold text-slate-900">$14,400</p>
                            </div>
                        </div>
                    </section>
                    
                        {/* Order Analytics */}
                    <section>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                            <BarChart3 size={18} className="text-brand-500"/> Order Analytics
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <h4 className="text-sm font-semibold text-slate-900 mb-4">Orders Per Month</h4>
                                <div className="h-48">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={SALES_CHART_DATA}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                                            <Tooltip />
                                            <Bar dataKey="sales" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-slate-500">Conversion Rate</p>
                                        <p className="text-2xl font-bold text-slate-900">4.2%</p>
                                    </div>
                                    <div className="h-2 w-24 bg-green-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 w-[42%]"></div>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-slate-500">Repeat Purchase Rate</p>
                                        <p className="text-2xl font-bold text-slate-900">28%</p>
                                    </div>
                                    <div className="h-2 w-24 bg-blue-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 w-[28%]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        );
    };

    const renderMerchantDetail = () => {
        if (!selectedMerchant) return null;
        return (
            <div className="w-full xl:w-1/2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col animate-fade-in-right">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-lg flex items-center justify-center text-xl font-bold">
                            {selectedMerchant.name.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">{selectedMerchant.name}</h2>
                            <p className="text-sm text-slate-500">ID: {selectedMerchant.id} • Rating: {selectedMerchant.rating}/5.0</p>
                        </div>
                    </div>
                    <button onClick={() => setSelectedMerchant(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <X size={24} className="text-slate-500" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50">
                        {/* Product Summary */}
                    <section>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                            <Package size={18} className="text-purple-600"/> Product Summary
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500">Total Listings</p>
                                <p className="text-xl font-bold text-slate-900">{selectedMerchant.totalProducts}</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500">Active Listings</p>
                                <p className="text-xl font-bold text-green-600">{selectedMerchant.activeListings}</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500">Inactive Listings</p>
                                <p className="text-xl font-bold text-slate-400">{selectedMerchant.inactiveListings}</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500">Most Sold Product</p>
                                <p className="text-sm font-bold text-slate-900 mt-1 truncate" title={selectedMerchant.mostSoldProduct}>{selectedMerchant.mostSoldProduct}</p>
                            </div>
                        </div>
                    </section>

                        {/* Financials */}
                        <section>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                            <DollarSign size={18} className="text-purple-600"/> Financials
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500">Gross Revenue</p>
                                <p className="text-xl font-bold text-slate-900">{selectedMerchant.totalRevenue}</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500">Net Revenue</p>
                                <p className="text-xl font-bold text-green-600">{selectedMerchant.netRevenue}</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500">Platform Commission</p>
                                <p className="text-xl font-bold text-slate-600">{selectedMerchant.platformCommission}</p>
                            </div>
                                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-xs text-slate-500">Refund Amount</p>
                                <p className="text-xl font-bold text-red-500">{selectedMerchant.refundAmount}</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-64">
                            <h4 className="text-sm font-semibold text-slate-900 mb-4">Monthly Revenue Chart</h4>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={SALES_CHART_DATA}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                                    <Tooltip />
                                    <Bar dataKey="sales" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Order Analytics */}
                        <section>
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                                <TrendingUp size={18} className="text-purple-600"/> Order Analytics
                            </h3>
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                                <div className="flex justify-between border-b border-slate-50 pb-2">
                                    <span className="text-sm text-slate-500">Orders per Month</span>
                                    <span className="font-medium text-slate-900">~150</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-50 pb-2">
                                    <span className="text-sm text-slate-500">Avg. Order Value</span>
                                    <span className="font-medium text-slate-900">{selectedMerchant.averageOrderValue}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-50 pb-2">
                                    <span className="text-sm text-slate-500">Conversion Rate</span>
                                    <span className="font-medium text-slate-900">{selectedMerchant.conversionRate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-slate-500">Cancellation %</span>
                                    <span className="font-medium text-slate-900">{selectedMerchant.cancellationRate}</span>
                                </div>
                            </div>
                        </section>

                            {/* Risk & Reports */}
                            <section>
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                                <ShieldAlert size={18} className="text-purple-600"/> Risk & Reports
                            </h3>
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                                    <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500">Complaints</span>
                                    <span className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs font-bold">{selectedMerchant.complaints}</span>
                                </div>
                                    <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500">Disputes</span>
                                    <span className="px-2 py-1 bg-orange-50 text-orange-700 rounded text-xs font-bold">{selectedMerchant.disputeCount}</span>
                                </div>
                                    <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-500">Policy Violations</span>
                                    <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-bold">{selectedMerchant.policyViolations}</span>
                                </div>
                            </div>
                        </section>
                    </div>

                </div>
            </div>
        );
    }
    
    const renderContent = () => {
        const hasSelection = selectedProduct || selectedMerchant;
        const listClasses = `bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex-1 flex flex-col`;

        switch (view) {
            case 'categories':
                return (
                    <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar pr-1">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-900">Product Categories</h2>
                            <button className="px-4 py-2 bg-brand-500 text-white rounded-lg text-sm font-medium">Add Category</button>
                        </div>
                        <div className={listClasses}>
                            <div className="flex-1 overflow-x-auto custom-scrollbar">
                                <table className="w-full text-left whitespace-nowrap">
                                    <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase sticky top-0 z-10">
                                        <tr>
                                            <th className="px-6 py-4">Category Name</th>
                                            <th className="px-6 py-4">Subcategory</th>
                                            <th className="px-6 py-4 text-center">Commission</th>
                                            <th className="px-6 py-4 text-center">Products</th>
                                            <th className="px-6 py-4 text-right">Total Sales</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {MOCK_CATEGORIES.map(c => (
                                            <tr key={c.id} className="hover:bg-slate-50">
                                                <td className="px-6 py-4 font-medium text-slate-900">{c.name}</td>
                                                <td className="px-6 py-4 text-sm text-slate-500">{c.subcategory || '-'}</td>
                                                <td className="px-6 py-4 text-center text-sm text-slate-600">{c.commissionRate}</td>
                                                <td className="px-6 py-4 text-center text-sm text-slate-600">{c.productsCount}</td>
                                                <td className="px-6 py-4 text-right text-sm font-medium text-slate-900">{c.totalSales}</td>
                                                <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">{c.status}</span></td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="text-sm text-slate-500 hover:text-brand-600 font-medium">Edit</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );
            case 'products':
                return (
                     <div className={listClasses}>
                         <div className="flex-1 overflow-x-auto custom-scrollbar">
                            <table className="w-full text-left whitespace-nowrap">
                                <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-4">Product</th>
                                        <th className="px-6 py-4">Merchant</th>
                                        <th className="px-6 py-4 text-right">Price</th>
                                        <th className="px-6 py-4 text-center">Total Qty</th>
                                        <th className="px-6 py-4 text-center">Sold</th>
                                        <th className="px-6 py-4 text-center">Stock</th>
                                        <th className="px-6 py-4 text-right">Revenue</th>
                                        <th className="px-6 py-4 text-center">Orders</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-center">Reports</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {MOCK_PRODUCTS.map(p => (
                                        <tr 
                                            key={p.id} 
                                            onClick={() => setSelectedProduct(p)} 
                                            className={`hover:bg-slate-50 cursor-pointer transition-colors ${selectedProduct?.id === p.id ? 'bg-purple-50' : ''}`}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-900">{p.name}</div>
                                                <div className="text-xs text-slate-500">{p.category}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-600">{p.merchant}</td>
                                            <td className="px-6 py-4 text-right font-medium text-slate-900">{p.price}</td>
                                            <td className="px-6 py-4 text-center text-sm text-slate-600">{p.totalQuantity}</td>
                                            <td className="px-6 py-4 text-center text-sm text-slate-600">{p.quantitySold}</td>
                                            <td className="px-6 py-4 text-center text-sm font-bold text-slate-700">{p.stock}</td>
                                            <td className="px-6 py-4 text-right text-sm text-slate-900">{p.revenue}</td>
                                            <td className="px-6 py-4 text-center text-sm text-slate-600">{p.ordersCount}</td>
                                            <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">{p.status}</span></td>
                                            <td className="px-6 py-4 text-center">
                                                {p.reportsCount > 0 ? <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">{p.reportsCount}</span> : <span className="text-slate-300">-</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
             case 'orders':
                return (
                     <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar pr-1">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-900">Order Management</h2>
                        </div>
                        <div className={listClasses}>
                            <div className="flex-1 overflow-x-auto custom-scrollbar">
                                <table className="w-full text-left whitespace-nowrap">
                                    <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase sticky top-0 z-10">
                                        <tr>
                                            <th className="px-6 py-4">Order ID</th>
                                            <th className="px-6 py-4">Customer</th>
                                            <th className="px-6 py-4 text-center">Items</th>
                                            <th className="px-6 py-4 text-right">Total</th>
                                            <th className="px-6 py-4">Payment</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4 text-right">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {MOCK_ORDERS.map(o => (
                                            <tr key={o.id} className="hover:bg-slate-50">
                                                <td className="px-6 py-4 font-medium text-brand-600">{o.id}</td>
                                                <td className="px-6 py-4 text-sm text-slate-900">{o.customer}</td>
                                                <td className="px-6 py-4 text-center text-sm text-slate-600">{o.items}</td>
                                                <td className="px-6 py-4 text-right font-medium text-slate-900">{o.total}</td>
                                                <td className="px-6 py-4 text-sm text-slate-600">{o.paymentMethod}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        o.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                        o.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                                        'bg-red-100 text-red-700'
                                                    }`}>
                                                        {o.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right text-xs text-slate-500">{o.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );
            case 'merchants':
                return (
                    <div className={listClasses}>
                         <div className="flex-1 overflow-x-auto custom-scrollbar">
                             <table className="w-full text-left whitespace-nowrap">
                                <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-4">Merchant Name</th>
                                        <th className="px-6 py-4 text-center">Total Products</th>
                                        <th className="px-6 py-4 text-center">Active Listings</th>
                                        <th className="px-6 py-4 text-center">Orders</th>
                                        <th className="px-6 py-4 text-right">Revenue</th>
                                        <th className="px-6 py-4 text-right">AOV</th>
                                        <th className="px-6 py-4 text-center">Disputes</th>
                                        <th className="px-6 py-4 text-center">Refund Rate</th>
                                        <th className="px-6 py-4 text-center">Rating</th>
                                        <th className="px-6 py-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {MOCK_MERCHANTS.map(m => (
                                        <tr 
                                            key={m.id} 
                                            onClick={() => setSelectedMerchant(m)} 
                                            className={`hover:bg-slate-50 cursor-pointer transition-colors ${selectedMerchant?.id === m.id ? 'bg-purple-50' : ''}`}
                                        >
                                            <td className="px-6 py-4 font-medium text-slate-900">{m.name}</td>
                                            <td className="px-6 py-4 text-center text-sm text-slate-600">{m.totalProducts}</td>
                                            <td className="px-6 py-4 text-center text-sm text-slate-600">{m.activeListings}</td>
                                            <td className="px-6 py-4 text-center text-sm text-slate-600">{m.totalOrders}</td>
                                            <td className="px-6 py-4 text-right text-sm font-medium text-slate-900">{m.totalRevenue}</td>
                                            <td className="px-6 py-4 text-right text-sm text-slate-600">{m.averageOrderValue}</td>
                                            <td className="px-6 py-4 text-center text-sm text-slate-600">{m.disputeCount}</td>
                                            <td className="px-6 py-4 text-center text-sm text-slate-600">{m.refundRate}</td>
                                            <td className="px-6 py-4 text-center text-sm font-medium text-slate-900">{m.rating}</td>
                                            <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">{m.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
        }
    }

    const hasSelection = selectedProduct || selectedMerchant;

    return (
        <div className="h-[calc(100vh-8rem)] flex gap-6">
             <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${hasSelection ? 'hidden xl:flex xl:w-1/2' : 'w-full'}`}>
                 <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 flex flex-col">
                    <h1 className="text-2xl font-bold text-slate-900 mb-6 capitalize">Marketplace {view}</h1>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                        <StatCard title="Total GMV" value="$420.5k" change="8.2%" isPositive={true} icon={<TrendingUp size={20} />} />
                        <StatCard title="Active Merchants" value="340" change="12" isPositive={true} icon={<Store size={20} />} />
                        <StatCard title="Total Products" value="8,920" change="1.5%" isPositive={true} icon={<Package size={20} />} />
                        <StatCard title="Total Orders" value="1,245" change="5%" isPositive={true} icon={<ShoppingCart size={20} />} />
                    </div>
                    
                    {renderContent()}
                 </div>
            </div>
            {renderProductDetail()}
            {renderMerchantDetail()}
        </div>
    );
};