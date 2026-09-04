'use client'

import { AdminTablePage } from '@/components/admin-table-page'
import { UAE_EMISSION_FACTORS } from '@/lib/emission-factors'

export default function FactorsAdminPage() {
  const rows = UAE_EMISSION_FACTORS.map((f) => [
    f.name,
    f.category,
    f.region,
    `${f.factor} kg/${f.unit}`,
    `v${f.version}`,
    f.status,
  ])

  return (
    <AdminTablePage
      eyebrow="GHG Data Governance"
      title="UAE Emission Factors Registry"
      description="Version, publish, and audit regional carbon factors used across every tenant calculation."
      columns={['Emission Factor Name', 'Scope Category', 'Geographic Region', 'Factor Value', 'Version', 'Status']}
      rows={rows}
      action="Publish New Factor"
      onActionClick={() => alert('New Emission Factor publishing wizard')}
    />
  )
}
