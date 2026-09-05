'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  ArrowUpRight,
  BarChart3,
  Bell,
  Building2,
  Calculator,
  ChevronDown,
  CheckCircle2,
  Command,
  FileCheck2,
  FileText,
  History,
  LayoutDashboard,
  Leaf,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Zap,
} from 'lucide-react'
import { useCarbonStore } from '@/lib/store'

const customerNav = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, badge: undefined },
  { href: '/dashboard/calculator', label: 'Emissions Logger', icon: Calculator, badge: 'Active' },
  { href: '/dashboard/reports', label: 'Reports & Exports', icon: FileText, badge: 'Audit Ready' },
  { href: '/dashboard/history', label: 'Activity Timeline', icon: History, badge: undefined },
  { href: '/dashboard/settings', label: 'Workspace Settings', icon: Settings, badge: undefined },
]

const adminNav = [
  { href: '/admin', label: 'Platform Control', icon: BarChart3, badge: 'Live' },
  { href: '/admin/organizations', label: 'Organizations', icon: Building2, badge: '248' },
  { href: '/admin/users', label: 'Users & Roles', icon: Users, badge: undefined },
  { href: '/admin/emission-factors', label: 'UAE Factor Registry', icon: Leaf, badge: 'v2025.2' },
  { href: '/admin/reports', label: 'Compliance Queue', icon: FileText, badge: '4 Pending' },
  { href: '/admin/audit-log', label: 'Security Audit Log', icon: ShieldCheck, badge: undefined },
  { href: '/admin/cms', label: 'Regulatory CMS', icon: Settings, badge: undefined },
]

