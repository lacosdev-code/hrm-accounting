import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  Headset, 
  Globe, 
  Bell, 
  ChevronDown,
  LayoutGrid,
  Menu
} from 'lucide-react';

const Topbar = ({ currentMode, onSwitch, onMenuClick }) => {
  const [currentLang, setCurrentLang] = useState('ID');
  const [showLang, setShowLang] = useState(false);

  return (
    <header className="h-[60px] md:h-[70px] bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-8 shrink-0 font-['Plus_Jakarta_Sans'] sticky top-0 z-30">
      {/* Left: Search & Calendar */}
      <div className="flex items-center gap-3 md:gap-4 flex-1 max-w-xl">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-xl"
        >
          <Menu size={20} />
        </button>

        <div className="relative flex-1 group hidden sm:block">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0B2A4A] transition-colors" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2 pl-12 pr-4 text-xs font-medium focus:outline-none focus:border-slate-200 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-[#0B2A4A] rounded-xl text-xs font-bold hover:bg-[#F0F7FF] transition-all shadow-sm">
          <Calendar size={16} className="text-[#C5A059]" />
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
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#C5A059] cursor-pointer hover:underline">
            <Headset size={12} />
            SGD Support
          </div>
        </div>

        <button 
          onClick={onSwitch}
          className="px-3 md:px-5 py-2 bg-[#0B2A4A] text-[#C5A059] rounded-xl text-[10px] md:text-xs font-bold hover:brightness-110 transition-all shadow-lg shadow-slate-200"
        >
          <span className="hidden md:inline">Switch to </span>
          {currentMode === 'HRM' ? 'Finance' : 'HRM'}
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
          <div className="relative">
            <button 
              onClick={() => setShowLang(!showLang)}
              className="flex items-center gap-1.5 text-slate-500 hover:text-[#0B2A4A] transition-colors font-bold text-xs"
            >
              <Globe size={16} className="text-[#C5A059]" />
              <span>{currentLang === 'ID' ? 'ID' : 'EN'}</span>
              <ChevronDown size={12} className={`transition-transform ${showLang ? 'rotate-180' : ''}`} />
            </button>

            {showLang && (
              <div className="absolute top-full right-0 mt-3 bg-white border border-slate-200 rounded-xl shadow-xl z-[70] overflow-hidden min-w-[140px] p-1">
                <button 
                  onClick={() => { setCurrentLang('ID'); setShowLang(false); }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${currentLang === 'ID' ? 'bg-[#F0F7FF] text-[#0B2A4A]' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  Bahasa Indonesia
                  {currentLang === 'ID' && <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />}
                </button>
                <button 
                  onClick={() => { setCurrentLang('EN'); setShowLang(false); }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${currentLang === 'EN' ? 'bg-[#F0F7FF] text-[#0B2A4A]' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  English
                  {currentLang === 'EN' && <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />}
                </button>
              </div>
            )}
          </div>
          
          <button className="p-2 text-slate-400 hover:text-slate-900 relative transition-colors">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
          </button>

          <div className="flex items-center gap-2 pl-2 cursor-pointer group">
            <div className="w-9 h-9 bg-[#F0F7FF] rounded-xl flex items-center justify-center text-[#0B2A4A] font-bold border border-slate-200 group-hover:bg-[#0B2A4A] group-hover:text-[#C5A059] transition-all shadow-sm">
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
