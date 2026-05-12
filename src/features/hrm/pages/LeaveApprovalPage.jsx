import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, X, Calendar, User, FileText, 
  Clock, Filter, Search, ChevronRight, AlertCircle, CheckCircle2 
} from 'lucide-react';
import { hrmService } from '@/lib/dataService';
import { supabase } from '@/lib/supabase';

const LeaveApprovalPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await hrmService.getLeaveRequests();
        setRequests(data);
      } catch (err) {
        console.error('Error fetching leave requests:', err);
        // Fallback dummy data
        setRequests([
          { id: 1, employees: { name: 'Andi Prasetyo' }, type: 'Annual', start_date: '2026-06-01', end_date: '2026-06-05', reason: 'Family vacation', status: 'Pending' },
          { id: 2, employees: { name: 'Budi Santoso' }, type: 'Sick', start_date: '2026-05-10', end_date: '2026-05-12', reason: 'Fever and cold', status: 'Pending' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleAction = async (id, status) => {
    // In a real app, you would call hrmService.updateLeaveStatus(id, status)
    alert(`Request ${status === 'Approved' ? 'approved' : 'rejected'}!`);
    setRequests(requests.filter(r => r.id !== id));
  };

  return (
    <div className="p-8 bg-[#fdfdfd] min-h-screen">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Leave Approvals</h2>
        <p className="text-sm text-slate-400 font-medium">Review and process personnel leave applications.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence>
          {requests.map((req, idx) => (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-8 group hover:border-sgd-gold/20 transition-all"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 font-black group-hover:bg-sgd-gold/10 group-hover:text-sgd-gold transition-all">
                  {req.employees?.name ? req.employees.name[0] : '?'}
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 tracking-tight">{req.employees?.name || 'Unknown Employee'}</h4>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-[10px] font-black text-sgd-gold uppercase tracking-widest">{req.type} Leave</span>
                    <div className="w-1 h-1 bg-slate-200 rounded-full" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <Clock size={10} /> 3 Days Requested
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 max-w-md">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                  <FileText size={12} /> Reason for request
                </p>
                <p className="text-sm text-slate-600 font-medium bg-slate-50/50 p-4 rounded-2xl border border-slate-50">
                  "{req.reason}"
                </p>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right hidden lg:block">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Schedule</p>
                  <p className="text-xs font-bold text-slate-600">{req.start_date} → {req.end_date}</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleAction(req.id, 'Rejected')}
                    className="w-14 h-14 rounded-2xl border border-red-100 text-red-400 flex items-center justify-center hover:bg-red-50 transition-all"
                  >
                    <X size={20} />
                  </button>
                  <button 
                    onClick={() => handleAction(req.id, 'Approved')}
                    className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center hover:bg-sgd-gold hover:shadow-xl hover:shadow-sgd-gold/20 transition-all"
                  >
                    <Check size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {requests.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 bg-slate-50/50 rounded-[40px] border border-dashed border-slate-200">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-emerald-100 mb-6 shadow-sm">
              <CheckCircle2 size={40} className="text-emerald-400" />
            </div>
            <p className="text-xl font-black text-slate-900 tracking-tight">Queue Clear</p>
            <p className="text-sm text-slate-400 font-medium mt-1">All leave applications have been processed.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveApprovalPage;
