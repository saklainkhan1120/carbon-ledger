'use client'

import Link from 'next/link'
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Clock,
  Cpu,
  Database,
  FileCheck2,
  FileText,
  Globe,
  HardDrive,
  Leaf,
  Plus,
  RefreshCw,
  Server,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card3D } from '@/components/card-3d'
import { MetricCard, PageHeading, PlatformShell } from '@/components/platform-shell'
import { DEMO_ADMIN_ORGS } from '@/lib/demo-data'
import { formatTCO2e } from '@/lib/utils'

const ADOPTION_TREND = [
  { month: 'Jan', tenants: 45, emissionsLogged: 120 },
  { month: 'Feb', tenants: 78, emissionsLogged: 240 },
  { month: 'Mar', tenants: 112, emissionsLogged: 390 },
  { month: 'Apr', tenants: 165, emissionsLogged: 580 },
  { month: 'May', tenants: 210, emissionsLogged: 820 },
  { month: 'Jun', tenants: 248, emissionsLogged: 1248 },
]

export default function AdminOverviewPage() {
  return (
    <PlatformShell admin>
      <PageHeading
        eyebrow="Platform Governance & Factor Registry"
        title="Super Admin Control Center"
        description="Multi-tenant health metrics, UAE emission factor deployment, compliance queue status, and cryptographic audit monitoring."
        action={
          <div className="flex items-center gap-3">
            <Link
              href="/admin/emission-factors"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all"
            >
              <Leaf size={15} /> UAE Factor Registry (v2025.2)
            </Link>
          </div>
        }
      />

      {/* 4 Core Admin KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          label="Registered UAE Entities"
          value="248"
          detail="+34 This Month (Law 11/2024 Push)"
          tone="good"
          icon={Building2}
        />
        <MetricCard
          label="Total Logged Emissions"
          value="482.9k"
          unit="tCO₂e"
          detail="100% SHA-256 Audit Sealed"
          tone="accent"
          icon={Leaf}
        />
        <MetricCard
          label="Compliance Queue"
          value="4"
          detail="Reports Awaiting Review"
          tone="warn"
          icon={FileText}
        />
        <MetricCard
          label="DEWA / ADDC API Sync"
          value="99.98%"
          detail="Active Factor v2025.2"
          tone="good"
          icon={Activity}
        />
      </div>

      {/* Main Charts & Infrastructure Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tenant Adoption & Activity Volume Recharts */}
        <div className="lg:col-span-2 rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-4">
            <div>
              <h2 className="text-base font-bold text-foreground">UAE Entity Onboarding & Volume</h2>
              <p className="text-xs text-muted-foreground">
                Monthly growth of UAE companies registering Scope 1 & 2 inventories
              </p>
            </div>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
              Live Trajectory
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ADOPTION_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTenants" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#047857" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#047857" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'currentColor' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'currentColor' }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    borderColor: 'var(--border)',
                    borderRadius: '1rem',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="tenants"
                  name="Active UAE Tenants"
                  stroke="#047857"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorTenants)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Infrastructure & Node Health Monitors */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="border-b border-border/80 pb-3">
            <h2 className="text-base font-bold text-foreground">Infrastructure Health</h2>
            <p className="text-xs text-muted-foreground">High-availability UAE regional cluster status</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between rounded-2xl border border-border bg-muted/20 p-3.5">
              <div className="flex items-center gap-2.5">
                <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-foreground">DEWA API Gateway</span>
              </div>
              <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">Operational</span>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-border bg-muted/20 p-3.5">
              <div className="flex items-center gap-2.5">
                <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-foreground">ADDC & SEWA Sync</span>
              </div>
              <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">Operational</span>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-border bg-muted/20 p-3.5">
              <div className="flex items-center gap-2.5">
                <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-foreground">SHA-256 Seal Generator</span>
              </div>
              <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">Active</span>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-border bg-muted/20 p-3.5">
              <div className="flex items-center gap-2.5">
                <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-foreground">5-Year Vault Cluster</span>
              </div>
              <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold">99.99%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tenant Directory Quick Inspect Table */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-border/80 pb-4">
          <div>
            <h2 className="text-base font-bold text-foreground">Recent Organization Onboardings</h2>
            <p className="text-xs text-muted-foreground">UAE registered entities with active GHG baseline records</p>
          </div>
          <Link
            href="/admin/organizations"
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            View All 248 Organizations <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 uppercase tracking-wider text-[11px] font-bold text-muted-foreground">
              <tr>
                <th className="px-4 py-3 rounded-l-xl">Organization Name</th>
                <th className="px-4 py-3">Trade License</th>
                <th className="px-4 py-3">Emirate</th>
                <th className="px-4 py-3">Facilities</th>
                <th className="px-4 py-3">Total Footprint</th>
                <th className="px-4 py-3 rounded-r-xl">Compliance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {DEMO_ADMIN_ORGS.map((org) => (
                <tr key={org.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3.5 font-bold text-foreground">{org.name}</td>
                  <td className="px-4 py-3.5 font-mono text-muted-foreground">{org.tradeLicense}</td>
                  <td className="px-4 py-3.5 text-muted-foreground font-semibold">{org.emirate}</td>
                  <td className="px-4 py-3.5 text-muted-foreground">{org.facilitiesCount} Sites</td>
                  <td className="px-4 py-3.5 font-black text-foreground">
                    {formatTCO2e(org.totalEmissionsTCO2e)} tCO₂e
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      {org.complianceStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PlatformShell>
  )
}
