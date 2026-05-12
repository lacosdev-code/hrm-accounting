import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, MoreVertical, Mail, 
  UserCheck, UserMinus, Building, X, Edit2, Trash2, Check, ChevronDown
} from 'lucide-react';

const EmployeesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  
  // State untuk data karyawan (CRUD)
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Andi Prasetyo', role: 'Senior Engineer', dept: 'Engineering', email: 'andi@sgd.com', status: 'Active', joinDate: '12 Jan 2022' },
    { id: 2, name: 'Sari Dewi', role: 'Finance Manager', dept: 'Finance', email: 'sari@sgd.com', status: 'Active', joinDate: '05 Mar 2021' },
    { id: 3, name: 'Budi Santoso', role: 'HR Coordinator', dept: 'HRD', email: 'budi@sgd.com', status: 'On Leave', joinDate: '20 Jun 2023' },
    { id: 4, name: 'Rina Cahyati', role: 'Marketing Lead', dept: 'Marketing', email: 'rina@sgd.com', status: 'Active', joinDate: '15 Sep 2022' },
    { id: 5, name: 'Doni Kurniawan', role: 'Site Supervisor', dept: 'Engineering', email: 'doni@sgd.com', status: 'Active', joinDate: '02 Feb 2024' },
  ]);

  const [formData, setFormData] = useState({
    name: '', role: '', dept: 'Engineering', email: '', status: 'Active'
  });

  // Fungsi Tambah/Edit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEmployee) {
      setEmployees(employees.map(emp => 
        emp.id === editingEmployee.id ? { ...formData, id: emp.id, joinDate: emp.joinDate } : emp
      ));
    } else {
      const newEmp = {
        ...formData,
        id: Date.now(),
        joinDate: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
      };
      setEmployees([newEmp, ...employees]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus karyawan ini?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const openModal = (emp = null) => {
    if (emp) {
      setEditingEmployee(emp);
      setFormData({ name: emp.name, role: emp.role, dept: emp.dept, email: emp.email, status: emp.status });
    } else {
      setEditingEmployee(null);
      setFormData({ name: '', role: '', dept: 'Engineering', email: '', status: 'Active' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-[#fdfdfd] min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Workforce Directory</h2>
          <p className="text-slate-400 text-sm font-medium mt-1">Operational management of SGD personnel across all regions.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => openModal()}
          className="btn-primary h-14"
        >
          <Plus size={20} />
          <span>New Employee</span>
        </motion.button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.02)] mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, department, or role..."
            className="w-full pl-14 pr-6 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sgd-gold/10 focus:border-sgd-gold transition-all text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-4 rounded-2xl border border-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all font-bold text-xs uppercase tracking-widest">
          <Filter size={16} />
          Filters
        </button>
      </div>

      {/* Employee Table Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[32px] border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.02)] overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Personnel</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Department</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Communications</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence>
                {filteredEmployees.map((emp) => (
                  <motion.tr 
                    key={emp.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="group hover:bg-slate-50/30 transition-colors"
                  >
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 group-hover:bg-sgd-gold group-hover:text-white flex items-center justify-center font-black transition-all">
                          {emp.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">{emp.name}</p>
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{emp.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                        <span className="text-sm font-bold text-slate-600">{emp.dept}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-sm font-medium text-slate-500">{emp.email}</td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                        emp.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-right space-x-3">
                      <button onClick={() => openModal(emp)} className="text-slate-300 hover:text-blue-500 transition-all p-2 rounded-lg hover:bg-blue-50">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(emp.id)} className="text-slate-300 hover:text-red-500 transition-all p-2 rounded-lg hover:bg-red-50">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal Form (Add/Edit) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white w-full max-w-xl rounded-[40px] shadow-[0_32px_120px_-20px_rgba(0,0,0,0.3)] relative z-10 overflow-hidden border border-white/20"
            >
              <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    {editingEmployee ? 'Edit Profile' : 'Onboard Employee'}
                  </h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Personnel Information System</p>
                </div>
                <button onClick={closeModal} className="w-10 h-10 flex items-center justify-center rounded-full text-slate-300 hover:text-slate-600 hover:bg-slate-100 transition-all">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-10 space-y-8">
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Identity</label>
                  <input 
                    type="text" required
                    className="input-field"
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Role</label>
                    <input 
                      type="text" required
                      className="input-field"
                      placeholder="e.g. Site Manager"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Placement</label>
                    <div className="relative">
                      <select 
                        className="input-field appearance-none pr-10"
                        value={formData.dept}
                        onChange={(e) => setFormData({...formData, dept: e.target.value})}
                      >
                        <option>Engineering</option>
                        <option>Finance</option>
                        <option>HRD</option>
                        <option>Marketing</option>
                        <option>Operations</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    type="email" required
                    className="input-field"
                    placeholder="email@sgd-workspace.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Employment Status</label>
                  <div className="flex gap-4 p-1 bg-slate-50 rounded-2xl border border-slate-100">
                    {['Active', 'On Leave'].map(s => (
                      <button 
                        key={s} type="button"
                        onClick={() => setFormData({...formData, status: s})}
                        className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                          formData.status === s 
                          ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                          : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="pt-4">
                  <button type="submit" className="w-full btn-primary h-16 text-sm uppercase tracking-widest">
                    {editingEmployee ? 'Commit Changes' : 'Finalize Registration'}
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

export default EmployeesPage;
