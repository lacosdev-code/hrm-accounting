import React, { useState } from 'react';
import { 
  Home, Users, Clock, Calendar, DollarSign, BarChart2, 
  Settings, LogOut, ChevronRight, Briefcase, RefreshCw,
  Building2, CheckSquare, Archive, Box, UserPlus, FileText,
  CreditCard, TrendingUp, Shield, Target, Scale, PieChart,
  LayoutGrid, ShoppingCart, Zap, GitBranch, ChevronDown, ClipboardList
} from 'lucide-react';

const Sidebar = ({ activeMenu, setActiveMenu, currentMode, onModeChange }) => {
  const [showBranches, setShowBranches] = useState(false);
  
  const hrmMenuItems = [
    { type: 'divider', label: 'Main Menu' },
    { id: 'Dashboard', icon: Home, label: 'Dashboard' },
    { id: 'Employees', icon: Users, label: 'Employee Management' },
    { id: 'Attendance', icon: Clock, label: 'Attendance Management' },
    { id: 'Leave', icon: Calendar, label: 'Leave' },
    { id: 'Payroll', icon: DollarSign, label: 'Payroll System' },
    
    { type: 'divider', label: 'Organization' },
    { id: 'Recruitment', icon: UserPlus, label: 'Recruitment' },
    { id: 'Performance', icon: TrendingUp, label: 'Performance' },
    
    { type: 'divider', label: 'Self Service' },
    { id: 'MyProfile', icon: Users, label: 'My Profile' },
    { id: 'Canteen', icon: ShoppingCart, label: 'Canteen & Catering' },
    
    { type: 'divider', label: 'Spotlight' },
    { id: 'Integration', icon: RefreshCw, label: 'Integration Center', hub: true },
    { id: 'Accounting', icon: BarChart2, label: 'SGD Accounting' },
  ];

  const accountingMenuItems = [
    { type: 'divider', label: 'Financial Core' },
    { id: 'Dashboard', icon: Home, label: 'Dashboard' },
    { id: 'Banking', icon: Building2, label: 'Perbankan' },
    { id: 'DoubleEntry', icon: Scale, label: 'Double Entry' },
    
    { type: 'divider', label: 'Business Process' },
    { id: 'Sales', icon: ShoppingCart, label: 'Sales' },
    { id: 'Revenue', icon: TrendingUp, label: 'Pendapatan' },
    { id: 'Expense', icon: CreditCard, label: 'Pengeluaran' },
    
    { type: 'divider', label: 'Operations' },
    { id: 'Warehouse', icon: Archive, label: 'Warehouse' },
    { id: 'Product', icon: Box, label: 'Product & Material' },
    { id: 'Projects', icon: Briefcase, label: 'Projects' },
    { id: 'RAB', icon: ClipboardList, label: 'RAB / RAP' },
    
    { type: 'divider', label: 'Reports & Tools' },
    { id: 'Reports', icon: PieChart, label: 'Laporan' },
    { id: 'Audit', icon: Shield, label: 'Audit Cerdas' },
    { id: 'Target', icon: Target, label: 'Target' },

    { type: 'divider', label: 'Switch' },
    { id: 'HRM', icon: Users, label: 'Switch to SGD HRM' },
  ];

  const menuItems = currentMode === 'HRM' ? hrmMenuItems : accountingMenuItems;

  const handleItemClick = (item) => {
    if (item.id === 'Accounting') {
      onModeChange('Accounting');
    } else if (item.id === 'HRM') {
      onModeChange('HRM');
    } else {
      setActiveMenu(item.label);
    }
  };

  return (
    <div className="w-72 h-screen bg-white border-r border-slate-100 flex flex-col z-50">
      {/* Brand */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
          <Zap className="text-white" size={24} fill="currentColor" />
        </div>
        <div>
          <h1 className="font-extrabold text-slate-900 text-lg leading-tight">SGD {currentMode}</h1>
          <p className="text-[10px] font-bold text-emerald-600 tracking-[0.2em] uppercase">V7 Engine</p>
        </div>
      </div>

      {/* Local Branch Switcher */}
      <div className="px-4 mb-4">
        <button 
          onClick={() => setShowBranches(!showBranches)}
          className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-white hover:shadow-md transition-all group"
        >
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-emerald-600 shadow-sm border border-slate-100">
            <GitBranch size={16} />
          </div>
          <div className="flex-1 text-left">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest leading-none mb-1">Kantor Cabang</p>
            <p className="text-xs font-black text-slate-700">Pusat (HQ)</p>
          </div>
          <ChevronDown size={14} className={`text-slate-400 transition-transform ${showBranches ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Menu List */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1 custom-scrollbar">
        {menuItems.map((item, index) => {
          if (item.type === 'divider') {
            return (
              <div key={index} className="sidebar-divider">
                <span>{item.label}</span>
              </div>
            );
          }

          const isActive = activeMenu === item.label;
          const Icon = item.icon;

          return (
            <button
              key={index}
              onClick={() => handleItemClick(item)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative
                ${item.hub ? 'km-menu-spotlight' : ''}
                ${isActive 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100 translate-x-1' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-sm font-bold flex-1 text-left ${isActive ? 'font-extrabold' : ''}`}>
                {item.label}
              </span>
              
              {item.hub && <span className="km-menu-badge">LIVE</span>}
              {!isActive && <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />}
            </button>
          );
        })}
      </div>

      {/* User Footer */}
      <div className="p-4 m-4 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 overflow-hidden p-1">
            <img src="https://sgd.kolabo.id/uploads/company/logo/Thumb-66f6f822d19cb_kolabo.png" alt="avatar" className="w-full h-full object-contain" />
          </div>
          <div className="flex-1 overflow-hidden">
            <h4 className="text-sm font-extrabold text-slate-900 truncate">Super Admin</h4>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Administrator</p>
          </div>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="w-full flex items-center justify-center gap-2 py-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all font-bold text-xs"
        >
          <LogOut size={14} /> Keluar Aplikasi
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
