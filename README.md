# 🌿 Carbyn (UAE) — Enterprise Carbon Accounting & ESG Compliance Platform

> **UAE Federal Decree-Law No. 11 of 2024 & Cabinet Resolution 67/2024 Aligned GHG Compliance Platform**  
> Empowering UAE enterprises to calculate, audit, and disclose Scope 1, 2, and 3 greenhouse gas emissions for MOCCAE reporting and the **UAE Net Zero 2050** strategic initiative.

---

## 🇦🇪 Key Compliance & Utility Grids
Carbyn comes pre-configured with official UAE emission factors:
- **DEWA (Dubai Electricity & Water Authority)**: `0.450 kg CO₂e / kWh`
- **ADDC (Abu Dhabi Distribution Company)**: `0.420 kg CO₂e / kWh`
- **SEWA (Sharjah Electricity & Water Authority)**: `0.470 kg CO₂e / kWh`
- **FEWA / Etihad WE (Northern Emirates)**: `0.450 kg CO₂e / kWh`
- **Fuel, Logistics & Scope 1 Diesel/Petrol factors** calibrated for GCC operations.

---

## ✨ Core Features

1. **🌐 Public Carbon Studio & Estimator (`/`, `/calculator`)**:
   - Dynamic 3D ambient background & micro-animations.
   - Lead magnet carbon calculator with UAE sector presets (Construction, Logistics, Hospitality, Manufacturing).
   - Real-time UAE Mangrove offset equivalency calculations.

2. **📊 Enterprise Customer Dashboard (`/dashboard`)**:
   - **Deadline Countdown Clock**: Live ticker to the mandatory **May 30, 2026** UAE MOCCAE filing deadline.
   - **Decarbonization Sandbox Simulator**: Interactive slider to model solar adoption, fleet EV transitions, and green tariffs with forecasted savings in AED and metric tons.
   - **OCR Emissions Dropzone (`/dashboard/calculator`)**: Instant utility bill parser & manual Scope 1/2/3 activity logger.
   - **Audit-Ready History & Formula Trace (`/dashboard/history`)**: 5-year compliance timeline with mathematical trace drawer for external auditors.
   - **Official MOCCAE PDF & Gold Seal Certificate Generator (`/dashboard/reports`)**: Printable ESG disclosure report complete with QR verification code and serial number.
   - **Organization & Billing Management (`/dashboard/settings`)**: Multi-currency AED invoicing and workspace customization.

3. **🛡️ Super Admin Control Center (`/admin`)**:
   - Real-time system health telemetry, compute latency monitors, and adoption metrics.
   - 6 full CRUD management tables with search, multi-filter, pagination, and CSV export:
     - Organizations Directory (`/admin/organizations`)
     - UAE Emission Factor Registry (`/admin/emission-factors`)
     - User Roles & Access Control (`/admin/users`)
     - Submitted ESG Compliance Reports (`/admin/reports`)
     - Immutable Regulatory Audit Logs (`/admin/audit-log`)
     - CMS & Policy Banner Manager (`/admin/cms`)

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI & Styling**: React 19, Tailwind CSS 4, Lucide Icons, Glassmorphism design tokens
- **Data Visualization**: Recharts
- **Database & Storage**: MongoDB (with in-memory resilience fallbacks)
- **Payments**: Stripe (AED Currency Integration)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- `pnpm` (recommended) or `npm`

### Installation
```bash
# Clone the repository
git clone https://github.com/saklainkhan1120/carbon-ledger.git

# Navigate to project directory
cd carbon-ledger

# Install dependencies
pnpm install

# Start local development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📜 License
Proprietary — Built for UAE Enterprise Compliance.
