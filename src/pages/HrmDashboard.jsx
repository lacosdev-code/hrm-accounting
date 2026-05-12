import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Calendar, Clock, UserCheck, TrendingUp, 
  ChevronRight, ArrowUpRight, ArrowDownRight,
  Bell, Info, CheckCircle, Zap, CalendarDays,
  FileText, ShieldCheck, MessageSquare, AlertCircle,
  X, Search, Send, LayoutGrid, Building, Box, MousePointer2,
  AlertTriangle, CreditCard, ChevronDown, Coffee, FolderKanban
} from 'lucide-react';

import { HRM_DUMMY_DATA } from '../data/dummyData';

const HrmDashboard = () => {
  const [search, setSearch] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search) return;
    setIsTyping(true);
    setAiResponse('');
    
    setTimeout(() => {
      setIsTyping(false);
      setAiResponse(`Berdasarkan data terbaru, ada 42 karyawan aktif. Hari ini 38 orang sudah check-in dan 3 orang sedang cuti.`);
    }, 1500);
  };

  return (
    <div className="kd-shell relative min-h-screen font-['Plus_Jakarta_Sans'] overflow-y-auto px-8 pb-10">
      <div className="kd-bg-layer" />
      
      {/* Update Information Card */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="kd-hero relative p-8 mb-8 mt-6 z-10"
      >
        <button className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 transition-colors">
          <X size={20} />
        </button>
        <div className="max-w-4xl">
          <h4 className="text-rose-600 font-extrabold text-[11px] uppercase tracking-[0.1em] mb-4">UPDATE INFORMATION - 17 APRIL 2026.</h4>
          <p className="text-slate-900 font-bold text-[16px] leading-relaxed">
            Integration Center <span className="font-medium text-slate-500">akan segera hadir sebagai pusat koneksi </span> 
            HRM, Accounting, dan CRM <span className="font-medium text-slate-500">dalam satu halaman yang lebih rapi, cepat, dan mudah dipahami </span>
            <span className="text-emerald-500 underline cursor-pointer">lihat preview.</span>
          </p>
          <ul className="mt-4 space-y-2 text-slate-900 text-[13px]">
            <li className="flex gap-2"><span>-</span> <span className="font-bold">Satu pusat kontrol:</span> <span className="font-medium text-slate-500">tim tidak perlu bolak-balik buka banyak project hanya untuk cek koneksi dan jalankan sinkronisasi.</span></li>
            <li className="flex gap-2"><span>-</span> <span className="font-bold">1 Klik semua data tersingkron:</span> <span className="font-medium text-slate-500">client, customer, contact, project, quotation, invoice, reimburse, payroll, dan data penting lain akan semakin mudah diselaraskan antar platform.</span></li>
          </ul>
        </div>
      </motion.div>

      {/* AI Search Section */}
      <div className="mb-10 relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="kd-ai-badge">
            <div className="dot" />
            AI CHAT ASSISTANT
          </div>
          <p className="text-[11px] font-semibold text-slate-400">Ask me anything about your workforce data.</p>
        </div>
        
        <form onSubmit={handleSearch} className="kd-ai-input-wrap">
          <div className="flex-1 flex items-center gap-3 px-2">
            <Search size={18} className="text-[#22b573]" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Tanyakan jadwal, absensi, atau laporan karyawan hari ini...' 
              className="w-full bg-transparent border-0 focus:outline-none text-[15px] font-medium placeholder:text-slate-400"
            />
          </div>
          <button type="submit" className="w-[36px] h-[36px] bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20 hover:scale-110 active:scale-95 transition-all">
            <Send size={16} />
          </button>
        </form>
        
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-4 bg-white/50 rounded-xl border border-emerald-100 flex items-center gap-3">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-100" />
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-200" />
             <span className="text-xs font-bold text-emerald-600">AI sedang menganalisa data...</span>
          </motion.div>
        )}
        
        {aiResponse && !isTyping && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white shrink-0">
                <Zap size={16} fill="currentColor" />
              </div>
              <p className="text-[14px] font-medium text-slate-700 leading-relaxed">{aiResponse}</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Context Chips & Eyebrow */}
      <div className="flex flex-wrap items-center gap-3 mb-8 relative z-10">
        <div className="kd-eyebrow">
          <div className="dot" />
          DASHBOARD - SGD
        </div>
        <div className="flex bg-white rounded-full p-1 border border-[#d4e8de] shadow-sm">
          {['Today', 'This Week', 'This Month'].map(t => (
            <button key={t} className={`px-5 py-2 rounded-full text-[11px] font-bold tracking-tight transition-all ${t === 'This Month' ? 'bg-[#22b573] text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Sunday, 10 May 2026', icon: CalendarDays },
            { label: `Total Employee: ${HRM_DUMMY_DATA.stats[0].value}`, icon: Users },
            { label: 'Attendance Rate: 90%', icon: UserCheck },
          ].map((s, i) => (
            <div key={i} className="kd-chip">
              <s.icon size={13} className="text-emerald-700" />
              {s.label}
            </div>
          ))}
        </div>
      </div>

      {/* Main KPI Grid */}
      <div className="space-y-12 relative z-10">
        <div className="kd-widget">
          <div className="kd-widget-hd">
            <h5>People & Organization</h5>
            <div className="flex gap-2">
              <button className="kd-btn-soft px-3 py-1.5 h-auto">View Org Chart</button>
            </div>
          </div>
          <div className="kd-widget-bd grid grid-cols-1 md:grid-cols-3 gap-6">
            {HRM_DUMMY_DATA.stats.map((c, i) => (
              <div key={i} className="kd-kpi">
                <p className="lbl">{c.label}</p>
                <h4 className="val">{c.value}</h4>
                <p className="meta">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="kd-widget">
          <div className="kd-widget-hd">
            <h5>Attendance & Leave Analysis</h5>
          </div>
          <div className="kd-widget-bd">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {HRM_DUMMY_DATA.attendanceStats.map((c, i) => (
                <div key={i} className="kd-kpi flex flex-col justify-between min-h-[140px]">
                  <div>
                    <p className="lbl">{c.label}</p>
                    <h4 className="val text-[24px]">{c.value}</h4>
                  </div>
                  <div className="mt-4">
                    <p className="meta mb-2">{c.sub}</p>
                    {c.progress && (
                      <div className="kd-progress">
                        <span style={{ width: `${c.progressVal}%` }} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Hub Section */}
        <div className="kd-widget">
          <div className="kd-widget-hd">
            <div>
              <h5>Activity Hub</h5>
              <p className="text-[12px] text-slate-400 mt-1">Daily work in one place: key approvals and core feature access.</p>
            </div>
            <div className="flex items-center gap-2">
               <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-[10px] font-bold border border-rose-100 flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
                 1 Pending
               </span>
            </div>
          </div>
          <div className="kd-widget-bd space-y-10">
            <div>
              <p className="text-[11px] font-bold text-[#0f766e] uppercase tracking-[0.1em] mb-4 flex items-center gap-2">
                Quick Access 
                <span className="h-[1px] flex-1 bg-[#d4e8de]" />
              </p>
              <div className="kd-quick-links">
                {[
                  { label: 'Attendance', icon: Clock, mini: 'Daily records' },
                  { label: 'Leave Request', icon: Coffee, mini: 'Leave application' },
                  { label: 'Projects', icon: FolderKanban, mini: 'Plan & progress' },
                  { label: 'Tasks', icon: CheckCircle, mini: 'Task board' },
                  { label: 'Assets', icon: Box, mini: 'Asset records' },
                ].map((a, i) => (
                  <div key={i} className="kd-quick-link">
                    <a.icon size={18} className="text-[#0f7a56]" />
                    <h4 className="title">{a.label}</h4>
                    <p className="mini">{a.mini}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'LEAVE REQUEST', value: '0' },
                { label: 'OVERTIME', value: '0' },
                { label: 'WFH REQUEST', value: '0' },
                { label: 'REIMBURSE', value: '0' },
                { label: 'ATTENDANCE REQUEST', value: '1' },
                { label: 'FORMS', value: '0' },
                { label: 'APPROVAL HUB', value: '1' },
              ].map((c, i) => (
                <div key={i} className="kd-kpi relative group cursor-pointer hover:border-[#22b573]/50 transition-all shadow-sm">
                  <p className="lbl">{c.label}</p>
                  <h4 className="val">{c.value}</h4>
                  <p className="meta">Pending approval</p>
                  <ArrowUpRight size={14} className="absolute top-4 right-4 text-slate-300 group-hover:text-emerald-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-center text-[12px] text-slate-400 font-medium py-12 border-t border-[#d4e8de] mt-10">
        Copyright © 2026 Langit Creative Solutions | PT. Langit Anantara Kreasi.
      </p>
    </div>
  );
};

export default HrmDashboard;
