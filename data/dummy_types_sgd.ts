export interface Department {
  id: string;
  name: string;
  head_id: string;
}

export interface Branch {
  id: string;
  name: string;
  location: string;
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  department_id: string;
  branch_id: string;
  status: 'Active' | 'Inactive';
  join_date: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface Attendance {
  id: string;
  employee_id: string;
  date: string;
  check_in: string | null;
  check_out: string | null;
  status: 'Present' | 'Absent' | 'Late';
  type: 'Office' | 'WFH' | 'Leave';
}

export interface LeaveRequest {
  id: string;
  employee_id: string;
  type: string;
  start_date: string;
  end_date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  reason: string;
}

export interface Account {
  id: string;
  code: string;
  name: string;
  type: 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense';
  balance: number;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  account_id: string;
  type: 'Income' | 'Expense';
  amount: number;
  status: 'Completed' | 'Pending';
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: string;
  client_name: string;
  date: string;
  due_date: string;
  amount: number;
  status: 'Paid' | 'Unpaid' | 'Overdue';
  items: InvoiceItem[];
}
