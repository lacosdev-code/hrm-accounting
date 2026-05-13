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
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentLang, setCurrentLang] = useState('ID');
  const [showLang, setShowLang] = useState(false);

  const upcomingEvents = [
    { date: '25 May', title: 'Monthly Payroll', type: 'HRM', color: 'text-emerald-500' },
    { date: '15 May', title: 'Tax Deadline', type: 'Finance', color: 'text-rose-500' },
    { date: '20 May', title: 'Construction Milestone', type: 'Project', color: 'text-blue-500' },
    { date: '12 May', title: 'CEO Quarterly Meeting', type: 'Group', color: 'text-[#C5A059]' },
  ];

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

        <div className="relative">
          <button 
            onClick={() => { setShowCalendar(!showCalendar); setShowLang(false); }}
            className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-xs font-bold transition-all shadow-sm ${showCalendar ? 'bg-[#0B2A4A] text-[#C5A059] border-[#0B2A4A]' : 'bg-white border-slate-200 text-[#0B2A4A] hover:bg-[#F0F7FF]'}`}
          >
            <Calendar size={16} className={showCalendar ? 'text-[#C5A059]' : 'text-[#C5A059]'} />
            Calendar
          </button>

          {showCalendar && (
            <>
              <div className="fixed inset-0 z-[60]" onClick={() => setShowCalendar(false)} />
              <div className="absolute top-full left-0 mt-3 bg-white border border-slate-200 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-[70] overflow-hidden min-w-[280px] p-5 animate-fade-in">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-50">
                  <h4 className="text-sm font-black text-[#0B2A4A]">Upcoming Events</h4>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                </div>
                <div className="space-y-4">
                  {upcomingEvents.map((ev, i) => (
                    <div key={i} className="flex items-center gap-4 group cursor-pointer">
                      <div className="text-center min-w-[40px]">
                        <p className="text-[10px] font-black text-slate-400 uppercase leading-none">{ev.date.split(' ')[1]}</p>
                        <p className="text-lg font-black text-[#0B2A4A] leading-tight">{ev.date.split(' ')[0]}</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-[11px] font-black text-slate-800 group-hover:text-[#C5A059] transition-colors">{ev.title}</p>
                        <p className={`text-[9px] font-bold uppercase tracking-widest ${ev.color}`}>{ev.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-2.5 bg-slate-50 hover:bg-[#0B2A4A] hover:text-white rounded-xl text-[10px] font-black text-[#0B2A4A] transition-all border border-slate-100">
                  VIEW FULL CALENDAR
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right: Info & Profile */}
      <div className="flex items-center gap-6">
        <div className="hidden xl:flex flex-col items-end">
          <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500">
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            System Active
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
              onClick={() => { setShowLang(!showLang); setShowCalendar(false); }}
              className="flex items-center gap-1.5 text-slate-500 hover:text-[#0B2A4A] transition-colors font-bold text-xs"
            >
              <Globe size={16} className="text-[#C5A059]" />
              <span>{currentLang === 'ID' ? 'ID' : 'EN'}</span>
              <ChevronDown size={12} className={`transition-transform ${showLang ? 'rotate-180' : ''}`} />
            </button>

            {showLang && (
              <>
                <div className="fixed inset-0 z-[60]" onClick={() => setShowLang(false)} />
                <div className="absolute top-full right-0 mt-3 bg-white border border-slate-200 rounded-xl shadow-xl z-[70] overflow-hidden min-w-[140px] p-1 animate-fade-in">
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
              </>
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
