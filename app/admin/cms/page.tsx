'use client'

import { AdminTablePage } from '@/components/admin-table-page'

const CMS_ROWS = [
  ['DEWA 2025.2 Factor Update Announcement', 'Regulatory Banner', 'Sarah Ahmed', '03 Sep 2026', 'Published', 'Global Banner'],
  ['UAE Net Zero 2050 Corporate Guide', 'Knowledge Article', 'ESG Research Team', '01 Sep 2026', 'Published', 'Help Center'],
  ['Scope 3 Desalinated Water Methodology', 'Methodology Paper', 'Dr. Tariq Al Mansoori', '28 Aug 2026', 'Published', 'Documentation'],
  ['Q3 2026 DFM ESG Disclosure Changes', 'Compliance Notice', 'Sarah Ahmed', '20 Aug 2026', 'Draft', 'Client Workspace'],
]

export default function CMSAdminPage() {
  return (
    <AdminTablePage
      eyebrow="Content & Regulatory Studio"
      title="Content Management & Notices"
      description="Manage UAE regulatory bulletins, compliance documentation, and customer notification banners."
      columns={['Content Title', 'Content Type', 'Author', 'Last Modified', 'Status', 'Channel Placement']}
      rows={CMS_ROWS}
      action="Create New Notice"
    />
  )
}
