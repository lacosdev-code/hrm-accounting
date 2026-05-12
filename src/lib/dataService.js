import { supabase } from './supabase';

/**
 * SGD Workspace — Smart Data Service
 * Menggunakan Supabase jika tersedia, fallback ke Dummy Data jika tidak.
 */

// ==================== DUMMY DATA ====================

const DUMMY_EMPLOYEES = [
  { id: 1, name: 'Rafie Akbar', role: 'Project Manager', dept: 'Engineering', email: 'rafie@sgd.id', status: 'Active', join_date: '2024-01-15' },
  { id: 2, name: 'Dewi Sartika', role: 'HR Manager', dept: 'HRM', email: 'dewi@sgd.id', status: 'Active', join_date: '2023-06-01' },
  { id: 3, name: 'Budi Santoso', role: 'Site Engineer', dept: 'Engineering', email: 'budi@sgd.id', status: 'Active', join_date: '2024-03-10' },
  { id: 4, name: 'Siti Nurhaliza', role: 'Accountant', dept: 'Finance', email: 'siti@sgd.id', status: 'Active', join_date: '2023-09-20' },
  { id: 5, name: 'Ahmad Fauzi', role: 'Surveyor', dept: 'Engineering', email: 'ahmad@sgd.id', status: 'Active', join_date: '2024-07-05' },
  { id: 6, name: 'Rina Wati', role: 'Admin Staff', dept: 'General', email: 'rina@sgd.id', status: 'Active', join_date: '2024-02-14' },
  { id: 7, name: 'Joko Widodo', role: 'Foreman', dept: 'Engineering', email: 'joko@sgd.id', status: 'On Leave', join_date: '2023-11-01' },
  { id: 8, name: 'Maya Sari', role: 'Finance Staff', dept: 'Finance', email: 'maya@sgd.id', status: 'Active', join_date: '2024-05-18' },
  { id: 9, name: 'Hendra Gunawan', role: 'Heavy Equipment Op.', dept: 'Engineering', email: 'hendra@sgd.id', status: 'Active', join_date: '2024-04-22' },
  { id: 10, name: 'Lestari Putri', role: 'Procurement', dept: 'Purchasing', email: 'lestari@sgd.id', status: 'Active', join_date: '2024-08-01' },
];

const DUMMY_TRANSACTIONS = [
  { id: 1, date: '2026-05-10', description: 'Pembayaran Semen 200 Sak', type: 'out', amount: 24000000, category: 'Material', projects: { name: 'Jembatan Cisadane' } },
  { id: 2, date: '2026-05-09', description: 'Invoice #INV-042 Klien A', type: 'in', amount: 150000000, category: 'Project Payment', projects: { name: 'Gedung Kantor Serpong' } },
  { id: 3, date: '2026-05-08', description: 'Gaji Karyawan Mei 2026', type: 'out', amount: 85000000, category: 'Payroll', projects: null },
  { id: 4, date: '2026-05-07', description: 'Sewa Excavator 3 Hari', type: 'out', amount: 18000000, category: 'Equipment', projects: { name: 'Jembatan Cisadane' } },
  { id: 5, date: '2026-05-06', description: 'Invoice #INV-041 Klien B', type: 'in', amount: 220000000, category: 'Project Payment', projects: { name: 'Perumahan Green Valley' } },
  { id: 6, date: '2026-05-05', description: 'Pembelian Besi Beton 5 Ton', type: 'out', amount: 67500000, category: 'Material', projects: { name: 'Gedung Kantor Serpong' } },
  { id: 7, date: '2026-05-04', description: 'BBM & Transportasi', type: 'out', amount: 4200000, category: 'Operational', projects: null },
  { id: 8, date: '2026-05-03', description: 'Invoice #INV-040 Klien C', type: 'in', amount: 95000000, category: 'Project Payment', projects: { name: 'Jembatan Cisadane' } },
];

const DUMMY_LEAVE_REQUESTS = [
  { id: 1, employee_id: 7, employees: { name: 'Joko Widodo' }, type: 'Cuti Tahunan', start_date: '2026-05-12', end_date: '2026-05-16', status: 'Pending', reason: 'Acara keluarga di kampung' },
  { id: 2, employee_id: 3, employees: { name: 'Budi Santoso' }, type: 'Sakit', start_date: '2026-05-10', end_date: '2026-05-11', status: 'Pending', reason: 'Demam dan flu' },
  { id: 3, employee_id: 6, employees: { name: 'Rina Wati' }, type: 'Izin', start_date: '2026-05-14', end_date: '2026-05-14', status: 'Pending', reason: 'Mengurus dokumen penting' },
];

const DUMMY_PROJECTS = [
  { id: 1, name: 'Pembangunan Jembatan Cisadane', location: 'Tangerang, Banten', status: 'In Progress', start_date: '2025-11-01', end_date: '2026-08-30', progress: 62, totalPlanned: 4500000000, totalSpent: 2790000000, budgets: [] },
  { id: 2, name: 'Gedung Kantor Serpong', location: 'BSD City, Tangerang Selatan', status: 'In Progress', start_date: '2026-01-15', end_date: '2026-12-31', progress: 35, totalPlanned: 12000000000, totalSpent: 4200000000, budgets: [] },
  { id: 3, name: 'Perumahan Green Valley', location: 'Bogor, Jawa Barat', status: 'Planning', start_date: '2026-06-01', end_date: '2027-06-01', progress: 8, totalPlanned: 25000000000, totalSpent: 2000000000, budgets: [] },
  { id: 4, name: 'Renovasi Masjid Al-Ikhlas', location: 'Depok, Jawa Barat', status: 'Completed', start_date: '2025-08-01', end_date: '2026-03-15', progress: 100, totalPlanned: 800000000, totalSpent: 785000000, budgets: [] },
];

