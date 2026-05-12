
export const HRM_DUMMY_DATA = {
  stats: [
    { label: 'ACTIVE EMPLOYEE', value: '42', sub: 'Registered and active' },
    { label: 'ACTIVE DEPARTMENT', value: '8', sub: 'Organization structure' },
    { label: 'HOLIDAY', value: '12', sub: 'Current year calendar' },
  ],
  attendanceStats: [
    { label: 'PAID LEAVE QUOTA', value: '240', sub: 'Total company allocation' },
    { label: 'PENDING LEAVE', value: '5', sub: 'Needs follow-up' },
    { label: 'ON LEAVE (THIS MONTH)', value: '3', sub: 'Daily status' },
    { label: 'CHECK IN (TODAY)', value: '38', sub: 'Checked in users', progress: true, progressVal: 90 },
    { label: 'CHECK OUT (TODAY)', value: '12', sub: 'End of workday', progress: true, progressVal: 30 },
    { label: 'NOT CHECKED IN', value: '4', sub: "Today's estimate" },
  ],
  recentActivity: [
    { id: 1, type: 'checkin', user: 'Budi Santoso', time: '08:00 AM', status: 'On Time' },
    { id: 2, type: 'leave', user: 'Siti Aminah', time: '09:15 AM', status: 'Sick Leave' },
    { id: 3, type: 'checkout', user: 'Andi Wijaya', time: '05:00 PM', status: 'Finished' },
  ]
};

export const ACCOUNTING_DUMMY_DATA = {
  hubItems: [
    { title: 'Aset & Depresiasi', val: '24', meta: 'Aset aktif: 24 | Depresiasi: Rp12.5M', type: 'box' },
    { title: 'Modal & Prive', val: 'Rp450.0M', meta: '+Rp15.0M bulan ini', type: 'wallet' },
    { title: 'Rekonsiliasi Bank', val: '3', meta: 'Selisih Rp0.00', type: 'refresh' },
    { title: 'Proyek', val: '12', meta: 'Project aktif: 8', type: 'briefcase' },
    { title: 'RAB', val: '45', meta: 'Dokumen disetujui: 38', type: 'clipboard' },
    { title: 'RAP', val: '42', meta: 'Dokumen disetujui: 40', type: 'check' },
    { title: 'Laporan Stok', val: '1,250', meta: 'Terjual: 450 (bulan ini)', type: 'package' },
    { title: 'Audit Cerdas', val: '0', meta: 'Semua aman', type: 'shield' },
  ],
  kpis: [
    { lbl: 'Pelanggan', val: '128', color: 'bg-blue-50 text-blue-600' },
    { lbl: 'Vendor', val: '45', color: 'bg-cyan-50 text-cyan-600' },
    { lbl: 'Invoice', val: '89', color: 'bg-amber-50 text-amber-600' },
    { lbl: 'Bill', val: '34', color: 'bg-rose-50 text-rose-600' },
  ],
  balances: [
    { bank: 'BCA', holder: 'PT. Langit Anantara', balance: 'Rp1.250.000.000', color: 'text-slate-900' },
    { bank: 'Mandiri', holder: 'Operational Account', balance: 'Rp750.500.000', color: 'text-emerald-600' },
    { bank: 'Cash', holder: 'Petty Cash HQ', balance: 'Rp25.000.000', color: 'text-slate-900' },
  ],
  financialFlow: {
    income: { today: 'Rp12.500.000', month: 'Rp450.000.000' },
    expense: { today: 'Rp8.200.000', month: 'Rp210.500.000' }
  }
};
