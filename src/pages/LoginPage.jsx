import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Smartphone, DollarSign, BarChart2, Briefcase, MessageSquare, Headphones } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (onLogin) onLogin('hrm');
  };

  const features = [
    { t: 'Smart Attendance', d: 'Absensi via smartphone, lokasi & wifi kantor.', i: Smartphone },
    { t: 'Payroll Management', d: 'Otomatisasi gaji, pph21, slip gaji.', i: DollarSign },
    { t: 'SGD Accounting', d: 'Laporan keuangan, faktur, aset & anggaran.', i: BarChart2 },
    { t: 'Project Management', d: 'Task monitoring kerja lebih rapi.', i: Briefcase },
    { t: 'Team Chat', d: 'Chat private & secure, voice & video call.', i: MessageSquare },
    { t: 'Dedicated Support', d: 'Support WhatsApp group 24/7.', i: Headphones },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 font-['Plus_Jakarta_Sans']" style={{
      background: 'radial-gradient(900px 300px at 10% 0%, rgba(59,175,181,.18), transparent 60%), radial-gradient(700px 260px at 100% 15%, rgba(76,175,80,.14), transparent 55%), linear-gradient(135deg, #eafaf1, #eaf6ff)',
    }}>
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* LEFT SIDE: Brand Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex flex-col p-10 bg-white/80 backdrop-blur-xl border border-white rounded-[32px] shadow-2xl shadow-emerald-900/5 relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-slate-100 p-2">
                <img src="https://sgd.kolabo.id/uploads/company/logo/Thumb-66f6f822d19cb_kolabo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-900 leading-tight">SGD Ecosystem</h1>
                <p className="text-sm font-bold text-emerald-600">One Stop Business Solution</p>
              </div>
            </div>

            <h2 className="text-2xl font-black text-slate-900 mb-4 leading-tight">
              Tingkatkan produktivitas team dengan SGD.
            </h2>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">
              Satu platform terintegrasi untuk HRM, Accounting, CRM, dan Project Management. Efisien, aman, dan mudah digunakan.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {features.map((f, i) => (
                <div key={i} className="p-4 bg-white/50 border border-white rounded-2xl hover:bg-white hover:shadow-md transition-all group">
                  <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    <f.i size={16} />
                  </div>
                  <h4 className="text-[12px] font-black text-slate-800 mb-1">{f.t}</h4>
                  <p className="text-[11px] text-slate-500 leading-normal font-medium">{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE: Login Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/90 backdrop-blur-xl border border-white rounded-[32px] shadow-2xl shadow-emerald-900/10 p-8 md:p-12 flex flex-col justify-center"
        >
          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-black text-slate-900">Masuk</h2>
              <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full flex items-center gap-2 text-[10px] font-black text-emerald-700 uppercase tracking-wider">
                <ShieldCheck size={14} /> Terlindungi
              </div>
            </div>
            <p className="text-slate-500 font-medium text-sm">Silakan masuk ke akun Anda untuk melanjutkan akses ke dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email / Username</label>
              <input
                type="text"
                placeholder="admin@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold text-slate-900"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs font-black text-emerald-600 hover:text-emerald-700"
                >
                  {showPassword ? 'Sembunyikan' : 'Lihat'}
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold text-slate-900"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <button
                type="submit"
                className="py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-200 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Login HRM <ArrowRight size={18} />
              </button>
              <button
                type="button"
                onClick={() => onLogin('accounting')}
                className="py-4 bg-white border border-slate-200 hover:border-emerald-500 text-slate-700 font-black rounded-2xl transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                Accounting <BarChart2 size={18} className="text-emerald-500" />
              </button>
            </div>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-100">
            <p className="text-center text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Aplikasi Pengguna</p>
            <div className="flex justify-center items-center gap-6 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
              <img src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png" alt="Play Store" className="h-10" />
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD0-VifLPKywOa4lSu4LWfOfsBb-lNBJrrRw&s" alt="App Store" className="h-8 rounded-lg" />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default LoginPage;
