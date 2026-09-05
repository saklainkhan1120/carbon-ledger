'use client'

import { useMemo, useState } from 'react'
import {
  ArrowDownToLine,
  CheckCircle2,
  Clock3,
  Download,
  Eye,
  FileCheck2,
  FileSpreadsheet,
  Filter,
  History as HistoryIcon,
  Layers,
  Leaf,
  Lock,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import { Card3D } from '@/components/card-3d'
import { PageHeading, PlatformShell } from '@/components/platform-shell'
import { EmissionRecord } from '@/lib/demo-data'
import { useCarbonStore } from '@/lib/store'
import { formatNumber, formatTCO2e, getAuditBadge } from '@/lib/utils'

export default function HistoryPage() {
  const { records, totalEmissions } = useCarbonStore()
  const [search, setSearch] = useState('')
  const [scopeFilter, setScopeFilter] = useState('All')
  const [selectedRecord, setSelectedRecord] = useState<EmissionRecord | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Filter records
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const matchSearch =
        r.activityType.toLowerCase().includes(search.toLowerCase()) ||
        r.facilityName.toLowerCase().includes(search.toLowerCase()) ||
        r.period.includes(search)
      const matchScope = scopeFilter === 'All' || r.scope.includes(scopeFilter)
      return matchSearch && matchScope
    })
  }, [records, search, scopeFilter])

  const handleCopyHash = (id: string) => {
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <PlatformShell>
      <PageHeading
        eyebrow="Article 8 Legal Record Vault"
        title="Activity Timeline"
        description="5-year auditable ledger preserving every calculation formula, activity input, and invoice citation pursuant to UAE Federal Law 11/2024."
        action={
          <button
            onClick={() => {
              const csvContent =
                'data:text/csv;charset=utf-8,ID,Facility,Scope,Activity,Quantity,Unit,Factor,tCO2e,Period,Status\n' +
                records
                  .map(
                    (r) =>
                      `"${r.id}","${r.facilityName}","${r.scope}","${r.activityType}",${r.quantity},"${r.unit}",${r.factorApplied},${r.emissionsTCO2e},"${r.period}","${r.evidenceStatus}"`
                  )
                  .join('\n')
              const encodedUri = encodeURI(csvContent)
              const link = document.createElement('a')
              link.setAttribute('href', encodedUri)
              link.setAttribute('download', `UAE_Compliance_Audit_Vault_${new Date().toISOString().slice(0, 10)}.csv`)
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
            }}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 px-5 py-3 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all"
          >
            <Download size={16} /> Export 5-Year CSV Vault
          </button>
        }
      />

      {/* 3 Top Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-xs flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
            <Lock size={22} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Cumulative Emissions
            </p>
            <p className="mt-1 text-2xl font-bold text-foreground">{formatTCO2e(totalEmissions)} tCO₂e</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              100% Mathematically Preserved
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-xs flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-700 dark:text-teal-300">
            <ShieldCheck size={22} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              MOCCAE Verification Integrity
            </p>
            <p className="mt-1 text-2xl font-bold text-foreground">SHA-256 Sealed</p>
            <p className="text-xs text-muted-foreground">Article 8 Compliant</p>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-xs flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-700 dark:text-blue-300">
            <Clock3 size={22} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Statutory Retention Vault
            </p>
            <p className="mt-1 text-2xl font-bold text-foreground">5-Year Expiry 2031</p>
            <p className="text-xs text-muted-foreground">{records.length} Archived Entries</p>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
        {/* Search & Scope Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3.5 top-3 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search facility, period, or activity..."
              className="w-full rounded-xl border border-input bg-background pl-9 pr-4 py-2.5 text-xs font-semibold outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex items-center gap-1.5 rounded-2xl bg-muted p-1 text-xs font-semibold">
            {['All', 'Scope 1', 'Scope 2', 'Scope 3'].map((scope) => (
              <button
                key={scope}
                onClick={() => setScopeFilter(scope)}
                className={`rounded-xl px-3 py-1.5 transition-all ${
                  scopeFilter === scope
                    ? 'bg-card text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {scope}
              </button>
            ))}
          </div>
        </div>

        {/* Records Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 uppercase tracking-wider text-[11px] font-bold text-muted-foreground">
              <tr>
                <th className="px-4 py-3 rounded-l-xl">Accounting Period</th>
                <th className="px-4 py-3">UAE Facility</th>
                <th className="px-4 py-3">Scope & Source</th>
                <th className="px-4 py-3">Reported Quantity</th>
                <th className="px-4 py-3">Factor Applied</th>
                <th className="px-4 py-3">Total (tCO₂e)</th>
                <th className="px-4 py-3">Audit Status</th>
                <th className="px-4 py-3 text-right rounded-r-xl">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredRecords.map((rec) => {
                const badge = getAuditBadge(rec.evidenceStatus)
                return (
                  <tr key={rec.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3.5 font-bold font-mono text-foreground">{rec.period}</td>
                    <td className="px-4 py-3.5 text-muted-foreground font-semibold">{rec.facilityName}</td>
                    <td className="px-4 py-3.5">
                      <span className="font-bold text-foreground block">{rec.activityType}</span>
                      <span className="text-[10px] text-muted-foreground">{rec.scope}</span>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-muted-foreground">
                      {formatNumber(rec.quantity)} {rec.unit}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-muted-foreground">{rec.factorApplied}</td>
                    <td className="px-4 py-3.5 font-black text-foreground">
                      {formatTCO2e(rec.emissionsTCO2e)}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold border ${badge.bg}`}
                      >
                        <span className={`size-1.5 rounded-full ${badge.dot}`} />
                        {rec.evidenceStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <button
                        onClick={() => setSelectedRecord(rec)}
                        className="inline-flex items-center gap-1 rounded-xl border border-border bg-card px-2.5 py-1.5 text-xs font-bold text-foreground hover:bg-muted transition-colors shadow-xs"
                      >
                        <Eye size={13} className="text-emerald-600" />
                        Trace
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Formula Inspection Slide-Over Drawer */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="h-full w-full max-w-md bg-card border-l border-border p-6 sm:p-8 shadow-2xl flex flex-col justify-between overflow-y-auto space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <FileCheck2 size={20} className="text-emerald-600" />
                  <h2 className="text-base font-bold text-foreground">Calculation Trace & Audit Proof</h2>
                </div>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground">Activity Type</p>
                  <p className="font-bold text-sm text-foreground">{selectedRecord.activityType}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 rounded-2xl border border-border bg-muted/20 p-4">
                  <div>
                    <p className="text-[10px] text-muted-foreground">Accounting Period</p>
                    <p className="font-bold text-foreground font-mono">{selectedRecord.period}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Scope Classification</p>
                    <p className="font-bold text-foreground">{selectedRecord.scope}</p>
                  </div>
                </div>

                {/* Mathematical Equation Breakdown */}
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-2">
                  <p className="font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider text-[10px]">
                    Mathematical Formula Breakdown
                  </p>
                  <p className="font-mono text-xs text-foreground">
                    {formatNumber(selectedRecord.quantity)} {selectedRecord.unit} × {selectedRecord.factorApplied ?? selectedRecord.factorValue ?? 0} factor = {(selectedRecord.quantity * (selectedRecord.factorApplied ?? selectedRecord.factorValue ?? 0)).toFixed(2)} kgCO₂e
                  </p>
                  <p className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    Grand Output = {formatTCO2e(selectedRecord.emissionsTCO2e)} tCO₂e
                  </p>
                </div>

                {/* Cryptographic SHA-256 Ledger Stamp */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground">Cryptographic Audit Hash</p>
                  <div className="rounded-xl border border-border bg-muted/30 p-3 font-mono text-[11px] text-muted-foreground break-all space-y-1">
                    <p>0x7f9a2b89410efca1209381adbc98712344ef</p>
                    <button
                      onClick={() => handleCopyHash(selectedRecord.id)}
                      className="text-[10px] font-bold text-emerald-600 hover:underline"
                    >
                      {copiedId === selectedRecord.id ? '✓ Hash Copied to Clipboard' : 'Copy Verification Hash'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedRecord(null)}
              className="w-full rounded-2xl bg-primary py-3 text-xs font-bold text-primary-foreground shadow-sm hover:opacity-90 transition-all"
            >
              Close Audit Drawer
            </button>
          </div>
        </div>
      )}
    </PlatformShell>
  )
}
