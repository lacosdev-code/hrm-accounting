import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LoginPage from './pages/LoginPage';
import Sidebar from './layouts/Sidebar';
import Topbar from './layouts/Topbar';
import HrmDashboard from './pages/HrmDashboard';
import AccountingDashboard from './pages/AccountingDashboard';
import GroupOverview from './pages/GroupOverview';
import EmployeesPage from './pages/EmployeesPage';
import TransactionsPage from './pages/TransactionsPage';
import ProjectsPage from './pages/ProjectsPage';
import AttendancePage from './pages/AttendancePage';
import LeaveApprovalPage from './pages/LeaveApprovalPage';
import PayrollPage from './pages/PayrollPage';

const Layout = ({ 
  children, 
  activeMenu, 
  handleMenuClick, 
  moduleMode, 
  handleModuleChange, 
  sidebarOpen, 
  setSidebarOpen,
  location,
  navigate
}) => (
  <div className="flex h-screen bg-[#F8FBFF] overflow-hidden">
    <Sidebar 
      activeMenu={activeMenu} 
      setActiveMenu={handleMenuClick} 
      currentMode={moduleMode}
      onModeChange={handleModuleChange}
      onLogout={() => navigate('/')}
      isOpen={sidebarOpen}
      setIsOpen={setSidebarOpen}
    />
    
    {sidebarOpen && (
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={() => setSidebarOpen(false)}
      />
    )}

    <div className="flex-1 flex flex-col min-w-0">
      <Topbar 
        onSwitch={() => handleModuleChange(moduleMode === 'HRM' ? 'Accounting' : 'HRM')} 
        currentMode={moduleMode}
        onMenuClick={() => setSidebarOpen(true)}
      />
      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  </div>
);

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [moduleMode, setModuleMode] = useState('HRM');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    if (path === '/admin/dashboard') {
      setModuleMode('HRM');
      setActiveMenu('Dashboard');
    } else if (path === '/accounting/dashboard') {
      setModuleMode('Accounting');
      setActiveMenu('Dashboard');
    }
  }, [location]);

  const handleModuleChange = (newMode) => {
    setModuleMode(newMode);
    setActiveMenu('Dashboard');
    if (newMode === 'HRM') navigate('/admin/dashboard');
    else if (newMode === 'Accounting') navigate('/accounting/dashboard');
    else if (newMode === 'Projects') navigate('/projects/dashboard');
  };

  const handleMenuClick = (label) => {
    setActiveMenu(label);
    if (label === 'SGD Accounting') {
      handleModuleChange('Accounting');
      return;
    }
    
    if (moduleMode === 'HRM') {
      if (label === 'Dashboard') navigate('/admin/dashboard');
      if (label === 'Employee Management') navigate('/admin/employees');
      if (label === 'Attendance Management') navigate('/admin/attendance');
      if (label === 'Leave') navigate('/admin/leave');
      if (label === 'Payroll System') navigate('/admin/payroll');
    } else if (moduleMode === 'Accounting') {
      if (label === 'Dashboard') navigate('/accounting/dashboard');
      if (label === 'Pendapatan' || label === 'Pengeluaran') navigate('/accounting/transactions');
      if (label === 'Perbankan' || label === 'Laporan') navigate('/accounting/dashboard'); 
      if (label === 'Projects') navigate('/projects/dashboard');
    }
  };

  const renderLayout = (component) => (
    <Layout 
      activeMenu={activeMenu}
      handleMenuClick={handleMenuClick}
      moduleMode={moduleMode}
      handleModuleChange={handleModuleChange}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      location={location}
      navigate={navigate}
    >
      {component}
    </Layout>
  );

  return (
    <Routes>
      <Route path="/" element={<LoginPage onLogin={(target) => navigate(target === 'accounting' ? '/accounting/dashboard' : '/admin/dashboard')} />} />
      <Route path="/group/overview" element={renderLayout(<GroupOverview />)} />
      <Route path="/admin/dashboard" element={renderLayout(<HrmDashboard />)} />
      <Route path="/admin/employees" element={renderLayout(<EmployeesPage />)} />
      <Route path="/admin/attendance" element={renderLayout(<AttendancePage />)} />
      <Route path="/admin/leave" element={renderLayout(<LeaveApprovalPage />)} />
      <Route path="/admin/payroll" element={renderLayout(<PayrollPage />)} />
      <Route path="/accounting/dashboard" element={renderLayout(<AccountingDashboard onSwitchToHrm={() => handleModuleChange('HRM')} />)} />
      <Route path="/accounting/transactions" element={renderLayout(<TransactionsPage />)} />
      <Route path="/projects/dashboard" element={renderLayout(<ProjectsPage />)} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
