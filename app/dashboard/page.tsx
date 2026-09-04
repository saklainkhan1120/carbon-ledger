'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FileCheck2,
  Flame,
  Globe,
  Leaf,
  Lightbulb,
  Plus,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  Zap,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { MetricCard, PageHeading, PlatformShell } from '@/components/platform-shell'
import { DEMO_MONTHLY_TREND } from '@/lib/demo-data'
import { useCarbonStore } from '@/lib/store'
import { formatNumber, formatTCO2e, getAuditBadge } from '@/lib/utils'

export default function DashboardPage() {
  const {
    company,
    facilities,
    records,
    reports,
    activeFacilityId,
    totalScope1,
    totalScope2,
    totalScope3,
    totalEmissions,
  } = useCarbonStore()

  const [activeChartTab, setActiveChartTab] = useState<'stacked' | 'trend'>('stacked')
  const [solarSimulation, setSolarSimulation] = useState(false)
  const [fleetSimulation, setFleetSimulation] = useState(false)

  // Live real-time seconds ticking countdown to May 30, 2026
  const [timeLeft, setTimeLeft] = useState({ days: 268, hours: 14, minutes: 22, seconds: 45 })

  useEffect(() => {
    const target = new Date('2026-05-30T00:00:00Z').getTime()
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const diff = Math.max(0, target - now)
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Simulated reductions calculation
  const simDeductionScope2 = solarSimulation ? 19.1 : 0 // ~230 tCO2e/yr = 19.1 t/mo
  const simDeductionScope1 = fleetSimulation ? 3.75 : 0 // ~45 tCO2e/yr = 3.75 t/mo

  const adjustedScope1 = Math.max(0, totalScope1 - simDeductionScope1)
  const adjustedScope2 = Math.max(0, totalScope2 - simDeductionScope2)
  const adjustedTotal = adjustedScope1 + adjustedScope2 + totalScope3

  // Dynamic Chart Data with simulation support
  const chartData = useMemo(() => {
    return DEMO_MONTHLY_TREND.map((item) => {
      let s1 = item.scope1
      let s2 = item.scope2
      if (fleetSimulation) s1 = Math.max(0, Number((s1 * 0.72).toFixed(1)))
      if (solarSimulation) s2 = Math.max(0, Number((s2 * 0.58).toFixed(1)))
      return {
        ...item,
        scope1: s1,
        scope2: s2,
      }
    })
  }, [solarSimulation, fleetSimulation])

  const scopesPieData = [
    { name: 'Scope 1 (Direct Fuels)', value: Number(adjustedScope1.toFixed(1)), color: '#047857' },
    { name: 'Scope 2 (Electricity & Cooling)', value: Number(adjustedScope2.toFixed(1)), color: '#0d9488' },
    { name: 'Scope 3 (Travel & Water)', value: Number(totalScope3.toFixed(1)), color: '#3b82f6' },
  ]

  const activeFacilityName =
    activeFacilityId === 'all'
      ? 'All UAE Facilities (Consolidated)'
      : facilities.find((f) => f.id === activeFacilityId)?.name || 'Facility'

  return (
    <PlatformShell>
      {/* Top Banner & Page Heading */}
      <PageHeading
        eyebrow="UAE Federal Law No. 11/2024 Compliance"
        title="Emissions Dashboard"
        description={`${company.name} · Trade License: ${company.tradeLicense} · Active Filter: ${activeFacilityName}`}
        action={
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard/reports"
              className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 text-xs font-bold hover:bg-muted transition-colors shadow-xs"
            >
              <FileCheck2 size={16} /> Generate MOCCAE Report
            </Link>
            <Link
              href="/dashboard/calculator"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-700 px-5 py-2.5 text-xs font-extrabold text-white shadow-md shadow-emerald-700/20 hover:opacity-95 transition-all"
            >
              <Plus size={16} /> Log Monthly Data
            </Link>
          </div>
        }
      />

      {/* Live Animated Deadline Countdown Card (PDF Section 04/07) */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/40 bg-gradient-to-br from-amber-950/20 via-card to-card p-6 shadow-md space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-md shadow-amber-900/30">
              <Clock size={24} className="animate-pulse" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-base font-extrabold text-foreground">
                  UAE Federal Law 11/2024 Compliance Deadline
                </span>
                <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-extrabold text-amber-800 dark:text-amber-300">
                  May 30, 2026 Mandatory
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All UAE commercial and industrial entities must register verified Scope 1 and Scope 2 inventories on MOCCAE&apos;s National MRV platform.
              </p>
            </div>
          </div>

          {/* Real-Time Countdown Blocks */}
          <div className="flex items-center gap-2 sm:gap-3 self-center lg:self-auto">
            {[
              { val: timeLeft.days, label: 'DAYS' },
              { val: timeLeft.hours, label: 'HOURS' },
              { val: timeLeft.minutes, label: 'MINS' },
              { val: timeLeft.seconds, label: 'SECS' },
            ].map((unit, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 min-w-[58px] shadow-xs"
              >
                <span className="text-xl sm:text-2xl font-black text-amber-800 dark:text-amber-300 font-mono">
                  {unit.val.toString().padStart(2, '0')}
                </span>
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-muted-foreground">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Core Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          label="Total Gross Emissions"
          value={formatTCO2e(adjustedTotal)}
          unit="tCO₂e"
          detail="−12.4% vs FY2024 Baseline"
          tone="good"
          icon={Leaf}
        />
        <MetricCard
          label="Scope 1 Direct (Fuels)"
          value={formatTCO2e(adjustedScope1)}
          unit="tCO₂e"
          detail="Diesel (2.68) & Vehicles (0.21)"
          tone="accent"
          icon={Flame}
        />
        <MetricCard
          label="Scope 2 Electricity (DEWA)"
          value={formatTCO2e(adjustedScope2)}
          unit="tCO₂e"
          detail="0.45 kgCO₂/kWh Grid Factor"
          tone="good"
          icon={Zap}
        />
        <MetricCard
          label="Net Zero 2050 Progress"
          value="35.4%"
          detail="Target: -35% by 2030"
          tone="accent"
          icon={Award}
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Emissions Trend Recharts */}
        <div className="lg:col-span-2 rounded-3xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-4">
            <div>
              <h2 className="text-base font-bold text-foreground">Monthly Carbon Trajectory (tCO₂e)</h2>
              <p className="text-xs text-muted-foreground">
                Verified historical data vs Net Zero 2050 compliance target
              </p>
            </div>
            <div className="flex items-center gap-1.5 rounded-2xl bg-muted p-1 text-xs">
              <button
                onClick={() => setActiveChartTab('stacked')}
                className={`rounded-xl px-3 py-1 font-semibold transition-all ${
                  activeChartTab === 'stacked'
                    ? 'bg-card text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Stacked Scopes
              </button>
              <button
                onClick={() => setActiveChartTab('trend')}
                className={`rounded-xl px-3 py-1 font-semibold transition-all ${
                  activeChartTab === 'trend'
                    ? 'bg-card text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Trajectory Line
              </button>
            </div>
          </div>

          <div className="mt-6 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'currentColor' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'currentColor' }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    borderColor: 'var(--border)',
                    borderRadius: '1rem',
                    fontSize: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="scope1" name="Scope 1 (Direct)" stackId="a" fill="#047857" radius={[0, 0, 4, 4]} />
                <Bar dataKey="scope2" name="Scope 2 (DEWA)" stackId="a" fill="#0d9488" />
                <Bar dataKey="scope3" name="Scope 3 (Travel & Water)" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scope Share Donut with Interactive Scenario Simulator */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="border-b border-border/80 pb-3">
            <h2 className="text-base font-bold text-foreground">Emissions by Scope</h2>
            <p className="text-xs text-muted-foreground">Proportional breakdown of current footprint</p>
          </div>

          <div className="my-auto h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={scopesPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                >
                  {scopesPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [`${val} tCO₂e`, 'Emissions']}
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    borderColor: 'var(--border)',
                    borderRadius: '0.75rem',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Interactive Decarbonization Scenario Simulator */}
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-3.5 space-y-2 text-xs">
            <p className="font-extrabold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <Sparkles size={13} /> Interactive Decarbonization Sandbox
            </p>
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-foreground">
                <input
                  type="checkbox"
                  checked={solarSimulation}
                  onChange={(e) => setSolarSimulation(e.target.checked)}
                  className="size-3.5 rounded accent-emerald-600"
                />
                <span>Simulate 350kW Shams Solar Array (-42% Scope 2)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-foreground">
                <input
                  type="checkbox"
                  checked={fleetSimulation}
                  onChange={(e) => setFleetSimulation(e.target.checked)}
                  className="size-3.5 rounded accent-emerald-600"
                />
                <span>Simulate Electric Commercial Fleet (-28% Scope 1)</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Year Activity Log Table */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-border/80 pb-4">
          <div>
            <h2 className="text-base font-bold text-foreground">5-Year Auditable Activity Trail</h2>
            <p className="text-xs text-muted-foreground">
              Permanently preserved activity logs compliant with UAE Federal Law 11/2024
            </p>
          </div>
          <Link
            href="/dashboard/history"
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            Open Full Timeline <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 rounded-l-xl">Activity Description</th>
                <th className="px-4 py-3">UAE Location</th>
                <th className="px-4 py-3">Reported Quantity</th>
                <th className="px-4 py-3">Calculated Output</th>
                <th className="px-4 py-3 rounded-r-xl">MOCCAE Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {records.slice(0, 4).map((rec) => {
                const badge = getAuditBadge(rec.evidenceStatus)
                return (
                  <tr key={rec.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-foreground">
                      {rec.activityType}
                      <span className="block text-[10px] text-muted-foreground font-normal">{rec.period}</span>
                    </td>
                    <td className="px-4 py-3.5 text-muted-foreground">{rec.facilityName}</td>
                    <td className="px-4 py-3.5 text-muted-foreground">
                      {formatNumber(rec.quantity)} {rec.unit}
                    </td>
                    <td className="px-4 py-3.5 font-black text-foreground">
                      {formatTCO2e(rec.emissionsTCO2e)} tCO₂e
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold border ${badge.bg}`}
                      >
                        <span className={`size-1.5 rounded-full ${badge.dot}`} />
                        {rec.evidenceStatus}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </PlatformShell>
  )
}
