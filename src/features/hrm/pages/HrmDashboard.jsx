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

import { HRM_DUMMY_DATA } from '@/data/dummyData';

const HrmDashboard = () => {
  const [search, setSearch] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search || !import.meta.env.VITE_AI_API_KEY) {
      if (!import.meta.env.VITE_AI_API_KEY) {
        setAiResponse("Silakan masukkan API Key SumoPod di file .env terlebih dahulu untuk mengaktifkan fitur ini.");
      }
      return;
    }
    
    setIsTyping(true);
    setAiResponse('');
    
    try {
      const response = await fetch(`${import.meta.env.VITE_AI_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_AI_API_KEY}`
        },
        body: JSON.stringify({
          model: import.meta.env.VITE_AI_MODEL || "gpt-4o-mini",
          messages: [
            { 
              role: "system", 
              content: `Anda adalah asisten cerdas untuk Sunggiardi Group (Unit: Sunggiardi CARE). 
              Gunakan data berikut untuk menjawab pertanyaan: 
              - Total Karyawan: ${HRM_DUMMY_DATA.stats[0].value}
              - Kehadiran Hari Ini: 90%
              - Karyawan Aktif: 42
              - Tugas Hari Ini: 12
              Berikan jawaban yang singkat, profesional, dan ramah dalam Bahasa Indonesia.`
            },
            { role: "user", content: search }
          ],
          temperature: 0.7
        })
      });

      const data = await response.json();
      const aiMsg = data.choices[0].message.content;
      setAiResponse(aiMsg);
    } catch (error) {
      console.error("AI Error:", error);
      setAiResponse("Maaf, terjadi kesalahan saat menghubungi AI. Pastikan API Key dan Koneksi Anda benar.");
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="kd-shell relative min-h-screen font-['Plus_Jakarta_Sans'] overflow-y-auto px-8 pb-10">
      <div className="kd-bg-layer" />
      
      {/* Welcome & Quick Action Card */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative p-8 mb-8 mt-6 z-10 rounded-[32px] overflow-hidden bg-[#0B2A4A] shadow-2xl shadow-slate-300"
      >
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059] opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#1E4E8C] opacity-10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="max-w-xl text-center md:text-left">
            <h4 className="text-[#C5A059] font-black text-[11px] uppercase tracking-[0.3em] mb-3">SGD CARE WORKSPACE</h4>
            <h1 className="text-3xl font-black text-white leading-tight mb-4">
              Selamat Bekerja, <span className="text-[#C5A059]">Super Admin!</span>
            </h1>
            <p className="text-slate-300 font-medium text-[15px] leading-relaxed mb-6">
              Kelola layanan maintenance profesional, jadwal teknisi, dan administrasi operasional dengan satu kendali pusat yang cerdas dan efisien.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <button className="px-6 py-3 bg-[#C5A059] text-[#0B2A4A] rounded-2xl font-black text-xs hover:brightness-110 transition-all shadow-lg shadow-black/20">
                Tambah Tugas Baru
              </button>
              <button className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-2xl font-black text-xs hover:bg-white/20 transition-all backdrop-blur-md">
                Laporan Mingguan
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-5 rounded-3xl text-center min-w-[140px]">
              <p className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest mb-1">Teknisi Aktif</p>
              <h3 className="text-2xl font-black text-white">42</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-5 rounded-3xl text-center min-w-[140px]">
              <p className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest mb-1">Tugas Hari Ini</p>
              <h3 className="text-2xl font-black text-white">12</h3>
            </div>
          </div>
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
            <Search size={18} className="text-[#0B2A4A]" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Tanyakan jadwal, absensi, atau laporan karyawan hari ini...' 
              className="w-full bg-transparent border-0 focus:outline-none text-[15px] font-medium placeholder:text-slate-400"
            />
          </div>
          <button type="submit" className="w-[36px] h-[36px] bg-[#0B2A4A] text-[#C5A059] rounded-full flex items-center justify-center shadow-lg shadow-slate-200 hover:scale-110 active:scale-95 transition-all">
            <Send size={16} />
          </button>
        </form>
        
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-4 bg-white/50 rounded-xl border border-slate-200 flex items-center gap-3">
             <div className="w-2 h-2 bg-[#C5A059] rounded-full animate-bounce" />
             <div className="w-2 h-2 bg-[#C5A059] rounded-full animate-bounce delay-100" />
             <div className="w-2 h-2 bg-[#C5A059] rounded-full animate-bounce delay-200" />
             <span className="text-xs font-bold text-[#0B2A4A]">AI sedang menganalisa data SGD...</span>
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
        <div className="flex bg-white rounded-full p-1 border border-slate-200 shadow-sm">
          {['Today', 'This Week', 'This Month'].map(t => (
            <button key={t} className={`px-5 py-2 rounded-full text-[11px] font-bold tracking-tight transition-all ${t === 'This Month' ? 'bg-[#0B2A4A] text-[#C5A059] shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>
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
                <div key={i} className="kd-kpi relative group cursor-pointer hover:border-[#C5A059]/50 transition-all shadow-sm">
                  <p className="lbl">{c.label}</p>
                  <h4 className="val">{c.value}</h4>
                  <p className="meta">Pending approval</p>
                  <ArrowUpRight size={14} className="absolute top-4 right-4 text-slate-300 group-hover:text-[#C5A059]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-center text-[12px] text-slate-400 font-medium py-12 border-t border-slate-200 mt-10">
        Copyright © {new Date().getFullYear()} Sunggiardi Group | Professional Maintenance Service.
      </p>
    </div>
  );
};

export default HrmDashboard;
