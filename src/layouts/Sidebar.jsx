import React, { useState } from 'react';
import { 
  Home, Users, Clock, Calendar, DollarSign, BarChart2, 
  Settings, LogOut, ChevronRight, Briefcase, RefreshCw,
  Building2, CheckSquare, Archive, Box, UserPlus, FileText,
  CreditCard, TrendingUp, Shield, Target, Scale, PieChart,
  LayoutGrid, ShoppingCart, Zap, GitBranch, ChevronDown, ClipboardList, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeMenu, setActiveMenu, currentMode, onModeChange, onLogout, isOpen, setIsOpen }) => {
  const [showBranches, setShowBranches] = useState(false);
  const navigate = useNavigate();
  
  const hrmMenuItems = [
    { type: 'divider', label: 'Consolidation' },
    { id: 'Overview', icon: LayoutGrid, label: 'Group Overview' },
    
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
    { type: 'divider', label: 'Consolidation' },
    { id: 'Overview', icon: LayoutGrid, label: 'Group Overview' },
    
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
    // Close sidebar on mobile after clicking
    if (window.innerWidth < 1024) setIsOpen(false);

    if (item.id === 'Overview') {
      setActiveMenu(item.label);
      navigate('/group/overview');
    } else if (item.id === 'Accounting') {
      onModeChange('Accounting');
      navigate('/accounting/dashboard');
    } else if (item.id === 'HRM') {
      onModeChange('HRM');
      navigate('/admin/dashboard');
    } else if (item.id === 'Dashboard') {
      setActiveMenu(item.label);
      navigate(currentMode === 'HRM' ? '/admin/dashboard' : '/accounting/dashboard');
    } else if (item.id === 'Employees') {
      setActiveMenu(item.label);
      navigate('/admin/employees');
    } else if (item.id === 'Transactions') {
      setActiveMenu(item.label);
      navigate('/accounting/transactions');
    } else if (item.id === 'Projects') {
      setActiveMenu(item.label);
      navigate('/projects/dashboard');
    } else {
      setActiveMenu(item.label);
    }
  };

  return (
    <div className={`fixed lg:static inset-y-0 left-0 w-72 bg-[#F8FBFF] border-r border-slate-200 flex flex-col z-50 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
      {/* Brand */}
      <div className="p-6">
        <div className="flex justify-between items-center lg:block">
          <div className="h-10 md:h-12 flex items-center">
            <img 
              src="https://ik.imagekit.io/Sgd/Logo%20Landscape.png?updatedAt=1771273586511" 
              alt="SGD Care Logo" 
              className="h-full w-auto object-contain"
            />
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>
        <div className="mt-2 pl-1">
          <p className="text-[10px] font-bold text-[#C5A059] tracking-[0.2em] uppercase">Management Hub</p>
        </div>
      </div>

      {/* Business Entity Switcher */}
      <div className="px-4 mb-4 relative">
        <button 
          onClick={() => setShowBranches(!showBranches)}
          className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-slate-200 rounded-2xl hover:shadow-md transition-all group"
        >
          <div className="w-8 h-8 bg-[#F0F7FF] rounded-lg flex items-center justify-center text-[#0B2A4A] shadow-sm border border-slate-100">
            <Building2 size={16} />
          </div>
          <div className="flex-1 text-left">
            <p className="text-[10px] font-extrabold text-[#C5A059] uppercase tracking-widest leading-none mb-1">SUNGGIARDI GROUP</p>
            <p className="text-xs font-black text-[#0B2A4A]">Sunggiardi CARE (Utama)</p>
          </div>
          <ChevronDown size={14} className={`text-slate-400 transition-transform ${showBranches ? 'rotate-180' : ''}`} />
        </button>

        {/* Entity Dropdown */}
        {showBranches && (
          <div className="absolute top-full left-4 right-4 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl z-[60] overflow-hidden p-1 animate-fade-in">
            {['Sunggiardi CARE', 'Sunggiardi Corporation', 'Sunggiardi Construction'].map((entity, i) => (
              <button 
                key={i}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#F0F7FF] rounded-xl text-xs font-bold text-slate-700 transition-colors"
                onClick={() => setShowBranches(false)}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                {entity}
              </button>
            ))}
          </div>
        )}
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
                  ? 'bg-[#0B2A4A] text-[#C5A059] shadow-lg shadow-slate-300 translate-x-1' 
                  : 'text-slate-500 hover:bg-slate-100 hover:text-[#0B2A4A]'
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
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center p-1">
            <img src="https://ik.imagekit.io/Sgd/sgd.png?updatedAt=1771273258582" alt="avatar" className="w-8 h-8 object-contain" />
          </div>
          <div className="flex-1 overflow-hidden">
            <h4 className="text-sm font-extrabold text-slate-900 truncate">Super Admin</h4>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Administrator</p>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all font-bold text-xs"
        >
          <LogOut size={14} /> Keluar Aplikasi
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