export function PlatformShell({
  children,
  admin = false,
}: {
  children: React.ReactNode
  admin?: boolean
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showOrgDropdown, setShowOrgDropdown] = useState(false)
  const [showCommandMenu, setShowCommandMenu] = useState(false)
  const [cmdSearch, setCmdSearch] = useState('')
  const { company, facilities, activeFacilityId, selectFacility } = useCarbonStore()

  const nav = admin ? adminNav : customerNav

  // Keyboard shortcut listener for Command+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setShowCommandMenu((prev) => !prev)
      }
      if (e.key === 'Escape') {
        setShowCommandMenu(false)
        setShowNotifications(false)
        setShowOrgDropdown(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const commandItems = [
    { label: 'Overview Dashboard', href: '/dashboard', icon: LayoutDashboard, category: 'Navigation' },
    { label: 'Log Emissions Data', href: '/dashboard/calculator', icon: Calculator, category: 'Actions' },
    { label: 'Generate MOCCAE Compliance PDF', href: '/dashboard/reports', icon: FileText, category: 'Actions' },
    { label: '5-Year Activity Audit Trail', href: '/dashboard/history', icon: History, category: 'Navigation' },
    { label: 'Workspace Settings & Facilities', href: '/dashboard/settings', icon: Settings, category: 'Navigation' },
    { label: 'Super Admin Control Center', href: '/admin', icon: BarChart3, category: 'Administration' },
    { label: 'UAE Emission Factors Registry', href: '/admin/emission-factors', icon: Leaf, category: 'Administration' },
  ].filter((item) => item.label.toLowerCase().includes(cmdSearch.toLowerCase()))

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-emerald-500/20">
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden animate-in fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Spotlight Command Palette (⌘K) */}
      {showCommandMenu && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-4 shadow-2xl space-y-3">
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-2xl border border-input bg-background">
              <Search size={18} className="text-muted-foreground" />
              <input
                type="text"
                autoFocus
                value={cmdSearch}
                onChange={(e) => setCmdSearch(e.target.value)}
                placeholder="Search commands, facilities, reports... (ESC to close)"
                className="w-full bg-transparent text-xs font-semibold outline-none placeholder:text-muted-foreground text-foreground"
              />
              <span className="rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                ESC
              </span>
            </div>

            <div className="max-h-64 overflow-y-auto space-y-1 p-1">
              {commandItems.map((cmd, idx) => {
                const Icon = cmd.icon
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      router.push(cmd.href)
                      setShowCommandMenu(false)
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium hover:bg-emerald-500/10 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon size={16} className="text-emerald-600" />
                      <span className="font-semibold text-foreground">{cmd.label}</span>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">{cmd.category}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border bg-card/95 backdrop-blur-xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-20 items-center justify-between border-b border-border px-6">
          <Link
            href={admin ? '/admin' : '/dashboard'}
            className="flex items-center gap-3 font-semibold tracking-tight group"
          >
            <span className="relative flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform">
              <Leaf size={20} className="drop-shadow" />
              <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-emerald-400 border-2 border-background animate-pulse" />
            </span>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-foreground flex items-center gap-1.5">
                Car<span className="text-emerald-600 dark:text-emerald-400">byn</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {admin ? 'Super Admin Portal' : 'UAE GHG Compliance'}
              </span>
            </div>
          </Link>
          <button
            className="rounded-xl p-2 text-muted-foreground hover:bg-muted lg:hidden"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Facility Selector */}
        {!admin && (
          <div className="border-b border-border px-4 py-3 bg-muted/20">
            <div className="relative">
              <button
                onClick={() => setShowOrgDropdown(!showOrgDropdown)}
                className="flex w-full items-center justify-between rounded-2xl border border-border/80 bg-card px-3 py-2.5 text-left text-xs font-medium shadow-xs hover:border-emerald-500/50 transition-all"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-extrabold text-[11px]">
                    AN
                  </div>
                  <div className="truncate">
                    <p className="truncate font-bold text-foreground text-xs">{company.name}</p>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      {activeFacilityId === 'all'
                        ? 'All UAE Facilities (3)'
                        : facilities.find((f) => f.id === activeFacilityId)?.name || 'Facility'}
                    </p>
                  </div>
                </div>
                <ChevronDown size={14} className="text-muted-foreground shrink-0" />
              </button>

              {showOrgDropdown && (
                <div className="absolute left-0 right-0 top-full mt-1.5 z-30 rounded-2xl border border-border bg-card p-1.5 shadow-2xl text-xs space-y-1 animate-in fade-in slide-in-from-top-1">
                  <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Select Active Facility
                  </div>
                  <button
                    onClick={() => {
                      selectFacility('all')
                      setShowOrgDropdown(false)
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-left transition-colors ${
                      activeFacilityId === 'all'
                        ? 'bg-emerald-500/10 font-bold text-emerald-700 dark:text-emerald-300'
                        : 'hover:bg-muted text-foreground'
                    }`}
                  >
                    <span>All UAE Facilities (Consolidated)</span>
                    {activeFacilityId === 'all' && <CheckCircle2 size={14} />}
                  </button>
                  {facilities.map((fac) => (
                    <button
                      key={fac.id}
                      onClick={() => {
                        selectFacility(fac.id)
                        setShowOrgDropdown(false)
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-left truncate transition-colors ${
                        activeFacilityId === fac.id
                          ? 'bg-emerald-500/10 font-bold text-emerald-700 dark:text-emerald-300'
                          : 'hover:bg-muted text-foreground'
                      }`}
                    >
                      <span className="truncate">{fac.name} ({fac.emirate})</span>
                      {activeFacilityId === fac.id && <CheckCircle2 size={14} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation List with Glowing Indicators */}
        <div className="flex flex-1 flex-col justify-between overflow-y-auto p-4 space-y-6">
          <div>
            <p className="mb-2 px-3 text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">
              {admin ? 'Global Operations' : 'Emissions & Law 11/2024'}
            </p>
            <nav className="flex flex-col gap-1.5">
              {nav.map(({ href, label, icon: Icon, badge }) => {
                const isActive = pathname === href || (href !== '/dashboard' && href !== '/admin' && pathname.startsWith(href))
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`group relative flex items-center justify-between rounded-2xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-900/20 font-bold'
                        : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        size={17}
                        className={isActive ? 'text-white' : 'text-muted-foreground group-hover:text-emerald-600 transition-colors'}
                      />
                      <span>{label}</span>
                    </div>
                    {badge && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[9px] font-extrabold ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                        }`}
                      >
                        {badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Quick Action & Switcher */}
          <div className="space-y-3">
            {!admin && (
              <Link
                href="/dashboard/calculator"
                className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-700 px-4 py-3 text-xs font-extrabold text-white shadow-md shadow-emerald-600/20 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Plus size={16} /> Log Monthly Emissions
              </Link>
            )}

            {/* Quick ⌘K Spotlight Trigger */}
            <button
              onClick={() => setShowCommandMenu(true)}
              className="flex w-full items-center justify-between rounded-2xl border border-border bg-card px-3 py-2 text-xs text-muted-foreground hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-2">
                <Search size={14} />
                <span>Quick search...</span>
              </div>
              <kbd className="rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono">⌘K</kbd>
            </button>

            {/* Switch Role Card */}
            <div className="rounded-2xl border border-border bg-muted/40 p-3 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-[11px]">Active Portal</span>
                <span className="font-extrabold text-emerald-700 dark:text-emerald-400 text-[11px]">
                  {admin ? 'Super Admin' : 'Client Workspace'}
                </span>
              </div>
              <Link
                href={admin ? '/dashboard' : '/admin'}
                className="flex items-center justify-between rounded-xl border border-border bg-card px-2.5 py-2 font-semibold text-foreground hover:bg-muted transition-colors text-[11px]"
              >
                <span>{admin ? 'Open Client Dashboard' : 'Open Super Admin'}</span>
                <ArrowUpRight size={13} className="text-muted-foreground" />
              </Link>
              <button
                onClick={async () => {
                  try {
                    await fetch('/api/auth/logout', { method: 'POST' })
                  } catch {}
                  router.push('/login')
                }}
                className="flex items-center gap-2 text-muted-foreground hover:text-destructive transition-colors px-1 pt-1 text-[11px] w-full text-left"
              >
                <LogOut size={13} /> Sign Out
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="lg:pl-72 flex flex-col flex-1">
        {/* Sticky Top Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-background/85 px-5 backdrop-blur-xl lg:px-8">
          <div className="flex items-center gap-3">
            <button
              className="rounded-2xl border border-border p-2.5 text-muted-foreground hover:bg-muted lg:hidden"
              aria-label="Open navigation menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div className="hidden sm:block">
              <h2 className="text-sm font-bold text-foreground">
                {admin ? 'Super Admin Control Center' : `Good morning, Aisha Khan`}
              </h2>
              <p className="text-xs text-muted-foreground">
                {admin
                  ? 'Multi-Tenant Governance & DEWA v2025.2 Factor Sync'
                  : `${company.name} · Trade License: ${company.tradeLicense}`}
              </p>
            </div>
          </div>

          {/* Right Top Header Actions */}
          <div className="flex items-center gap-3">
            {/* UAE Law Compliance Badge */}
            <div className="hidden md:flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{admin ? 'Registry Active' : 'UAE Law 11/2024 Track'}</span>
            </div>

            {/* Notifications Bell with Animated Drawer */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative rounded-2xl border border-border bg-card p-2.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-all shadow-xs"
                aria-label="Notifications"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-emerald-500 ring-2 ring-background" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 rounded-3xl border border-border bg-card p-4 shadow-2xl z-40 text-xs animate-in fade-in slide-in-from-top-2 space-y-3">
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <span className="font-bold text-foreground">Compliance Notifications</span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                      2 Unread
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-3 space-y-1">
                      <p className="font-bold text-foreground flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="text-emerald-600" />
                        DEWA Aug 2026 Audit Complete
                      </p>
                      <p className="text-muted-foreground text-[11px]">
                        Electricity activity data for Dubai HQ verified against invoice.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-3 space-y-1">
                      <p className="font-bold text-foreground flex items-center gap-1.5">
                        <Sparkles size={14} className="text-amber-500" />
                        MOCCAE Annual Filing Countdown
                      </p>
                      <p className="text-muted-foreground text-[11px]">
                        Compliance deadline May 30, 2026 approaching.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-border">
              <div className="flex size-9 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 text-xs font-bold text-white shadow-xs">
                {admin ? 'SA' : 'AK'}
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-xs font-bold text-foreground">
                  {admin ? 'Super Admin' : 'Aisha Khan'}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {admin ? 'Platform Lead' : 'Lead ESG Director'}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Body */}
        <main className="mx-auto w-full max-w-[1440px] flex-1 p-5 sm:p-8 lg:p-10 space-y-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string
  title: string
  description?: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p className="mb-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            {eyebrow}
          </p>
        )}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 max-w-2xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

export function MetricCard({
  label,
  value,
  detail,
  unit,
  tone = 'neutral',
  icon: Icon,
}: {
  label: string
  value: string
  detail?: string
  unit?: string
  tone?: 'neutral' | 'good' | 'warn' | 'accent'
  icon?: any
}) {
  const toneClasses = {
    neutral: 'text-muted-foreground',
    good: 'text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    warn: 'text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/20',
    accent: 'text-teal-700 dark:text-teal-300 bg-teal-500/10 border-teal-500/20',
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-xs hover:border-emerald-500/40 hover:shadow-lg transition-all">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
        {Icon && (
          <div className="flex size-9 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
            <Icon size={18} />
          </div>
        )}
      </div>
      <div className="mt-4 flex items-baseline gap-1.5">
        <span className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">{value}</span>
        {unit && <span className="text-xs font-bold text-muted-foreground">{unit}</span>}
      </div>
      {detail && (
        <div className="mt-3 flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold border ${
              toneClasses[tone]
            }`}
          >
            {detail}
          </span>
        </div>
      )}
    </div>
  )
}

export function BarChart({ values }: { values: number[] }) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return (
    <div className="flex h-52 items-end gap-2 pt-4">
      {values.map((value, index) => (
        <div key={index} className="flex flex-1 flex-col justify-end gap-2 group">
          <div className="relative flex justify-center">
            <span className="absolute -top-7 hidden group-hover:block rounded-md bg-foreground px-1.5 py-0.5 text-[10px] font-semibold text-background shadow-xs">
              {value}
            </span>
            <div
              className="w-full rounded-t-md bg-emerald-600/80 transition-all group-hover:bg-emerald-500 group-hover:glow-emerald"
              style={{ height: `${value}%` }}
            />
          </div>
          <span className="text-center text-[10px] font-medium text-muted-foreground">
            {months[index]}
          </span>
        </div>
      ))}
    </div>
  )
}
