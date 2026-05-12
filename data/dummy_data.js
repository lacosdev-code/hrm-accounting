const SGD_DUMMY_DATA = {
  "hrm": {
    "company": {
      "name": "SGD Workspace HQ",
      "branches": [
        {"id": "BR-01", "name": "SGD Pusat (Jakarta)", "location": "Jakarta Selatan"},
        {"id": "BR-02", "name": "SGD Cabang (Bandung)", "location": "Bandung Kota"}
      ],
      "departments": [
        {"id": "DPT-01", "name": "IT & Engineering", "head_id": "EMP-001"},
        {"id": "DPT-02", "name": "Finance & Accounting", "head_id": "EMP-005"},
        {"id": "DPT-03", "name": "Human Resources", "head_id": "EMP-003"},
        {"id": "DPT-04", "name": "Marketing & Sales", "head_id": "EMP-007"}
      ]
    },
    "employees": [
      {
        "id": "EMP-001",
        "name": "Budi Santoso",
        "position": "Lead Engineer",
        "department_id": "DPT-01",
        "branch_id": "BR-01",
        "status": "Active",
        "join_date": "2023-01-15",
        "email": "budi.s@sgd.com",
        "phone": "+6281234567890",
        "avatar": "https://i.pravatar.cc/150?u=EMP-001"
      },
      {
        "id": "EMP-002",
        "name": "Siti Aminah",
        "position": "Frontend Developer",
        "department_id": "DPT-01",
        "branch_id": "BR-01",
        "status": "Active",
        "join_date": "2024-02-10",
        "email": "siti.a@sgd.com",
        "phone": "+6281298765432",
        "avatar": "https://i.pravatar.cc/150?u=EMP-002"
      },
      {
        "id": "EMP-005",
        "name": "Andi Darmawan",
        "position": "Finance Manager",
        "department_id": "DPT-02",
        "branch_id": "BR-01",
        "status": "Active",
        "join_date": "2022-11-01",
        "email": "andi.d@sgd.com",
        "phone": "+6281345678901",
        "avatar": "https://i.pravatar.cc/150?u=EMP-005"
      }
    ],
    "attendance": [
      {
        "id": "ATT-101",
        "employee_id": "EMP-001",
        "date": "2026-05-05",
        "check_in": "08:15:00",
        "check_out": "17:30:00",
        "status": "Present",
        "type": "Office"
      },
      {
        "id": "ATT-102",
        "employee_id": "EMP-002",
        "date": "2026-05-05",
        "check_in": "08:20:00",
        "check_out": null,
        "status": "Present",
        "type": "WFH"
      },
      {
        "id": "ATT-103",
        "employee_id": "EMP-005",
        "date": "2026-05-05",
        "check_in": null,
        "check_out": null,
        "status": "Absent",
        "type": "Leave"
      }
    ],
    "leave_requests": [
      {
        "id": "LR-001",
        "employee_id": "EMP-002",
        "type": "Annual Leave",
        "start_date": "2026-05-10",
        "end_date": "2026-05-12",
        "status": "Pending",
        "reason": "Family vacation"
      },
      {
        "id": "LR-002",
        "employee_id": "EMP-005",
        "type": "Sick Leave",
        "start_date": "2026-05-05",
        "end_date": "2026-05-06",
        "status": "Approved",
        "reason": "Fever and flu"
      }
    ],
    "projects": [
      {
        "id": "PRJ-001",
        "name": "SGD Mobile App Development",
        "client": "Internal",
        "status": "In Progress",
        "progress_percentage": 65,
        "deadline": "2026-08-30",
        "team": ["EMP-001", "EMP-002"]
      }
    ]
  },
  "accounting": {
    "summary": {
      "total_kas_bank": 235000000,
      "total_piutang": 125000000,
      "total_hutang": 45000000,
      "modal_prive": 500000000
    },
    "accounts": [
      {"id": "ACC-100", "code": "100-01", "name": "Kas Kecil", "type": "Asset", "balance": 5000000},
      {"id": "ACC-101", "code": "100-02", "name": "Bank BCA", "type": "Asset", "balance": 150000000},
      {"id": "ACC-102", "code": "100-03", "name": "Bank Mandiri", "type": "Asset", "balance": 80000000},
      {"id": "ACC-400", "code": "400-01", "name": "Pendapatan Proyek IT", "type": "Revenue", "balance": 350000000},
      {"id": "ACC-500", "code": "500-01", "name": "Biaya Gaji Karyawan", "type": "Expense", "balance": 125000000},
      {"id": "ACC-501", "code": "500-02", "name": "Biaya Sewa Server", "type": "Expense", "balance": 15000000}
    ],
    "transactions": [
      {
        "id": "TRX-1001",
        "date": "2026-05-01",
        "description": "Pembayaran Termin 1 Proyek XYZ",
        "account_id": "ACC-101",
        "type": "Income",
        "amount": 75000000,
        "status": "Completed"
      },
      {
        "id": "TRX-1002",
        "date": "2026-05-02",
        "description": "Pembayaran Listrik & Internet",
        "account_id": "ACC-100",
        "type": "Expense",
        "amount": 2500000,
        "status": "Completed"
      },
      {
        "id": "TRX-1003",
        "date": "2026-05-04",
        "description": "Invoice Hosting AWS",
        "account_id": "ACC-101",
        "type": "Expense",
        "amount": 5000000,
        "status": "Pending"
      }
    ],
    "invoices": [
      {
        "id": "INV-2026-05-001",
        "client_name": "PT Retail Jaya Makmur",
        "date": "2026-05-04",
        "due_date": "2026-06-04",
        "amount": 125000000,
        "status": "Unpaid",
        "items": [
          {"description": "Pengembangan Sistem Gudang", "quantity": 1, "price": 100000000},
          {"description": "Maintenance Tahunan", "quantity": 1, "price": 25000000}
        ]
      }
    ],
    "budgets": [
      {
        "id": "BGT-2026",
        "department_id": "DPT-01",
        "name": "Anggaran IT Q2 2026",
        "total_budget": 500000000,
        "used_amount": 140000000,
        "status": "Active"
      }
    ],
    "vendors": [
      {
        "id": "VND-001",
        "name": "Amazon Web Services",
        "service": "Cloud Hosting",
        "contact": "billing@aws.com",
        "active_contracts": 1
      }
    ]
  }
}
;
