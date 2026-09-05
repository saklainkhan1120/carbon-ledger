'use client'

import { AdminTablePage } from '@/components/admin-table-page'

const AUDIT_ROWS = [
  ['GHG Report Certified (SHA-256)', 'Dr. Tariq Al Mansoori', 'Al Noor Manufacturing LLC', '03 Sep 2026 · 11:20 AM', 'Success', '0x8f4c...67c8'],
  ['Emission Factor Published (DEWA v2025.2)', 'Sarah Ahmed (Super Admin)', 'Platform Registry', '03 Sep 2026 · 08:30 AM', 'Success', '0x19a2...98c1'],
  ['Tenant Workspace Created', 'Sarah Ahmed', 'Apex Steel Industries FZC', '02 Sep 2026 · 04:15 PM', 'Success', '0x44f1...29d0'],
  ['Role Escalation: Reviewer to Admin', 'Omar Rahman', 'Gulf Horizon Properties PJSC', '02 Sep 2026 · 02:18 PM', 'Success', '0x77c9...88a2'],
  ['Failed Sign-In Attempt (Invalid Token)', 'Unknown IP (185.220.101.4)', 'Mira Logistics & Marine FZCO', '02 Sep 2026 · 01:04 PM', 'Blocked', '0x0000...0000'],
  ['Billing Subscription Upgraded to Enterprise', 'Stripe Webhook', 'Gulf Horizon Properties PJSC', '01 Sep 2026 · 10:12 AM', 'Success', '0xbb21...3104'],
]

export default function AuditLogAdminPage() {
  return (
    <AdminTablePage
      eyebrow="Security & Provenance"
      title="Platform Security Audit Log"
      description="Immutable cryptographic record of critical platform mutations, factor updates, and verification events."
      columns={['Audit Event', 'Actor Identity', 'Target Entity / Scope', 'Timestamp', 'Result', 'Tx Hash']}
      rows={AUDIT_ROWS}
      action="Log System Event"
    />
  )
}
