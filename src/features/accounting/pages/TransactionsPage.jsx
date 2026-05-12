import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, ArrowDownLeft, ArrowUpRight, 
  Calendar, Download, MoreVertical, Landmark, X, Trash2, Edit2, FileSpreadsheet, FileText
} from 'lucide-react';
import { downloadPDF, downloadExcel } from '../../../lib/exportUtils';

const TransactionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // State untuk data transaksi (CRUD)
  const [transactions, setTransactions] = useState([
    { id: 1, date: '04 Mei 2026', desc: 'DP Proyek Gedung Pusat', category: 'Project Income', amount: 250000000, type: 'in' },
    { id: 2, date: '03 Mei 2026', desc: 'Pembelian Material Besi Beton', category: 'Material', amount: 45000000, type: 'out' },
    { id: 3, date: '02 Mei 2026', desc: 'Sewa Alat Berat (Excavator)', category: 'Operational', amount: 15000000, type: 'out' },
    { id: 4, date: '02 Mei 2026', desc: 'Termin 1 Griya Hijau', category: 'Project Income', amount: 110000000, type: 'in' },
    { id: 5, date: '01 Mei 2026', desc: 'Gaji Karyawan Lapangan', category: 'Payroll', amount: 180000000, type: 'out' },
  ]);

  const [formData, setFormData] = useState({
    desc: '', category: 'General', amount: '', type: 'in'
  });

  // Kalkulasi Saldo Otomatis
  const stats = useMemo(() => {
    const totalIn = transactions.filter(t => t.type === 'in').reduce((sum, t) => sum + t.amount, 0);
    const totalOut = transactions.filter(t => t.type === 'out').reduce((sum, t) => sum + t.amount, 0);
    return {
      balance: 2847500000 + (totalIn - totalOut), // 2.8M as base balance
      income: totalIn,
      expense: totalOut
    };
  }, [transactions]);

  const formatRp = (n) => 'Rp ' + Math.abs(n).toLocaleString('id-ID');

  const handleSubmit = (e) => {
    e.preventDefault();
    const amountNum = parseInt(formData.amount);
    
    if (editingTransaction) {
      setTransactions(transactions.map(t => 
        t.id === editingTransaction.id ? { ...formData, amount: amountNum, id: t.id, date: t.date } : t
      ));
    } else {
      const newTr = {
        ...formData,
        amount: amountNum,
        id: Date.now(),
        date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
      };
      setTransactions([newTr, ...transactions]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Hapus catatan transaksi ini?')) {
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  const openModal = (tr = null) => {
    if (tr) {
      setEditingTransaction(tr);
      setFormData({ desc: tr.desc, category: tr.category, amount: Math.abs(tr.amount).toString(), type: tr.type });
    } else {
      setEditingTransaction(null);
      setFormData({ desc: '', category: 'General', amount: '', type: 'in' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const filteredTransactions = transactions.filter(tr => {
    const matchesSearch = tr.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'All' || (activeTab === 'Income' && tr.type === 'in') || (activeTab === 'Expense' && tr.type === 'out');
    return matchesSearch && matchesTab;
  });

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header Section */}
      <div id="transactions-report" className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Transaksi Keuangan</h2>
          <p className="text-slate-500 text-sm mt-1">Pantau arus kas masuk dan keluar secara real-time.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative group">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-600 px-4 py-3 rounded-xl font-semibold transition-all hover:bg-slate-50"
            >
              <Download size={18} />
              Export
            </motion.button>
            {/* Dropdown Export */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <button 
                onClick={() => downloadPDF('transactions-content', 'Laporan-Transaksi-SGD.pdf')}
                className="w-full text-left px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2 rounded-t-xl"
              >
                <FileText size={16} className="text-red-400" /> Download PDF
              </button>
              <button 
                onClick={() => downloadExcel(transactions, 'Data-Transaksi-SGD.xlsx')}
                className="w-full text-left px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2 rounded-b-xl"
              >
                <FileSpreadsheet size={16} className="text-emerald-500" /> Download Excel
              </button>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openModal()}
            className="flex items-center justify-center gap-2 bg-sgd-gold text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-sgd-gold/20"
          >
            <Plus size={18} />
            Transaksi Baru
          </motion.button>
        </div>
      </div>

      <div id="transactions-content">
        {/* Account Balances Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Estimasi Saldo Kas', value: stats.balance, icon: Landmark, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Total Pemasukan', value: stats.income, icon: ArrowDownLeft, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Total Pengeluaran', value: stats.expense, icon: ArrowUpRight, color: 'text-red-500', bg: 'bg-red-50' },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            layout
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
            </div>
            <p className="text-sm text-slate-400 font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-800">Rp {stat.value.toLocaleString('id-ID')}</p>
          </motion.div>
        ))}
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex bg-white p-1 rounded-xl border border-slate-200 w-full md:w-auto">
          {['All', 'Income', 'Expense'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === tab ? 'bg-slate-800 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab === 'All' ? 'Semua' : tab === 'Income' ? 'Pemasukan' : 'Pengeluaran'}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Cari transaksi..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sgd-gold/20 focus:border-sgd-gold transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Deskripsi</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Kategori</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Nominal</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <AnimatePresence>
                {filteredTransactions.map((tr) => (
                  <motion.tr 
                    key={tr.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-medium">{tr.date}</td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-800">{tr.desc}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded-lg">
                        {tr.category}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-right font-bold ${
                      tr.type === 'in' ? 'text-emerald-500' : 'text-red-400'
                    }`}>
                      {tr.type === 'in' ? '+' : '-'}{formatRp(tr.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                      <button onClick={() => openModal(tr)} className="text-slate-400 hover:text-blue-500 transition-colors p-1">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(tr.id)} className="text-slate-400 hover:text-red-500 transition-colors p-1">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-lg rounded-[24px] shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-xl font-bold text-slate-800">
                  {editingTransaction ? 'Edit Transaksi' : 'Transaksi Baru'}
                </h3>
                <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">Jenis Transaksi</label>
                  <div className="flex gap-4">
                    {[
                      { id: 'in', label: 'Pemasukan', icon: ArrowDownLeft, color: 'emerald' },
                      { id: 'out', label: 'Pengeluaran', icon: ArrowUpRight, color: 'red' }
                    ].map(type => (
                      <button 
                        key={type.id} type="button"
                        onClick={() => setFormData({...formData, type: type.id})}
                        className={`flex-1 py-3 rounded-xl border flex items-center justify-center gap-2 font-bold text-sm transition-all ${
                          formData.type === type.id 
                          ? `bg-${type.color === 'emerald' ? 'emerald-500' : 'red-400'} border-transparent text-white shadow-md` 
                          : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
                        }`}
                      >
                        <type.icon size={16} />
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 ml-1">Deskripsi Transaksi</label>
                  <input 
                    type="text" required
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sgd-gold/20 focus:border-sgd-gold transition-all"
                    placeholder="Contoh: Beli Material Semen"
                    value={formData.desc}
                    onChange={(e) => setFormData({...formData, desc: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600 ml-1">Kategori</label>
                    <select 
                      className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sgd-gold/20 focus:border-sgd-gold transition-all appearance-none"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      <option>General</option>
                      <option>Project Income</option>
                      <option>Material</option>
                      <option>Operational</option>
                      <option>Payroll</option>
                      <option>Equipment</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600 ml-1">Nominal (IDR)</label>
                    <input 
                      type="number" required
                      className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sgd-gold/20 focus:border-sgd-gold transition-all"
                      placeholder="0"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    />
                  </div>
                </div>
                <div className="pt-4">
                  <button type="submit" className="w-full btn-primary py-4 text-lg">
                    {editingTransaction ? 'Simpan Perubahan' : 'Catat Transaksi'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TransactionsPage;
