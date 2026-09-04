'use client'

import { AdminTablePage } from '@/components/admin-table-page'

const ORG_ROWS = [
  ['Al Noor Manufacturing LLC', 'Aisha Khan', 'Professional', '1,248.6 tCO₂e', 'Active', '98%'],
  ['Gulf Horizon Properties PJSC', 'Omar Rahman', 'Enterprise', '842.2 tCO₂e', 'Active', '94%'],
  ['Mira Logistics & Marine FZCO', 'Lina Saeed', 'Professional', '2,104.7 tCO₂e', 'Review Needed', '72%'],
  ['Nexa Retail Group Middle East', 'Marcus Chen', 'Starter', '596.8 tCO₂e', 'Active', '89%'],
  ['Emirates Tech Solutions FZ-LLC', 'Zaid Al Hashimi', 'Starter', '148.2 tCO₂e', 'Active', '99%'],
  ['Apex Steel Industries FZC', 'Fahad Al Qasimi', 'Enterprise', '3,450.0 tCO₂e', 'Active', '91%'],
  ['Dubai Marina Hospitality Group', 'Elena Rostova', 'Professional', '1,120.4 tCO₂e', 'Active', '96%'],
  ['Etihad Logistics & Cargo PJSC', 'Khalid Al Nuaimi', 'Enterprise', '4,890.2 tCO₂e', 'Active', '95%'],
]

export default function OrganizationsAdminPage() {
  return (
    <AdminTablePage
      eyebrow="Tenant Directory"
      title="UAE Organizations"
      description="Manage enterprise customer workspaces, subscription tiers, and audit-readiness health scores."
      columns={['Organization Name', 'Primary Owner', 'Subscription Plan', 'Emissions (tCO₂e)', 'Status', 'Audit Score']}
      rows={ORG_ROWS}
      action="Add Organization"
      onActionClick={() => alert('Add Organization Modal')}
    />
  )
}
