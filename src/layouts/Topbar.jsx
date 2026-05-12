import React from 'react';
import { 
  Search, 
  Calendar, 
  Headset, 
  Globe, 
  Bell, 
  ChevronDown,
  LayoutGrid
} from 'lucide-react';

const Topbar = ({ currentMode, onSwitch }) => {
  return (
    <header className="h-[70px] bg-white border-b border-slate-100 flex items-center justify-between px-8 shrink-0 font-['Plus_Jakarta_Sans']">
      {/* Left: Search & Calendar */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative flex-1 group">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search menu(ctrl+q)" 
            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2 pl-12 pr-4 text-xs font-medium focus:outline-none focus:border-emerald-200 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-emerald-100 text-emerald-600 rounded-xl text-xs font-bold hover:bg-emerald-50 transition-all shadow-sm">
          <Calendar size={16} />
          Calendar
        </button>
      </div>

      {/* Right: Info & Profile */}
      <div className="flex items-center gap-6">
        <div className="hidden xl:flex flex-col items-end">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
            <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
            Trial tersisa 9 hari.
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 cursor-pointer hover:underline">
            <Headset size={12} />
            SGD Support
          </div>
        </div>

        <button 
          onClick={onSwitch}
          className="px-5 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/10"
        >
          Switch to {currentMode === 'HRM' ? 'Accounting' : 'HRM'}
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-500 cursor-pointer hover:text-slate-900 transition-colors">
            <Globe size={16} />
            <span className="text-xs font-bold">English</span>
          </div>
          
          <button className="p-2 text-slate-400 hover:text-slate-900 relative transition-colors">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
          </button>

          <div className="flex items-center gap-2 pl-2 cursor-pointer group">
            <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 font-bold border border-emerald-200 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm">
              <LayoutGrid size={18} />
            </div>
            <ChevronDown size={14} className="text-slate-300 group-hover:text-slate-600" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
