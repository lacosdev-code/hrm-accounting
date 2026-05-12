import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { 
  Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, 
  Calendar, Search, Filter, Plus, FileText, PieChart, 
  CreditCard, DollarSign, ArrowRight, Bell, Settings,
  Activity, Zap, Clock, Box, Shield, RefreshCw, Briefcase, Package, ClipboardList, Users, ClipboardCheck
} from 'lucide-react';
import { ACCOUNTING_DUMMY_DATA } from '../data/dummyData';

const AccountingDashboard = ({ onSwitchToHrm }) => {
  const [statsTab, setStatsTab] = useState('weekly');

  const getIcon = (type) => {
    switch(type) {
      case 'box': return Box;
      case 'wallet': return Wallet;
      case 'refresh': return RefreshCw;
      case 'briefcase': return Briefcase;
      case 'clipboard': return ClipboardList;
      case 'check': return ClipboardCheck;
      case 'package': return Package;
      case 'shield': return Shield;
      default: return Box;
    }
  };

  return (
    <div className="kd-shell relative min-h-screen font-['Plus_Jakarta_Sans'] overflow-y-auto px-8 pb-10">
      <div className="kd-bg-layer" />

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="kd-hero relative p-8 mb-8 mt-6 z-10">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-[#C5A059] font-extrabold text-[11px] uppercase tracking-[0.1em] mb-4">SGD ACCOUNTING - MANAGEMENT HUB</h4>
            <h1 className="text-[32px] font-bold text-[#0B2A4A] leading-tight mb-2">Financial Dashboard</h1>
            <p className="text-slate-500 font-medium text-[15px]">Monitor real-time financial health, cash flow, and project budgets.</p>
          </div>
          <div className="flex gap-3">
            <button className="kd-btn-soft bg-[#0B2A4A] text-[#C5A059] border-none hover:brightness-110 shadow-lg shadow-slate-200">
              <Plus size={16} /> New Transaction
            </button>
            <button onClick={onSwitchToHrm} className="kd-btn-soft">Switch to HRM</button>
          </div>
        </div>
      </motion.div>

      {/* Feature Hub */}
      <div className="mb-10 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-6 bg-[#C5A059] rounded-full"></div>
          <h5 className="text-[18px] font-extrabold text-[#0B2A4A]">Pusat Fitur SGD</h5>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ACCOUNTING_DUMMY_DATA?.hubItems?.map((item, i) => {
            const Icon = getIcon(item.type);
            return (
              <motion.div 
                key={i} 
                whileHover={{ y: -3 }}
                className="kd-widget border-slate-200 bg-white/80 backdrop-blur-sm p-5 flex flex-col justify-between min-h-[160px]"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-[#F0F7FF] text-[#0B2A4A] rounded-lg">
                      <Icon size={18} />
                    </div>
                    <h6 className="text-[13px] font-bold text-slate-800">{item.title}</h6>
                  </div>
                  <div className="text-[22px] font-extrabold text-slate-900 font-['Space_Grotesk']">{item.val}</div>
                  <p className="text-[11px] text-slate-400 font-medium mt-1 leading-relaxed">{item.meta}</p>
                </div>
                <button 
                  onClick={(e) => e.preventDefault()}
                  className="mt-4 w-full py-1.5 border border-slate-200 rounded-lg text-[11px] font-bold text-[#0B2A4A] hover:bg-[#F0F7FF] transition-all"
                >
                  Buka Modul
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Stats & Balance Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {/* Main Stats (Left) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Quick KPI Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {ACCOUNTING_DUMMY_DATA?.kpis?.map((kpi, i) => {
              const icons = [Users, FileText, ClipboardList, CreditCard];
              const Icon = icons[i] || BarChart;
              return (
                <div key={i} className="kd-widget p-4 bg-white shadow-sm">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${kpi.color}`}>
                    <Icon size={20} />
                  </div>
                  <p className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">Total {kpi.lbl}</p>
                  <h3 className="text-2xl font-bold text-slate-900 font-['Space_Grotesk'] mt-1">{kpi.val}</h3>
                </div>
              );
            })}
          </div>

          {/* Account Balances */}
          <div className="kd-widget">
            <div className="kd-widget-hd">
              <h5 className="flex items-center gap-2"><Wallet size={18} className="text-[#C5A059]" /> Saldo Akun</h5>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-50">
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase">Bank</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase">Nama Pemegang</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase text-right">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {ACCOUNTING_DUMMY_DATA?.balances?.map((b, i) => (
                    <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-all">
                      <td className="px-6 py-4 font-bold text-slate-800 text-[13px]">{b.bank}</td>
                      <td className="px-6 py-4 text-slate-500 text-[13px]">{b.holder}</td>
                      <td className={`px-6 py-4 text-right font-['Space_Grotesk'] font-bold ${b.color}`}>{b.balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Financial Flow (Right) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="kd-widget p-6">
            <h5 className="text-[16px] font-bold text-slate-800 mb-6">Pendapatan vs Pengeluaran</h5>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Hari Ini</p>
                <h4 className="text-[18px] font-bold text-blue-600">{ACCOUNTING_DUMMY_DATA?.financialFlow?.income?.today}</h4>
                <div className="mt-4">
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Bulan Ini</p>
                  <h4 className="text-[18px] font-bold text-amber-500">{ACCOUNTING_DUMMY_DATA?.financialFlow?.income?.month}</h4>
                </div>
              </div>
              <div className="border-l border-slate-100 pl-6">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Pengeluaran Hari Ini</p>
                <h4 className="text-[18px] font-bold text-cyan-600">{ACCOUNTING_DUMMY_DATA?.financialFlow?.expense?.today}</h4>
                <div className="mt-4">
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Pengeluaran Bulan Ini</p>
                  <h4 className="text-[18px] font-bold text-rose-500">{ACCOUNTING_DUMMY_DATA?.financialFlow?.expense?.month}</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="kd-widget overflow-hidden">
            <div className="kd-widget-hd">
              <h5>Statistik Faktur</h5>
              <div className="flex bg-slate-50 p-1 rounded-lg">
                <button 
                  onClick={() => setStatsTab('weekly')}
                  className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${statsTab === 'weekly' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400'}`}
                >Mingguan</button>
                <button 
                  onClick={() => setStatsTab('monthly')}
                  className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${statsTab === 'monthly' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400'}`}
                >Bulanan</button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {(statsTab === 'weekly' ? [
                { lbl: 'Invoice Dihasilkan', val: 'Rp45.500.000' },
                { lbl: 'Dibayar', val: 'Rp32.000.000' },
                { lbl: 'Jatuh Tempo', val: 'Rp13.500.000' },
              ] : [
                { lbl: 'Invoice Dihasilkan', val: 'Rp450.000.000' },
                { lbl: 'Dibayar', val: 'Rp380.000.000' },
                { lbl: 'Jatuh Tempo', val: 'Rp70.000.000' },
              ]).map((s, i) => (
                <div key={i} className="flex justify-between items-end border-b border-slate-50 pb-3 last:border-0">
                  <div>
                    <h6 className="text-[13px] font-bold text-slate-700">{s.lbl}</h6>
                    <p className="text-[10px] text-slate-400 font-medium">Total {statsTab}</p>
                  </div>
                  <span className="font-['Space_Grotesk'] font-bold text-slate-900">{s.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Target Progress Section */}
      <div className="mt-10 relative z-10">
        <div className="kd-widget p-6 border-l-4 border-l-[#0B2A4A]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex gap-6">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Nama Target</p>
                <h6 className="text-[14px] font-bold text-slate-800">Target 2024</h6>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Jenis</p>
                <h6 className="text-[14px] font-bold text-blue-600">Pendapatan</h6>
              </div>
              <div className="hidden md:block">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Durasi</p>
                <h6 className="text-[14px] font-bold text-slate-600">Jan 2024 - Des 2024</h6>
              </div>
            </div>
            <div className="flex-1 max-w-md">
              <div className="flex justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-500">Progres: Rp1.2M of Rp2M</span>
                <span className="text-[11px] font-extrabold text-[#C5A059]">60%</span>
              </div>
              <div className="kd-progress">
                <span style={{ width: '60%' }}></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-center text-[12px] text-slate-400 font-medium py-12 border-t border-slate-200 mt-10">
        Copyright © {new Date().getFullYear()} Sunggiardi Group | Finance Center.
      </p>
    </div>
  );
};

export default AccountingDashboard;
