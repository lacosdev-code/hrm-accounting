import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Smartphone, DollarSign, BarChart2, Briefcase, MessageSquare, Headphones, AlertCircle, CheckCircle2 } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: 'error' });

  const showToast = (message, type = 'error') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ ...notification, show: false }), 4000);
  };

  const handleLogin = (e, targetMode = 'hrm') => {
    if (e) e.preventDefault();
    
    // Demo credentials check
    if (email.toLowerCase() === 'sgd' && password === 'sgd123') {
      if (onLogin) onLogin(targetMode);
    } else if (email === '' || password === '') {
      showToast('Silakan masukkan username dan password.', 'warning');
    } else {
      showToast('Username atau Password salah. Silakan coba: sgd / sgd123', 'error');
    }
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
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 font-['Plus_Jakarta_Sans'] relative" style={{
      background: 'radial-gradient(900px 300px at 10% 0%, rgba(11,42,74,.10), transparent 60%), radial-gradient(700px 260px at 100% 15%, rgba(197,160,89,.08), transparent 55%), linear-gradient(135deg, #f8fbff, #e6f2ff)',
    }}>
      {/* Premium Toast Notification - Mobile Optimized */}
      {notification.show && (
        <div className="fixed top-4 md:top-10 left-1/2 -translate-x-1/2 z-[9999] w-[92%] sm:w-auto sm:min-w-[320px] max-w-[400px] animate-slide-down pointer-events-none">
          <div className={`p-4 rounded-2xl border backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex items-center gap-4 pointer-events-auto ${
            notification.type === 'error' 
              ? 'bg-rose-50/95 border-rose-200 text-rose-900' 
              : 'bg-amber-50/95 border-amber-200 text-amber-900'
          }`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
              notification.type === 'error' ? 'bg-rose-500 text-white' : 'bg-amber-500 text-white'
            }`}>
              {notification.type === 'error' ? <AlertCircle size={24} /> : <CheckCircle2 size={24} />}
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-0.5">Notification</p>
              <p className="text-sm font-extrabold leading-tight">{notification.message}</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        
        {/* LEFT SIDE: Brand Info */}
        <div className="hidden md:flex flex-col p-10 bg-white/80 backdrop-blur-xl border border-white rounded-[32px] shadow-2xl shadow-emerald-900/5 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-slate-100 p-3">
                <img src="https://ik.imagekit.io/Sgd/Logo%20Landscape.png?updatedAt=1771273586511" alt="SGD Care Logo" className="h-full w-auto object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-black text-[#0B2A4A] leading-tight">SGD Care</h1>
                <p className="text-sm font-bold text-[#C5A059]">Maintenance & Building Care Service</p>
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
                  <div className="w-8 h-8 bg-[#F0F7FF] text-[#0B2A4A] rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#0B2A4A] group-hover:text-[#C5A059] transition-all">
                    <f.i size={16} />
                  </div>
                  <h4 className="text-[12px] font-black text-slate-800 mb-1">{f.t}</h4>
                  <p className="text-[11px] text-slate-500 leading-normal font-medium">{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Login Form */}
        <div className="bg-white/95 backdrop-blur-xl border border-white rounded-[32px] shadow-2xl shadow-emerald-900/10 p-8 md:p-12 flex flex-col justify-center relative z-20">
          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-black text-[#0B2A4A]">Masuk</h2>
              <div className="px-3 py-1.5 bg-[#F0F7FF] border border-slate-200 rounded-full flex items-center gap-2 text-[10px] font-black text-[#0B2A4A] uppercase tracking-wider">
                <ShieldCheck size={14} className="text-[#C5A059]" /> Terproteksi
              </div>
            </div>
            <p className="text-slate-500 font-medium text-sm">Silakan masuk ke akun Anda untuk melanjutkan akses ke dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 relative z-30">
            <div className="relative">
              <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email / Username</label>
              <input
                type="text"
                placeholder="Masukkan username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#0B2A4A] focus:ring-4 focus:ring-[#0B2A4A]/10 outline-none transition-all font-bold text-slate-900 relative z-30"
                required
              />
            </div>

            <div className="relative">
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs font-black text-[#C5A059] hover:text-[#0B2A4A] relative z-40"
                >
                  {showPassword ? 'Sembunyikan' : 'Lihat'}
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#0B2A4A] focus:ring-4 focus:ring-[#0B2A4A]/10 outline-none transition-all font-bold text-slate-900 relative z-30"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <button
                type="submit"
                onClick={(e) => handleLogin(e, 'hrm')}
                className="py-4 bg-[#0B2A4A] hover:brightness-110 text-[#C5A059] font-black rounded-2xl shadow-xl shadow-slate-200 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 relative z-30"
              >
                Login HRM <ArrowRight size={18} />
              </button>
              <button
                type="button"
                onClick={(e) => handleLogin(e, 'accounting')}
                className="py-4 bg-white border border-slate-200 hover:border-[#0B2A4A] text-slate-700 font-black rounded-2xl transition-all flex items-center justify-center gap-2 shadow-sm relative z-30"
              >
                Accounting <BarChart2 size={18} className="text-[#C5A059]" />
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
