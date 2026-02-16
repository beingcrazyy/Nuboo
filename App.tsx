import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, ShoppingBag, Calendar, Briefcase, 
  MessageSquare, ShieldCheck, FileText, PieChart, Settings, 
  Search, Bell, LogOut, ChevronRight, ChevronDown, Archive, FileStack, List, Layers, Activity, Store
} from 'lucide-react';
import { NavSection } from './types';
import { Dashboard } from './pages/Dashboard';
import { UsersPage } from './pages/Users';
import { VerificationPage } from './pages/Verification';
import { MarketplacePage } from './pages/Marketplace';
import { ServicesPage } from './pages/Services';
import { EventsPage } from './pages/Events';
import { CommunityPage } from './pages/Community';
import { ReportsPage } from './pages/Reports';
import { InsightsPage } from './pages/Insights';
import { VaultPage } from './pages/Vault';
import { AuditLogsPage } from './pages/AuditLogs';
import { SettingsPage } from './pages/Settings';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<NavSection>('dashboard');
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    marketplace: true,
    services: true,
    events: true
  });

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return <Dashboard />;
      case 'users': return <UsersPage />;
      case 'community': return <CommunityPage />;
      
      // Marketplace Sub-modules
      case 'marketplace-categories': return <MarketplacePage view="categories" />;
      case 'marketplace-products': return <MarketplacePage view="products" />;
      case 'marketplace-orders': return <MarketplacePage view="orders" />;
      case 'marketplace-merchants': return <MarketplacePage view="merchants" />;
      
      // Services Sub-modules
      case 'services-categories': return <ServicesPage view="categories" />;
      case 'services-list': return <ServicesPage view="services" />;
      case 'services-providers': return <ServicesPage view="providers" />;
      case 'services-bookings': return <ServicesPage view="bookings" />;
      
      // Events Sub-modules
      case 'events-list': return <EventsPage view="events" />;
      case 'events-passes': return <EventsPage view="passes" />;
      
      case 'verification': return <VerificationPage />;
      case 'reports': return <ReportsPage />;
      case 'insights': return <InsightsPage />;
      case 'settings': return <SettingsPage />;
      case 'audit-logs': return <AuditLogsPage />;
      case 'vault': return <VaultPage />;
      default: return <Dashboard />;
    }
  };

  const NavItem = ({ section, icon, label, hasSubmenu = false, submenuId = '' }: { section?: NavSection; icon: React.ReactNode; label: string, hasSubmenu?: boolean, submenuId?: string }) => {
    const isActive = section === activeSection;
    const isExpanded = hasSubmenu && expandedMenus[submenuId];

    if (hasSubmenu) {
        return (
            <button
              onClick={() => toggleMenu(submenuId)}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors border-r-4 border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900`}
            >
              <div className="flex items-center gap-3">
                {icon}
                <span>{label}</span>
              </div>
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
        );
    }

    return (
      <button
        onClick={() => section && setActiveSection(section)}
        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-r-4 ${
          isActive 
            ? 'bg-brand-50 text-brand-700 border-brand-500' 
            : 'text-slate-600 hover:bg-slate-50 border-transparent hover:text-slate-900'
        }`}
      >
        {icon}
        <span>{label}</span>
      </button>
    );
  };

  const SubNavItem = ({ section, label }: { section: NavSection; label: string }) => (
    <button
      onClick={() => setActiveSection(section)}
      className={`w-full flex items-center gap-3 pl-12 pr-4 py-2 text-sm transition-colors border-r-4 ${
        activeSection === section
          ? 'text-brand-700 font-medium border-brand-500 bg-brand-50/50'
          : 'text-slate-500 hover:text-slate-900 border-transparent'
      }`}
    >
      <div className={`w-1.5 h-1.5 rounded-full ${activeSection === section ? 'bg-brand-500' : 'bg-slate-300'}`}></div>
      <span>{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0 z-20">
        <div className="p-6 flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
            </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">Nuboo<span className="text-brand-500">CMS</span></span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 space-y-1">
          <NavItem section="dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavItem section="users" icon={<Users size={20} />} label="Users" />
          <NavItem section="community" icon={<MessageSquare size={20} />} label="Community" />
          
          {/* Marketplace Group */}
          <NavItem hasSubmenu submenuId="marketplace" icon={<ShoppingBag size={20} />} label="Marketplace" />
          {expandedMenus['marketplace'] && (
            <div className="bg-slate-50/50 mb-1">
                <SubNavItem section="marketplace-categories" label="Categories" />
                <SubNavItem section="marketplace-products" label="Products" />
                <SubNavItem section="marketplace-orders" label="Orders" />
                <SubNavItem section="marketplace-merchants" label="Merchants" />
            </div>
          )}

          {/* Services Group */}
          <NavItem hasSubmenu submenuId="services" icon={<Briefcase size={20} />} label="Services" />
          {expandedMenus['services'] && (
             <div className="bg-slate-50/50 mb-1">
                <SubNavItem section="services-categories" label="Categories" />
                <SubNavItem section="services-list" label="Services" />
                <SubNavItem section="services-providers" label="Providers" />
                <SubNavItem section="services-bookings" label="Bookings" />
             </div>
          )}

          {/* Events Group */}
          <NavItem hasSubmenu submenuId="events" icon={<Calendar size={20} />} label="Events" />
          {expandedMenus['events'] && (
              <div className="bg-slate-50/50 mb-1">
                <SubNavItem section="events-list" label="Events" />
                <SubNavItem section="events-passes" label="Passes" />
              </div>
          )}

          <NavItem section="verification" icon={<ShieldCheck size={20} />} label="Verification Center" />
          <NavItem section="reports" icon={<FileText size={20} />} label="Reports & Risk" />
          <NavItem section="insights" icon={<PieChart size={20} />} label="Insights" />
          <NavItem section="settings" icon={<Settings size={20} />} label="System Settings" />
          <NavItem section="audit-logs" icon={<Activity size={20} />} label="Audit Logs" />
          <NavItem section="vault" icon={<Archive size={20} />} label="Document Vault" />
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 border border-slate-100">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">A</div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">Admin User</p>
              <p className="text-xs text-slate-500 truncate">Super Admin</p>
            </div>
            <button className="text-slate-400 hover:text-slate-600"><LogOut size={16} /></button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0">
            {/* Breadcrumb / Context */}
            <div className="flex items-center text-sm text-slate-500">
                <span className="font-medium text-slate-900 capitalize flex items-center gap-2">
                    {activeSection.includes('-') ? activeSection.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' > ') : activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
                </span>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Global Search (CMD+K)" 
                        className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                </div>
                <div className="relative">
                    <button className="text-slate-500 hover:text-slate-700 relative">
                        <Bell size={20} />
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                </div>
            </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
           <div className="max-w-7xl mx-auto">
               {renderContent()}
           </div>
        </main>
      </div>
    </div>
  );
};

export default App;