const DUMMY_ATTENDANCE = [
  { id: 1, employee_id: 1, date: '2026-05-10', status: 'Present', clock_in: '07:45', clock_out: '17:15', employees: { name: 'Rafie Akbar', role: 'Project Manager', dept: 'Engineering' } },
  { id: 2, employee_id: 2, date: '2026-05-10', status: 'Present', clock_in: '08:00', clock_out: '17:00', employees: { name: 'Dewi Sartika', role: 'HR Manager', dept: 'HRM' } },
  { id: 3, employee_id: 3, date: '2026-05-10', status: 'Present', clock_in: '07:30', clock_out: '17:30', employees: { name: 'Budi Santoso', role: 'Site Engineer', dept: 'Engineering' } },
  { id: 4, employee_id: 4, date: '2026-05-10', status: 'Present', clock_in: '08:10', clock_out: '17:05', employees: { name: 'Siti Nurhaliza', role: 'Accountant', dept: 'Finance' } },
  { id: 5, employee_id: 7, date: '2026-05-10', status: 'Leave', clock_in: null, clock_out: null, employees: { name: 'Joko Widodo', role: 'Foreman', dept: 'Engineering' } },
];

// ==================== SMART FALLBACK HELPER ====================

async function smartFetch(supabaseQuery, fallbackData) {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (!supabaseUrl) return fallbackData;

    const { data, error } = await supabaseQuery();
    if (error) throw error;
    return data && data.length > 0 ? data : fallbackData;
  } catch (err) {
    console.warn('⚠️ Supabase unreachable, using dummy data:', err.message);
    return fallbackData;
  }
}

// ==================== HRM SERVICE ====================

export const hrmService = {
  getEmployees: () => smartFetch(
    () => supabase.from('employees').select('*').order('name'),
    DUMMY_EMPLOYEES
  ),

  getAttendanceStats: async () => {
    const data = await smartFetch(
      () => supabase.from('attendance').select('date, status'),
      DUMMY_ATTENDANCE
    );
    const stats = data.reduce((acc, curr) => {
      const date = curr.date;
      if (!acc[date]) acc[date] = { name: date, hadir: 0, izin: 0, sakit: 0 };
      if (curr.status === 'Present') acc[date].hadir++;
      else if (curr.status === 'Leave') acc[date].izin++;
      else if (curr.status === 'Sick') acc[date].sakit++;
      return acc;
    }, {});
    return Object.values(stats).sort((a, b) => new Date(a.name) - new Date(b.name));
  },

  getLeaveRequests: () => smartFetch(
    () => supabase.from('leave_requests').select('*, employees(name)').eq('status', 'Pending'),
    DUMMY_LEAVE_REQUESTS
  ),
};

// ==================== ACCOUNTING SERVICE ====================

export const accountingService = {
  getTransactions: (limit = 100) => smartFetch(
    () => supabase.from('transactions').select('*, projects(name)').order('date', { ascending: false }).limit(limit),
    DUMMY_TRANSACTIONS
  ),

  getStats: async () => {
    const txns = await smartFetch(
      () => supabase.from('transactions').select('type, amount'),
      DUMMY_TRANSACTIONS
    );
    const summary = txns.reduce((acc, curr) => {
      if (curr.type === 'in') acc.revenue += curr.amount;
      else acc.expense += curr.amount;
      return acc;
    }, { revenue: 0, expense: 0 });

    return {
      balance: `Rp ${(summary.revenue - summary.expense).toLocaleString('id-ID')}`,
      income: `Rp ${summary.revenue.toLocaleString('id-ID')}`,
      expense: `Rp ${summary.expense.toLocaleString('id-ID')}`,
    };
  },

  getCashFlowStats: async () => {
    const data = await smartFetch(
      () => supabase.from('transactions').select('date, type, amount'),
      DUMMY_TRANSACTIONS
    );
    const stats = data.reduce((acc, curr) => {
      const month = new Date(curr.date).toLocaleString('id-ID', { month: 'short' });
      if (!acc[month]) acc[month] = { name: month, masuk: 0, keluar: 0 };
      if (curr.type === 'in') acc[month].masuk += curr.amount;
      else acc[month].keluar += curr.amount;
      return acc;
    }, {});
    return Object.values(stats);
  },
};

// ==================== PROJECT SERVICE ====================

export const projectService = {
  getProjects: () => smartFetch(
    async () => {
      const { data, error } = await supabase.from('projects').select('*, budgets(planned_amount, actual_spent)');
      if (error) throw error;
      return data.map(prj => {
        const totalPlanned = prj.budgets?.reduce((sum, b) => sum + b.planned_amount, 0) || 0;
        const totalSpent = prj.budgets?.reduce((sum, b) => sum + b.actual_spent, 0) || 0;
        return { ...prj, progress: totalPlanned > 0 ? Math.min(Math.round((totalSpent / totalPlanned) * 100), 100) : 0, totalPlanned, totalSpent };
      });
    },
    DUMMY_PROJECTS
  ),
};

// ==================== ATTENDANCE SERVICE ====================

export const attendanceService = {
  getDetailedLogs: () => smartFetch(
    () => supabase.from('attendance').select('*, employees(name, role, dept)').order('date', { ascending: false }),
    DUMMY_ATTENDANCE
  ),
};
