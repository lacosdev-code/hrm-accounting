import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Sidebar from './layouts/Sidebar';
import Topbar from './layouts/Topbar';
import HrmDashboard from './pages/HrmDashboard';
import AccountingDashboard from './pages/AccountingDashboard';
import EmployeesPage from './pages/EmployeesPage';
import TransactionsPage from './pages/TransactionsPage';
import ProjectsPage from './pages/ProjectsPage';
import AttendancePage from './pages/AttendancePage';
import LeaveApprovalPage from './pages/LeaveApprovalPage';
import PayrollPage from './pages/PayrollPage';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [moduleMode, setModuleMode] = useState('HRM');

  // Sync menu state based on URL
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
    } else if (moduleMode === 'Projects') {
      if (label === 'Dashboard') navigate('/projects/dashboard');
    }
  };

  const Layout = ({ children }) => (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar 
        activeMenu={activeMenu} 
        setActiveMenu={handleMenuClick} 
        currentMode={moduleMode}
        onModeChange={handleModuleChange}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar 
          onSwitch={() => handleModuleChange(moduleMode === 'HRM' ? 'Accounting' : 'HRM')} 
          currentMode={moduleMode}
        />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={<LoginPage onLogin={(target) => navigate(target === 'accounting' ? '/accounting/dashboard' : '/admin/dashboard')} />} />
      
      {/* Admin / HRM Routes */}
      <Route path="/admin/dashboard" element={<Layout><HrmDashboard /></Layout>} />
      <Route path="/admin/employees" element={<Layout><EmployeesPage /></Layout>} />
      <Route path="/admin/attendance" element={<Layout><AttendancePage /></Layout>} />
      <Route path="/admin/leave" element={<Layout><LeaveApprovalPage /></Layout>} />
      <Route path="/admin/payroll" element={<Layout><PayrollPage /></Layout>} />
      
      {/* Accounting Routes */}
      <Route path="/accounting/dashboard" element={<Layout><AccountingDashboard onSwitchToHrm={() => handleModuleChange('HRM')} /></Layout>} />
      <Route path="/accounting/transactions" element={<Layout><TransactionsPage /></Layout>} />
      
      {/* Projects Routes */}
      <Route path="/projects/dashboard" element={<Layout><ProjectsPage /></Layout>} />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
