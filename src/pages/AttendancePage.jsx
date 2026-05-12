import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Calendar, Clock, MapPin, 
  ArrowLeft, Download, CheckCircle2, XCircle, 
  AlertCircle, ChevronLeft, ChevronRight, User
} from 'lucide-react';
import { attendanceService } from '../lib/dataService';
import { supabase } from '../lib/supabase';

const AttendancePage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await attendanceService.getDetailedLogs();
        setLogs(data);
      } catch (err) {
        console.error('Error fetching attendance logs:', err);
        // Fallback dummy data
        setLogs([
          { id: 1, date: '2026-05-10', employees: { name: 'Siti Rahma', role: 'Finance Analyst' }, check_in: '07:45', check_out: '17:15', status: 'Present' },
          { id: 2, date: '2026-05-10', employees: { name: 'Budi Santoso', role: 'Site Manager' }, check_in: '08:15', check_out: '16:30', status: 'Present' },
          { id: 3, date: '2026-05-10', employees: { name: 'Andi Prasetyo', role: 'Superadmin' }, check_in: null, check_out: null, status: 'Leave' },
          { id: 4, date: '2026-05-09', employees: { name: 'Rina Cahyati', role: 'HR Coordinator' }, check_in: '08:00', check_out: '17:05', status: 'Present' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Present': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Leave': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Absent': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const filteredLogs = logs.filter(log => 
    log.employees?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-[#fdfdfd] min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Attendance Ledger</h2>
          <p className="text-sm text-slate-400 font-medium">Detailed daily occupancy and workforce check-in records.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={16} />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:shadow-xl transition-all">
            <Calendar size={16} />
            Select Date
          </button>
        </div>
      </div>

      {/* Search & Stats Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-2 relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <input 
            type="text" 
            placeholder="Search personnel or status..."
            className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sgd-gold/10 focus:border-sgd-gold transition-all text-sm font-medium shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl flex items-center justify-between">
          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Total Present</span>
          <span className="text-xl font-black text-emerald-700">{logs.filter(l => l.status === 'Present').length}</span>
        </div>
        <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-2xl flex items-center justify-between">
          <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">On Leave</span>
          <span className="text-xl font-black text-amber-700">{logs.filter(l => l.status === 'Leave').length}</span>
        </div>
      </div>

      {/* Table Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[32px] border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.02)] overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Personnel</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Date</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Check In</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Check Out</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-6 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Verify</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-black group-hover:bg-sgd-gold group-hover:text-white transition-all">
                        {log.employees?.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">{log.employees?.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{log.employees?.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                      <Calendar size={14} className="text-slate-300" />
                      {log.date}
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                      <Clock size={14} className="text-emerald-400" />
                      {log.check_in || '--:--'}
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-sm font-bold text-slate-900">
                    {log.check_out || '--:--'}
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(log.status)}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-right">
                    <button className="w-8 h-8 rounded-lg border border-slate-100 flex items-center justify-center text-slate-300 hover:text-sgd-gold hover:border-sgd-gold transition-all">
                      <MapPin size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Placeholder */}
        <div className="p-6 bg-slate-50/30 border-t border-slate-50 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Showing {filteredLogs.length} of {logs.length} Records</p>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 hover:text-slate-900 shadow-sm transition-all">
              <ChevronLeft size={18} />
            </button>
            <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 hover:text-slate-900 shadow-sm transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AttendancePage;
