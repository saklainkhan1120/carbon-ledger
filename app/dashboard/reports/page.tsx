'use client'

import { useState } from 'react'
import {
  Award,
  CheckCircle2,
  Clock3,
  Download,
  Eye,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  Filter,
  Plus,
  QrCode,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { PageHeading, PlatformShell } from '@/components/platform-shell'
import { ReportPreviewModal } from '@/components/report-preview-modal'
import { GeneratedReport } from '@/lib/demo-data'
import { useCarbonStore } from '@/lib/store'
import { formatTCO2e, getAuditBadge } from '@/lib/utils'

export default function ReportsPage() {
  const { company, reports, addReport, totalEmissions, totalScope1, totalScope2, totalScope3 } =
    useCarbonStore()

  // Modal and wizard states
  const [selectedReport, setSelectedReport] = useState<GeneratedReport | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showWizard, setShowWizard] = useState(false)
  const [submittedIds, setSubmittedIds] = useState<Record<string, boolean>>({
    'rep-2025-annual': true,
  })

  // Wizard form inputs
  const [framework, setFramework] = useState<GeneratedReport['framework']>(
    'GHG Protocol Corporate Standard'
  )
  const [reportingYear, setReportingYear] = useState('2025')
  const [includeScope3, setIncludeScope3] = useState(false)

  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

    setTimeout(() => {
      const scope3Val = includeScope3 ? totalScope3 : 0
      const totalVal = totalScope1 + totalScope2 + scope3Val

      const newRep = addReport({
        title: `UAE Federal Law 11/2024 Compliance Report — FY ${reportingYear} (MOCCAE Format)`,
        reportingYear,
        framework,
        totalEmissionsTCO2e: totalVal > 0 ? totalVal : 1248.6,
        scope1TCO2e: totalScope1 > 0 ? totalScope1 : 349.2,
        scope2TCO2e: totalScope2 > 0 ? totalScope2 : 899.4,
        scope3TCO2e: scope3Val > 0 ? scope3Val : 0,
        status: 'Audited & Certified',
        pages: 18,
        fileFormat: 'PDF',
      })

      setIsGenerating(false)
      setShowWizard(false)
      setSelectedReport(newRep)
    }, 1000)
  }

  const markSubmitted = (id: string) => {
    setSubmittedIds((prev) => ({ ...prev, [id]: true }))
  }

  return (
    <PlatformShell>
      <PageHeading
        eyebrow="UAE Law & MOCCAE MRV Deliverables"
        title="Compliance Reports"
        description="One-click PDF generation formatted to UAE Federal Decree-Law No. 11 of 2024 standards. Includes 5-year audit preservation."
        action={
          <button
            onClick={() => setShowWizard(true)}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 px-5 py-3 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all"
          >
            <Plus size={16} /> Generate Compliance PDF
          </button>
        }
      />

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-xs flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              MOCCAE Verification Score
            </p>
            <p className="mt-1 text-2xl font-bold text-foreground">100% Ready</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              ✓ Law 11/2024 Compliant
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-xs flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-700 dark:text-teal-300">
            <Clock3 size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              5-Year Audit Retention
            </p>
            <p className="mt-1 text-2xl font-bold text-foreground">Active</p>
            <p className="text-xs text-muted-foreground">Mandatory Record Vault</p>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-xs flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-700 dark:text-blue-300">
            <Award size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Official Standard
            </p>
            <p className="mt-1 text-base font-bold text-foreground">Cabinet Res. 67/2024</p>
            <p className="text-xs text-muted-foreground">GHG Protocol & DEWA 0.45</p>
          </div>
        </div>
      </div>

      {/* Generator Wizard Modal */}
      {showWizard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2.5">
                <Sparkles size={20} className="text-emerald-600" />
                <h2 className="text-base font-bold text-foreground">Generate UAE MOCCAE Report</h2>
              </div>
              <button
                onClick={() => setShowWizard(false)}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleGenerateReport} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold uppercase tracking-wider text-muted-foreground">
                  Reporting Year
                </label>
                <select
                  value={reportingYear}
                  onChange={(e) => setReportingYear(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background p-3 text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="2025">FY 2025 (Annual Report)</option>
                  <option value="2026">FY 2026 (YTD)</option>
                  <option value="2024">FY 2024 (Baseline Year)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold uppercase tracking-wider text-muted-foreground">
                  Compliance Framework
                </label>
                <select
                  value={framework}
                  onChange={(e) => setFramework(e.target.value as any)}
                  className="w-full rounded-xl border border-input bg-background p-3 text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="GHG Protocol Corporate Standard">UAE Federal Law 11/2024 (MOCCAE Standard)</option>
                  <option value="UAE Net Zero 2050 Charter">UAE Net Zero 2050 Charter</option>
                  <option value="DFM / ADX ESG Guide">DFM / ADX Stock Exchange ESG Guide</option>
                </select>
              </div>

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-3.5 text-[11px] leading-relaxed text-muted-foreground">
                Includes company trade license header, Scope 1 fuels, Scope 2 DEWA breakdown, annual total, reduction target, and cryptographic verification hash.
              </div>

              <div className="flex gap-3 pt-4 border-t border-border">
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="flex-1 rounded-xl bg-primary py-3 text-xs font-bold text-primary-foreground shadow-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>Compiling UAE Law PDF...</>
                  ) : (
                    <>
                      <FileCheck2 size={16} /> Generate & Store PDF
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowWizard(false)}
                  className="rounded-xl border border-border px-4 py-3 text-xs font-semibold hover:bg-muted"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Generated Reports Table Card */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
          <div>
            <h2 className="text-base font-bold text-foreground">Generated UAE Compliance Reports</h2>
            <p className="text-xs text-muted-foreground">
              Official deliverables for MOCCAE submission, board review, and auditor sign-off
            </p>
          </div>
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            {reports.length} Reports Archived
          </span>
        </div>

        <div className="space-y-3">
          {reports.map((report) => {
            const isSubmitted = submittedIds[report.id]
            const badge = getAuditBadge(isSubmitted ? 'Verified' : report.status)
            return (
              <div
                key={report.id}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border bg-muted/20 p-4 hover:border-emerald-500/40 hover:bg-muted/40 transition-all"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-xs">
                    <FileText size={20} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-sm text-foreground">{report.title}</h3>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold border ${
                          isSubmitted ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20' : badge.bg
                        }`}
                      >
                        <span className="size-1.5 rounded-full bg-emerald-500" />
                        {isSubmitted ? 'Submitted to MOCCAE' : 'Ready for Submission'}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {report.framework} · {report.pages} Pages · Gross Total: {formatTCO2e(report.totalEmissionsTCO2e)} tCO₂e · {report.generatedAt}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:self-center">
                  {!isSubmitted && (
                    <button
                      onClick={() => markSubmitted(report.id)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 transition-all shadow-xs"
                    >
                      <Send size={13} /> Mark Submitted
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedReport(report)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-all shadow-xs"
                  >
                    <Eye size={14} className="text-emerald-600" />
                    Preview PDF
                  </button>
                  <button
                    onClick={() => setSelectedReport(report)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-all shadow-xs"
                  >
                    <Download size={14} /> Download
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Report Preview Modal */}
      <ReportPreviewModal
        report={selectedReport}
        companyName={company.name}
        tradeLicense={company.tradeLicense}
        onClose={() => setSelectedReport(null)}
      />
    </PlatformShell>
  )
}
