import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Wallet, Briefcase, TrendingUp, ArrowUpRight, 
  Building2, ShieldCheck, Activity, PieChart, BarChart3,
  Globe, Zap, LayoutGrid, Box
} from 'lucide-react';

const GroupOverview = () => {
  const companies = [
    { 
      name: 'Sunggiardi CARE', 
      desc: 'Maintenance & Service',
      stats: { emp: 42, projects: 12, cash: 'Rp1.2B' },
      color: 'from-blue-600 to-[#0B2A4A]',
      icon: Zap
    },
    { 
      name: 'Sunggiardi Corporation', 
      desc: 'Holding & Investment',
      stats: { emp: 15, projects: 4, cash: 'Rp5.8B' },
      color: 'from-[#C5A059] to-[#8c6d30]',
      icon: ShieldCheck
    },
    { 
      name: 'Sunggiardi Construction', 
      desc: 'Engineering & Build',
      stats: { emp: 85, projects: 8, cash: 'Rp2.4B' },
      color: 'from-slate-700 to-slate-900',
      icon: Building2
    }
  ];

  return (
    <div className="kd-shell relative min-h-screen font-['Plus_Jakarta_Sans'] overflow-y-auto px-8 pb-10">
      <div className="kd-bg-layer" />
      
      {/* Header Section */}
      <div className="relative z-10 pt-4 md:pt-8 mb-6 md:mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <motion.h4 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[#C5A059] font-black text-[10px] md:text-[11px] uppercase tracking-[0.4em] mb-2 md:mb-3"
            >
              EXECUTIVE CONSOLIDATION
            </motion.h4>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl md:text-4xl font-black text-[#0B2A4A] leading-tight"
            >
              Sunggiardi Group <span className="text-slate-400 font-medium italic">Overview</span>
            </motion.h1>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm w-full md:w-auto"
          >
            <button className="flex-1 md:flex-none px-4 md:px-5 py-2 bg-[#0B2A4A] text-white rounded-xl text-[10px] md:text-[11px] font-bold shadow-lg shadow-[#0B2A4A]/20">Real-time</button>
            <button className="flex-1 md:flex-none px-4 md:px-5 py-2 text-slate-400 text-[10px] md:text-[11px] font-bold hover:text-slate-600 transition-colors">History</button>
          </motion.div>
        </div>
      </div>

      {/* Main KPI Grid - Responsive Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10 relative z-10">
        {[
          { label: 'Total Workforce', val: '142', icon: Users, trend: '+5', color: 'bg-blue-50 text-blue-600' },
          { label: 'Managed Assets', val: 'Rp9.4B', icon: Wallet, trend: '+12%', color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Ongoing Projects', val: '24', icon: Briefcase, trend: '8', color: 'bg-amber-50 text-amber-600' },
          { label: 'Performance', val: '18.4%', icon: TrendingUp, trend: '+2.1%', color: 'bg-rose-50 text-rose-600' },
        ].map((k, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white/80 backdrop-blur-xl border border-white p-6 rounded-[32px] shadow-xl shadow-slate-200/40 relative overflow-hidden group"
          >
            <div className={`w-12 h-12 ${k.color} rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300`}>
              <k.icon size={22} strokeWidth={2.5} />
            </div>
            <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{k.label}</p>
            <h3 className="text-xl md:text-2xl font-black text-[#0B2A4A]">{k.val}</h3>
            <div className="mt-3 flex items-center gap-1.5 text-emerald-600 font-bold text-[10px] md:text-[11px]">
              <ArrowUpRight size={14} /> {k.trend} <span className="text-slate-400 font-medium ml-1">growth</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Company Cards Grid - Responsive Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-10">
        {companies.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + (i * 0.1), type: 'spring' }}
            whileHover={{ y: -10 }}
            className="group relative h-full"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${c.color} rounded-[40px] opacity-0 group-hover:opacity-5 transition-all duration-700 blur-2xl -z-10`} />
            <div className="bg-white/90 backdrop-blur-sm border border-slate-100 p-6 md:p-8 rounded-[40px] shadow-2xl h-full flex flex-col hover:border-[#C5A059]/30 transition-all duration-500">
              <div className="flex justify-between items-start mb-8 md:mb-10">
                <motion.div 
                  whileHover={{ rotate: 5 }}
                  className={`w-12 md:w-14 h-12 md:h-14 bg-gradient-to-br ${c.color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-black/10`}
                >
                  <c.icon size={24} />
                </motion.div>
                <div className="flex flex-col items-end">
                  <span className="px-3 py-1 bg-[#F0F7FF] text-[#0B2A4A] text-[9px] font-black rounded-full border border-blue-100 uppercase tracking-tighter">Verified</span>
                </div>
              </div>

              <h2 className="text-lg md:text-xl font-black text-[#0B2A4A] mb-1">{c.name}</h2>
              <p className="text-[11px] md:text-[12px] font-bold text-slate-400 mb-6 md:mb-8">{c.desc}</p>

              <div className="space-y-5 md:space-y-6 flex-1">
                {[
                  { lbl: 'Workforce', val: c.stats.emp, unit: 'Employees', icon: Users, p: '70%' },
                  { lbl: 'Operations', val: c.stats.projects, unit: 'Active Tasks', icon: Activity, p: '45%' },
                  { lbl: 'Liquidity', val: c.stats.cash, unit: 'IDR Balance', icon: Wallet, p: '85%' },
                ].map((s, si) => (
                  <div key={si} className="group/item">
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-2">
                        <s.icon size={14} className="text-[#C5A059]" />
                        <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-wider">{s.lbl}</span>
                      </div>
                      <span className="text-xs md:text-sm font-black text-[#0B2A4A]">{s.val}</span>
                    </div>
                    <div className="h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: s.p }}
                        transition={{ duration: 1.5, delay: 0.5 + (i * 0.2) }}
                        className={`h-full bg-gradient-to-r ${c.color}`} 
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-8 md:mt-10 py-3 md:py-4 bg-slate-50 hover:bg-[#0B2A4A] hover:text-white rounded-2xl text-[10px] md:text-[11px] font-black text-[#0B2A4A] transition-all border border-slate-200 hover:shadow-xl hover:shadow-[#0B2A4A]/20">
                VIEW FULL REPORT
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Group Hub - Responsive Flex */}
      <div className="mt-8 md:mt-12 flex flex-col xl:flex-row gap-6 md:gap-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 bg-[#0B2A4A] rounded-[40px] p-8 md:p-10 overflow-hidden relative shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059] opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <h3 className="text-xl md:text-2xl font-black text-white mb-2">Group Financial Health</h3>
          <p className="text-slate-400 text-xs md:text-sm mb-8 font-medium">Automatic consolidation from all 3 entities.</p>
          <div className="flex items-center gap-6 md:gap-8">
            <div>
              <p className="text-[9px] md:text-[10px] font-bold text-[#C5A059] uppercase mb-1">Group Revenue</p>
              <h4 className="text-xl md:text-2xl font-black text-white">Rp12.8M</h4>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div>
              <p className="text-[9px] md:text-[10px] font-bold text-[#C5A059] uppercase mb-1">Group Expense</p>
              <h4 className="text-xl md:text-2xl font-black text-white">Rp3.4M</h4>
            </div>
          </div>
          <button className="w-full md:w-auto mt-8 md:mt-10 px-8 py-3 bg-[#C5A059] text-[#0B2A4A] rounded-2xl font-black text-xs hover:scale-105 transition-all shadow-lg shadow-black/20">
            Download Consolidated Report
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="xl:w-[400px] bg-white/90 backdrop-blur-md border border-slate-200 rounded-[40px] p-8 md:p-10 shadow-xl"
        >
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <h3 className="text-xl md:text-2xl font-black text-[#0B2A4A]">Resources</h3>
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-[#C5A059]">
              <LayoutGrid size={20} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 md:gap-4">
            {[
              { label: 'Vendor List', sub: '45 Shared', icon: Building2 },
              { label: 'Group Policy', sub: 'Updated May 2026', icon: ShieldCheck },
              { label: 'Central Assets', sub: '120 Units', icon: Box },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-2xl hover:bg-[#F0F7FF] cursor-pointer transition-all border border-slate-100 hover:border-blue-200 flex items-center gap-4 group">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-blue-600 shadow-sm transition-colors">
                  <item.icon size={18} />
                </div>
                <div>
                  <h4 className="text-[12px] md:text-[13px] font-black text-slate-800 group-hover:text-[#0B2A4A] transition-colors">{item.label}</h4>
                  <p className="text-[10px] md:text-[11px] font-bold text-slate-400">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GroupOverview;
