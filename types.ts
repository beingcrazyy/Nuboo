import React from 'react';

export type NavSection = 
  | 'dashboard' 
  | 'users' 
  | 'community' 
  | 'marketplace-categories' 
  | 'marketplace-products' 
  | 'marketplace-orders'
  | 'marketplace-merchants'
  | 'services-categories'
  | 'services-list'
  | 'services-providers'
  | 'services-bookings'
  | 'events-list'
  | 'events-passes'
  | 'verification' 
  | 'reports' 
  | 'insights' 
  | 'settings'
  | 'audit-logs'
  | 'vault';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
}

export interface User {
  // Basic
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'User' | 'Provider' | 'Merchant' | 'Host';
  status: 'Active' | 'Suspended' | 'Flagged';
  joinedDate: string;
  
  // Engagement
  groupsJoined: number;
  groupsCreated: number;
  threadsCreated: number;
  commentsPosted: number;
  eventsParticipated: number;
  eventsHosted: number;
  servicesBooked: number;
  productsPurchased: number;

  // Financial
  totalOrders: number;
  spent: string; // Total Revenue Spent
  totalRevenueGenerated: string; // if Host / Merchant / Provider
  averageOrderValue: string;
  refundCount: number;
  refundAmount: string;

  // Risk
  riskScore: 'Low' | 'Medium' | 'High';
  reportsAgainst: number;
  cancellationRate: string;
  noShowRate: string;
  disputeCount: number;

  // Profile Details
  contributionScore: number;
  accountFlags: string[];
}

export interface VerificationDocument {
  name: string;
  type: string;
  url?: string;
  status: 'Verified' | 'Pending' | 'Rejected';
}

export interface VerificationRequest {
  id: string;
  type: 'Merchant' | 'Provider' | 'Host' | 'GroupCreator';
  submittedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Needs Revision';
  riskScore: 'Low' | 'Medium' | 'High';
  
  // Common Info
  applicantName: string;
  email: string;
  phone: string;
  
  // Merchant Specific
  businessName?: string;
  gst?: string;
  pan?: string;
  category?: string;
  bankDetails?: string;
  
  // Provider Specific
  qualification?: string;
  certifications?: string[];
  licenseNumber?: string;
  experience?: string; // Years
  serviceMode?: 'Online' | 'Home' | 'Clinic' | 'All';
  clinicAddress?: string;
  backgroundCheckStatus?: 'Passed' | 'Pending' | 'Failed';
  
  // Host Specific
  pastEventHistory?: number;
  hostCancellationRate?: string;
  
  // Group Creator Specific
  groupsCreated?: number;
  engagementScore?: number;
  reportCount?: number;
  
  // Documents
  documents: VerificationDocument[];
}

// Marketplace Types
export interface ProductCategory {
  id: string;
  name: string;
  subcategory?: string;
  productsCount: number;
  totalSales: string;
  status: 'Active' | 'Inactive';
  commissionRate: string;
}

export interface Product {
  id: string;
  name: string;
  merchant: string;
  category: string;
  price: string;
  totalQuantity: number;
  quantitySold: number;
  stock: number; // Remaining Stock
  revenue: string;
  ordersCount: number;
  status: 'Active' | 'Out of Stock' | 'Suspended';
  reportsCount: number;
}

export interface MarketplaceOrder {
  id: string;
  customer: string;
  date: string;
  items: number;
  total: string;
  status: 'Completed' | 'Pending' | 'Cancelled' | 'Refunded';
  paymentMethod: string;
}

export interface Merchant {
  id: string;
  name: string;
  totalProducts: number;
  activeListings: number;
  inactiveListings: number;
  mostSoldProduct: string;
  totalOrders: number;
  totalRevenue: string; // Gross
  netRevenue: string;
  platformCommission: string;
  averageOrderValue: string;
  disputeCount: number;
  refundRate: string;
  refundAmount: string;
  rating: number;
  status: 'Active' | 'Suspended' | 'Pending';
  complaints: number;
  policyViolations: number;
  payoutHistory: string[];
  conversionRate: string;
  cancellationRate: string;
}

// Services Types
export interface ServiceCategory {
  id: string;
  name: string;
  activeServices: number;
  providersCount: number;
  status: 'Active' | 'Inactive';
}

export interface Service {
  id: string;
  name: string;
  provider: string;
  category: string;
  mode: 'Online' | 'Home' | 'Clinic';
  price: string;
  duration: string;
  totalBookings: number;
  revenue: string;
  rating: number;
  status: 'Active' | 'Inactive';
  cancellationRate: string;
  complaints: number;
  
  // Details
  completedBookings: number;
  cancelledBookings: number;
  noShowBookings: number;
  refunds: string;
  platformCommission: string;
}

export interface Provider {
  id: string;
  name: string;
  servicesCount: number;
  activeServices: number;
  servicesOffered: string[];
  rating: number;
  totalRevenue: string;
  status: 'Verified' | 'Pending' | 'Suspended';
  verificationDate: string;
  totalBookings: number;
  complaintCount: number;
  cancellationRate: string;
  
  // Details
  mostBookedService: string;
  avgBookingValue: string;
  noShowRate: string;
}

export interface ServiceBooking {
  id: string;
  serviceName: string;
  customer: string;
  provider: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled' | 'No-show';
  amount: string;
}

// Event Types
export interface Event {
  id: string;
  title: string;
  host: string;
  date: string;
  ticketsSold: number;
  revenue: string;
  status: 'Published' | 'Draft' | 'Cancelled' | 'Pending Approval' | 'Rejected';
  category: string;
  capacity: number;
  
  // Detailed Fields
  location: string;
  totalPassTypes: number;
  reportsCount: number;
  attendanceRate: string;
  platformCommission: string;
  refundAmount: string;
  complaints: number;
  cancellationRate: string;
}

export interface EventPass {
  id: string;
  eventId: string;
  eventName: string;
  type: 'VIP' | 'General' | 'Early Bird';
  price: string;
  totalAllocated: number;
  sold: number;
  status: 'Available' | 'Sold Out';
}

export interface CommunityGroup {
  id: string;
  name: string;
  members: number;
  postsPerDay: number;
  reports: number;
  status: 'Active' | 'Flagged';
}

export interface Report {
  id: string;
  target: string;
  type: 'User' | 'Post' | 'Event' | 'Product';
  reason: string;
  severity: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Resolved' | 'Dismissed';
  date: string;
}

export interface VaultDocument {
  id: string;
  name: string;
  user: string;
  type: string;
  expiryDate: string;
  status: 'Valid' | 'Expiring Soon' | 'Expired';
}

export interface AuditLog {
  id: string;
  action: string;
  user: string;
  role: string;
  timestamp: string;
  details: string;
  ipAddress: string;
}