'use client'

import { useState } from 'react'
import {
  Award,
  CheckCircle2,
  Download,
  FileCheck2,
  FileText,
  Lock,
  Printer,
  QrCode,
  ShieldCheck,
  X,
} from 'lucide-react'
import { GeneratedReport } from '@/lib/demo-data'
import { formatTCO2e } from '@/lib/utils'

export function ReportPreviewModal({
  report,
  companyName,
  tradeLicense,
  onClose,
}: {
  report: GeneratedReport | null
  companyName: string
  tradeLicense: string
  onClose: () => void
}) {
  const [isPrinting, setIsPrinting] = useState(false)

  if (!report) return null

  const handlePrint = () => {
    setIsPrinting(true)
    setTimeout(() => {
      window.print()
      setIsPrinting(false)
    }, 300)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md animate-in fade-in">
      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col rounded-3xl border border-border bg-card shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
              <FileCheck2 size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-foreground">
                UAE Official Compliance Certificate Preview
              </h2>
              <p className="text-[11px] text-muted-foreground">
                MOCCAE National MRV Format · Federal Decree-Law No. 11/2024
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-bold text-foreground hover:bg-muted transition-colors shadow-xs"
            >
              <Printer size={14} /> Print / Export PDF
            </button>
            <button
              onClick={onClose}
              className="rounded-xl p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-slate-50 dark:bg-slate-950/50 space-y-8">
          {/* Certificate Paper Sheet */}
          <div className="mx-auto max-w-3xl rounded-2xl border-2 border-emerald-600/30 bg-card p-8 sm:p-12 shadow-xl space-y-8 text-foreground relative overflow-hidden">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none text-emerald-950 dark:text-emerald-50 text-8xl font-black rotate-[-30deg]">
              MOCCAE CERTIFIED
            </div>

            {/* Document Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b-2 border-emerald-600/20 pb-6">
              <div className="space-y-1">
                <span className="rounded-md bg-emerald-600 text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  Official UAE Disclosure Certificate
                </span>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
                  Greenhouse Gas (GHG) Compliance Certificate
                </h1>
                <p className="text-xs text-muted-foreground">
                  Pursuant to UAE Federal Decree-Law No. 11 of 2024 & Cabinet Resolution 67/2024
                </p>
              </div>

              <div className="text-left sm:text-right text-xs font-mono space-y-0.5 shrink-0">
                <p className="font-bold text-foreground">REF: UAE-CL-{report.id.toUpperCase()}</p>
                <p className="text-muted-foreground">Issued: {report.generatedAt}</p>
                <p className="text-emerald-700 dark:text-emerald-400 font-semibold">Status: Audited & Certified</p>
              </div>
            </div>

            {/* Entity Registration Block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl border border-border bg-muted/20 p-4 text-xs">
              <div>
                <p className="text-[10px] font-bold uppercase text-muted-foreground">Reporting Entity</p>
                <p className="font-bold text-foreground text-sm">{companyName}</p>
                <p className="text-muted-foreground text-[11px]">Trade License: {tradeLicense}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-[10px] font-bold uppercase text-muted-foreground">Verification Standard</p>
                <p className="font-semibold text-foreground">{report.framework}</p>
                <p className="text-muted-foreground text-[11px]">Reporting Period: FY {report.reportingYear}</p>
              </div>
            </div>

            {/* Verified Emissions Table */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Mandatory Emissions Inventory Breakdown
              </h2>
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-left text-xs">
                  <thead className="bg-muted/40 font-bold text-muted-foreground">
                    <tr>
                      <th className="px-4 py-2.5">Scope Category</th>
                      <th className="px-4 py-2.5">Emission Source Activity</th>
                      <th className="px-4 py-2.5">Factor Applied</th>
                      <th className="px-4 py-2.5 text-right">Output (tCO₂e)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60 font-medium">
                    <tr>
                      <td className="px-4 py-3 font-bold text-emerald-700 dark:text-emerald-400">
                        Scope 1 (Direct)
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        Stationary Diesel, LPG & Company Vehicle Fleet
                      </td>
                      <td className="px-4 py-3 text-muted-foreground font-mono">UAE 2.68 / 2.31 kg/L</td>
                      <td className="px-4 py-3 text-right font-black">
                        {formatTCO2e(report.scope1TCO2e)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-bold text-teal-700 dark:text-teal-400">
                        Scope 2 (Indirect)
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        DEWA & ADDC Grid Electricity Consumption
                      </td>
                      <td className="px-4 py-3 text-muted-foreground font-mono">DEWA 0.45 kgCO₂/kWh</td>
                      <td className="px-4 py-3 text-right font-black">
                        {formatTCO2e(report.scope2TCO2e)}
                      </td>
                    </tr>
                    {report.scope3TCO2e > 0 && (
                      <tr>
                        <td className="px-4 py-3 font-bold text-blue-700 dark:text-blue-400">
                          Scope 3 (Voluntary)
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          Business Air Travel & Water Supply
                        </td>
                        <td className="px-4 py-3 text-muted-foreground font-mono">DEFRA / ICAO</td>
                        <td className="px-4 py-3 text-right font-black">
                          {formatTCO2e(report.scope3TCO2e)}
                        </td>
                      </tr>
                    )}
                    <tr className="bg-emerald-500/10 font-black text-foreground">
                      <td colSpan={3} className="px-4 py-3 text-sm">
                        Gross Total Annual Emissions (Scope 1 + 2)
                      </td>
                      <td className="px-4 py-3 text-right text-base text-emerald-700 dark:text-emerald-300">
                        {formatTCO2e(report.totalEmissionsTCO2e)} tCO₂e
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Signatures & Security Stamp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-border">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  <span>Cryptographic Verification Seal</span>
                </div>
                <div className="rounded-xl border border-border bg-muted/20 p-3 space-y-1 font-mono text-[10px] text-muted-foreground">
                  <p className="truncate">SHA-256: 0x8a92f814b7e12c5890ad6f31920e8b8a</p>
                  <p>Auditor Token: MOCCAE-VER-2026-ACTIVE</p>
                  <p>Record Archival: 5-Year Legal Vault (Expires May 2031)</p>
                </div>
              </div>

              <div className="flex flex-col justify-end space-y-2 text-right text-xs">
                <div className="font-serif italic text-emerald-800 dark:text-emerald-300 text-base">
                  Dr. Tariq Al-Nuaimi
                </div>
                <div className="border-t border-border pt-1">
                  <p className="font-bold text-foreground">Lead ESG Auditor & Carbon Assessor</p>
                  <p className="text-[10px] text-muted-foreground">MOCCAE Accredited Verifier No. 849-DXB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
