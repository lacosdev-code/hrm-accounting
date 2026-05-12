import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Download, FileText, TrendingUp, Users, Clock } from 'lucide-react';

const PayrollPage = () => {
  const stats = [
    { label: 'Total Payroll', value: 'Rp 1.25B', icon: DollarSign, grad: 'modern-gradient-emerald' },
    { label: 'Employees Paid', value: '142', icon: Users, grad: 'modern-gradient-blue' },
    { label: 'Pending Approvals', value: '3', icon: Clock, grad: 'modern-gradient-amber' },
  ];

  const history = [
    { id: 1, month: 'May 2026', total: 'Rp 420M', status: 'Processing', date: '2026-05-25' },
    { id: 2, month: 'April 2026', total: 'Rp 415M', status: 'Paid', date: '2026-04-25' },
    { id: 3, month: 'March 2026', total: 'Rp 410M', status: 'Paid', date: '2026-03-25' },
  ];

  return (
    <div className="p-8 bg-[#fdfdfd] min-h-screen">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Payroll System</h2>
          <p className="text-sm text-slate-400 font-medium">Manage salary disbursements and financial records.</p>
        </div>
        <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-sgd-gold transition-all shadow-lg shadow-slate-200">
          <TrendingUp size={18} /> Generate Payroll
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ delay: idx * 0.1 }}
            className="modern-card p-6 flex items-center gap-5 group"
          >
            <div className={`modern-icon-container ${stat.grad} group-hover:scale-110`}>
              <stat.icon size={28} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-[#0B2A4A] tracking-tight">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-black text-slate-900">Payroll History</h3>
          <button className="text-sgd-gold font-bold text-xs uppercase tracking-widest hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Period</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Amount</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-8 py-6 font-bold text-slate-900">{item.month}</td>
                  <td className="px-8 py-6 font-extrabold text-slate-700">{item.total}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      item.status === 'Paid' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-sm text-slate-400 font-medium">{item.date}</td>
                  <td className="px-8 py-6 text-right">
                    <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all">
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PayrollPage;
