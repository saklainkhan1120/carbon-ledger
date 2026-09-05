'use client'

import { AdminTablePage } from '@/components/admin-table-page'

const REPORTS_ROWS = [
  ['FY 2025 Comprehensive Carbon Footprint', 'Al Noor Manufacturing LLC', 'GHG Protocol Corporate', '1,248.6 tCO₂e', '03 Sep 2026', 'Certified'],
  ['Q3 2025 Decarbonization Progress', 'Al Noor Manufacturing LLC', 'UAE Net Zero 2050', '286.4 tCO₂e', '12 Jul 2026', 'Certified'],
  ['FY 2025 ESG Baseline Disclosure', 'Gulf Horizon Properties PJSC', 'DFM / ADX ESG Guide', '842.2 tCO₂e', '02 Sep 2026', 'Pending Verification'],
  ['FY 2025 Logistics Carbon Inventory', 'Mira Logistics & Marine FZCO', 'ISO 14064-1', '2,104.7 tCO₂e', '01 Sep 2026', 'Review Needed'],
  ['FY 2024 Baseline GHG Inventory', 'Nexa Retail Group Middle East', 'DFM / ADX ESG Guide', '596.8 tCO₂e', '29 Aug 2026', 'Certified'],
]

export default function ReportsAdminPage() {
  return (
    <AdminTablePage
      eyebrow="Compliance Operations"
      title="Global ESG Disclosure Queue"
      description="Review submitted tenant GHG reports, audit methodology compliance, and issue cryptographic certificates."
      columns={['Report Title', 'Tenant Organization', 'Accounting Framework', 'Gross Emissions', 'Submission Date', 'Status']}
      rows={REPORTS_ROWS}
      action="Queue Report"
    />
  )
}
