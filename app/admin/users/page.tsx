'use client'

import { AdminTablePage } from '@/components/admin-table-page'

const USERS_ROWS = [
  ['Aisha Khan', 'Al Noor Manufacturing LLC', 'aisha.k@alnoor.ae', 'Owner (ESG Lead)', 'Today, 11:20 AM', 'Active'],
  ['Omar Rahman', 'Gulf Horizon Properties PJSC', 'omar.r@gulfhorizon.ae', 'Admin', 'Today, 09:40 AM', 'Active'],
  ['Lina Saeed', 'Mira Logistics & Marine FZCO', 'lina.s@miralogistics.ae', 'Owner', 'Yesterday', 'Active'],
  ['Marcus Chen', 'Nexa Retail Group Middle East', 'marcus.c@nexagroup.ae', 'Reviewer', '29 Aug 2026', 'Active'],
  ['Sarah Ahmed', 'Carbyn HQ', 'sarah.ahmed@carbyn.ae', 'Super Admin', 'Just now', 'Active'],
  ['Fahad Al Qasimi', 'Apex Steel Industries FZC', 'f.qasimi@apexsteel.ae', 'Owner', '3 days ago', 'Active'],
  ['Elena Rostova', 'Dubai Marina Hospitality Group', 'elena.r@marinahotels.ae', 'Admin', '1 week ago', 'Active'],
]

export default function UsersAdminPage() {
  return (
    <AdminTablePage
      eyebrow="Access Control & Security"
      title="Platform Users & RBAC Roles"
      description="Supervise client accounts, permissions, authentication security, and multi-tenant access."
      columns={['User Name', 'Organization', 'Work Email', 'Role & Scope', 'Last Activity', 'Status']}
      rows={USERS_ROWS}
      action="Invite Platform User"
    />
  )
}
