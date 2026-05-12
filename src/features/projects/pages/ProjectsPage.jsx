import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, Briefcase, Calendar, 
  Target, TrendingUp, MoreVertical, X, CheckCircle2,
  Clock, AlertCircle, ChevronRight, BarChart3
} from 'lucide-react';
import { projectService } from '../../../lib/dataService';
import { supabase } from '../../../lib/supabase';

const ProjectCard = ({ project, delay }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'On Hold': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Completed': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.02)] card-hover group"
    >
      <div className="flex justify-between items-start mb-8">
        <div className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${getStatusColor(project.status)}`}>
          {project.status}
        </div>
        <button className="text-slate-300 hover:text-slate-900 transition-colors">
          <MoreVertical size={18} />
        </button>
      </div>

      <h4 className="text-xl font-black text-slate-900 tracking-tight mb-2 group-hover:text-sgd-gold transition-colors">
        {project.name}
      </h4>
      <p className="text-xs text-slate-400 font-medium line-clamp-2 mb-8">{project.description || 'No description provided for this site project.'}</p>

      <div className="space-y-6 mb-8">
        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
          <span>Execution Progress</span>
          <span className="text-slate-900">{project.progress}%</span>
        </div>
        <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-sgd-gold rounded-full shadow-[0_0_10px_rgba(212,175,55,0.3)]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
            <Calendar size={14} />
          </div>
          <div>
            <p className="text-[8px] font-black text-slate-300 uppercase tracking-wider">Start Date</p>
            <p className="text-[10px] font-bold text-slate-600">{new Date(project.start_date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
            <Target size={14} />
          </div>
          <div>
            <p className="text-[8px] font-black text-slate-300 uppercase tracking-wider">RAP Target</p>
            <p className="text-[10px] font-bold text-slate-600">Rp {(project.totalPlanned / 1000000).toFixed(1)}M</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getProjects();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        // Fallback dummy data
        setProjects([
          { id: 1, name: 'Peningkatan Standard Reporting Finance Mingguan', status: 'Active', progress: 65, start_date: '2026-03-05', totalPlanned: 5000000000 },
          { id: 2, name: 'Implementasi Sistem Operasional Cabang Jakarta Selatan Tahap 1', status: 'Active', progress: 30, start_date: '2026-03-01', totalPlanned: 1200000000 },
          { id: 3, name: 'Land Clearing Site A-12 | PT Nusantara Prima', status: 'Completed', progress: 100, start_date: '2025-11-20', totalPlanned: 800000000 },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-8 bg-[#fdfdfd] min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-6 bg-sgd-gold rounded-full" />
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Project Engineering</h2>
          </div>
          <p className="text-sm text-slate-400 font-medium">Monitoring site execution, budget planning (RAP), and resource allocation.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-3 bg-white border border-slate-100 px-6 py-4 rounded-[20px] font-black text-xs uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <BarChart3 size={18} />
            Analytics
          </button>
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-[20px] font-black text-xs uppercase tracking-widest shadow-2xl shadow-slate-200/50 hover:shadow-sgd-gold/20 transition-all"
          >
            <Plus size={18} />
            Initialize Project
          </motion.button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {[
          { icon: Briefcase, label: 'Active Projects', value: projects.filter(p => p.status === 'Active').length, color: 'text-blue-500' },
          { icon: Clock, label: 'Ongoing RAP', value: 'Rp 6.2B', color: 'text-sgd-gold' },
          { icon: CheckCircle2, label: 'Completed sites', value: projects.filter(p => p.status === 'Completed').length, color: 'text-emerald-500' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[32px] border border-slate-100 flex items-center gap-6">
            <div className={`w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter & Search */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <input 
            type="text" 
            placeholder="Search project by name..."
            className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sgd-gold/10 focus:border-sgd-gold transition-all text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="w-12 h-12 flex items-center justify-center bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 transition-all shadow-sm">
          <Filter size={18} />
        </button>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} delay={idx * 0.1} />
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-32 bg-slate-50/50 rounded-[40px] border border-dashed border-slate-200">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-200 mb-6 shadow-sm">
            <AlertCircle size={40} />
          </div>
          <p className="text-xl font-black text-slate-900 tracking-tight">No projects found</p>
          <p className="text-sm text-slate-400 font-medium mt-1">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
