'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Activity,
  ArrowRight,
  Award,
  BarChart3,
  Building2,
  Calculator,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Compass,
  Cpu,
  Droplets,
  Eye,
  FileCheck2,
  FileText,
  Flame,
  Globe,
  Layers,
  Leaf,
  Lock,
  Menu,
  Milestone,
  QrCode,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Sun,
  Trees,
  TrendingDown,
  TrendingUp,
  Users,
  Wind,
  X,
  Zap,
} from 'lucide-react'
import { Card3D } from '@/components/card-3d'
import { EnvironmentalBackground } from '@/components/environmental-background'
import { formatNumber, formatTCO2e } from '@/lib/utils'

const SECTOR_BENCHMARKS = [
  {
    id: 'mfg',
    name: 'Industrial & Manufacturing',
    icon: Building2,
    electricity: 85000,
    diesel: 4200,
    vehicles: 12000,
    desc: 'Heavy machinery, factory cooling & commercial generators',
  },
  {
    id: 'corp',
    name: 'Corporate & Real Estate',
    icon: Building2,
    electricity: 32000,
    diesel: 300,
    vehicles: 4500,
    desc: 'Office towers, central HVAC & executive transport',
  },
  {
    id: 'logistics',
    name: 'Logistics & Fleet Transport',
    icon: Flame,
    electricity: 18000,
    diesel: 16500,
    vehicles: 38000,
    desc: 'Heavy goods haulage, cross-emirate cargo & warehousing',
  },
  {
    id: 'hotel',
    name: 'Hospitality & Hotels',
    icon: Layers,
    electricity: 140000,
    diesel: 2800,
    vehicles: 6500,
    desc: 'Luxury resort HVAC, central laundries & kitchen LPG',
  },
]

const TIMELINE_MILESTONES = [
  {
    year: '2024',
    title: 'Federal Law No. 11 Enacted',
    desc: 'UAE Cabinet Resolution 67/2024 mandates national emissions baseline and MRV transparency platform.',
    active: true,
  },
  {
    year: 'May 30, 2026',
    title: 'Mandatory Compliance Deadline',
    desc: 'All UAE business entities must submit verified Scope 1 & 2 carbon inventories. Fines up to AED 2,000,000.',
    active: true,
    highlight: true,
  },
  {
    year: '2030',
    title: 'Interim 35% Reduction',
    desc: 'UAE Nationally Determined Contribution (NDC) target for commercial & industrial emitters.',
    active: false,
  },
  {
    year: '2050',
    title: 'UAE Net Zero Strategic Initiative',
    desc: 'Full national decarbonization aligned with the UAE Net Zero 2050 Charter.',
    active: false,
  },
]

const FAQS = [
  {
    q: 'Why does my UAE business need to measure GHG emissions by May 30, 2026?',
    a: 'Under UAE Federal Decree-Law No. 11 of 2024 and Cabinet Resolution 67/2024, every registered business entity in the UAE (including Free Zones, DIFC, and ADGM) must measure, report, and maintain 5-year records of their Scope 1 and Scope 2 emissions. Non-compliance carries fines between AED 50,000 and AED 2,000,000.',
  },
  {
    q: 'How does CarbonLedger calculate Scope 1 and Scope 2 emissions?',
    a: 'CarbonLedger applies government-published UAE emission factors: DEWA (Dubai 0.45 kgCO₂/kWh), ADDC (Abu Dhabi 0.42 kgCO₂/kWh), SEWA (Sharjah 0.47 kgCO₂/kWh), commercial diesel (2.68 kgCO₂/L), petrol (2.31 kgCO₂/L), and LPG cylinders (16.61 kgCO₂/cyl).',
  },
  {
    q: 'Can we manage multiple business locations across Dubai, Abu Dhabi, and Sharjah?',
    a: 'Yes! On our Growth and Enterprise plans, you can manage up to 10 or unlimited locations, tag meters individually, and generate consolidated or per-location MOCCAE compliance reports.',
  },
  {
    q: 'Are CarbonLedger PDF reports ready for MOCCAE submission?',
    a: 'Yes. Our one-click PDF generation produces reports in the exact required MOCCAE MRV format, including company trade license details, Scope 1 & 2 breakdown tables, and 5-year audit trail seals.',
  },
]

export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [annualBilling, setAnnualBilling] = useState(true)

  // Interactive Live UAE Carbon Studio States
  const [selectedSector, setSelectedSector] = useState(SECTOR_BENCHMARKS[0])
  const [studioElectricity, setStudioElectricity] = useState(85000)
  const [studioDiesel, setStudioDiesel] = useState(4200)
  const [studioVehicles, setStudioVehicles] = useState(12000)

  const handleSectorChange = (sector: typeof SECTOR_BENCHMARKS[0]) => {
    setSelectedSector(sector)
    setStudioElectricity(sector.electricity)
    setStudioDiesel(sector.diesel)
    setStudioVehicles(sector.vehicles)
  }

  // Exact PDF Blueprint Math: DEWA 0.45, Diesel 2.68, Vehicles 0.21
  const calcScope1Kg = studioDiesel * 2.68 + studioVehicles * 0.21
  const calcScope2Kg = studioElectricity * 0.45
  const calcTotalKg = calcScope1Kg + calcScope2Kg
  const calcTotalTCO2e = calcTotalKg / 1000

  // Environmental impact equivalence math
  const mangroveEquivalent = Math.round(calcTotalTCO2e * 12 * 45) // ~45 mangrove seedlings absorb 1 tCO2e over 25 yrs
  const solarRoofOffsetKwh = Math.round(studioElectricity * 0.65) // 65% offset potential with standard UAE rooftop solar
  const coalAvoidedKg = Math.round(calcTotalKg * 0.42)

  return (
    <main className="relative min-h-screen bg-[#050a07] text-white selection:bg-emerald-400 selection:text-black overflow-x-hidden">
      {/* Live Environmental Canvas Particles Background */}
      <EnvironmentalBackground />

      {/* Top Urgent Compliance Bar */}
      <div className="relative z-10 bg-gradient-to-r from-emerald-950 via-[#0a2e1e] to-teal-950 px-4 py-2.5 text-center text-xs font-semibold text-emerald-200 border-b border-emerald-500/30 backdrop-blur-md">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-black text-amber-300 border border-amber-500/30">
            <ShieldAlert size={12} className="animate-pulse" /> MANDATORY BY LAW
          </span>
          <span>
            <strong>UAE Federal Decree-Law No. 11 of 2024:</strong> All UAE businesses must report Scope 1 & 2 by May 30, 2026. Non-compliance fines up to AED 2,000,000.
          </span>
          <Link href="/calculator" className="underline hover:text-white font-bold text-emerald-300 ml-1">
            Calculate Exposure Free →
          </Link>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 border-b border-emerald-500/20 bg-[#050a07]/85 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link href="/" className="flex items-center gap-3 font-bold tracking-tight group">
            <span className="relative flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 text-slate-950 shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-transform">
              <Leaf size={20} className="stroke-[2.5]" />
              <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-emerald-300 border-2 border-[#050a07] animate-pulse" />
            </span>
            <div className="flex flex-col">
              <span className="text-white font-black text-lg tracking-tight flex items-center gap-1">
                Carbon<span className="text-emerald-400">Ledger</span>
                <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded-md border border-emerald-500/30">
                  UAE
                </span>
              </span>
              <span className="text-[10px] text-emerald-400/80 font-bold uppercase tracking-wider">
                Federal Law 11/2024 OS
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-7 text-xs font-bold text-slate-300 md:flex">
            <a href="#studio" className="hover:text-emerald-400 transition-colors">
              Live Carbon Studio
            </a>
            <a href="#environmental" className="hover:text-emerald-400 transition-colors">
              Impact & Roadmap
            </a>
            <a href="#features" className="hover:text-emerald-400 transition-colors">
              Platform Features
            </a>
            <a href="#pricing" className="hover:text-emerald-400 transition-colors">
              Pricing Plans
            </a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">
              Law FAQ
            </a>
            <Link href="/calculator" className="text-emerald-400 font-extrabold hover:underline flex items-center gap-1">
              <Calculator size={14} /> Free Lead Estimator
            </Link>
            <Link href="/login" className="hover:text-white transition-colors">
              Sign In
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 px-5 py-2.5 font-black text-slate-950 shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              Start Free Trial — 14 Days Free
            </Link>
          </div>

          <button
            className="rounded-2xl p-2 text-slate-400 hover:bg-white/10 md:hidden"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="mx-6 mb-4 flex flex-col gap-3 rounded-3xl border border-emerald-500/30 bg-[#0c1a13] p-5 md:hidden shadow-2xl text-sm font-semibold animate-in fade-in">
            <a href="#studio" onClick={() => setMobileOpen(false)}>
              Live Carbon Studio
            </a>
            <a href="#environmental" onClick={() => setMobileOpen(false)}>
              Impact & Roadmap
            </a>
            <a href="#features" onClick={() => setMobileOpen(false)}>
              Platform Features
            </a>
            <a href="#pricing" onClick={() => setMobileOpen(false)}>
              Pricing
            </a>
            <Link href="/calculator" onClick={() => setMobileOpen(false)}>
              Free Calculator
            </Link>
            <Link href="/login" onClick={() => setMobileOpen(false)}>
              Sign In
            </Link>
            <Link
              href="/register"
              className="rounded-xl bg-emerald-400 py-3 text-center text-slate-950 font-black"
              onClick={() => setMobileOpen(false)}
            >
              Start Free Trial — 14 Days Free
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section with 3D Holographic Environmental Pulse */}
      <section className="relative z-10 px-6 pb-20 pt-16 lg:px-10 lg:pb-32 lg:pt-24">
        <div className="mx-auto max-w-6xl text-center space-y-8">
          {/* Animated Law Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-950/80 px-4 py-2 text-xs font-bold text-emerald-300 shadow-xl shadow-emerald-950/50 backdrop-blur-xl">
            <Sun size={15} className="text-amber-400 animate-spin" style={{ animationDuration: '12s' }} />
            <span>UAE Net Zero 2050 Strategic Initiative · Cabinet Resolution 67/2024</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl leading-[1.05] text-white">
            The Intelligent GHG Platform for{' '}
            <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent drop-shadow-sm">
              UAE Climate Compliance.
            </span>
          </h1>

          <p className="mx-auto max-w-3xl text-base sm:text-xl leading-relaxed text-slate-300 font-normal">
            Automate Scope 1 direct fuel and Scope 2 DEWA grid accounting with verified governmental emission factors. Export official MOCCAE-certified disclosure PDFs in minutes.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 px-8 py-4 text-sm font-black text-slate-950 shadow-2xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all"
            >
              Start Free Trial — 14 Days Free <ArrowRight size={17} />
            </Link>
            <Link
              href="#studio"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-950/40 px-7 py-4 text-sm font-bold text-emerald-200 backdrop-blur-md hover:bg-emerald-900/40 hover:border-emerald-400/60 transition-all"
            >
              <Zap size={16} className="text-emerald-400" />
              Launch Live UAE Studio ↓
            </Link>
          </div>

          {/* Value Badges */}
          <div className="flex flex-wrap justify-center gap-6 pt-4 text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5 backdrop-blur-sm">
              <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
              DEWA 0.45 kgCO₂/kWh Grid Factor
            </span>
            <span className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5 backdrop-blur-sm">
              <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
              5-Year Cryptographic Audit Vault
            </span>
            <span className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5 backdrop-blur-sm">
              <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
              Instant MOCCAE PDF Generator
            </span>
          </div>
        </div>

        {/* 3D Floating Environmental Hologram Dashboard Mockup */}
        <div className="mx-auto mt-16 max-w-6xl">
          <Card3D className="border-2 border-emerald-500/30 bg-gradient-to-b from-[#0e2118] via-[#08150f] to-[#040906] p-6 sm:p-10 shadow-2xl shadow-emerald-950/80">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-500/20 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300 font-black text-base border border-emerald-500/30">
                    AN
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                      Al Noor Manufacturing LLC
                      <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono">
                        Active Tenant
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      Trade License: CN-1049281-DXB · Dubai Industrial City HQ & JAFZA Hub
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-300">
                    <ShieldCheck size={16} className="text-emerald-400" />
                    <span>MOCCAE Audit Verified</span>
                  </div>
                </div>
              </div>

              {/* 3 Top HUD Metric Displays */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-5 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">Total Annual Gross</p>
                    <Leaf size={16} className="text-emerald-400" />
                  </div>
                  <p className="text-3xl sm:text-4xl font-black text-white">1,248.6 <span className="text-xs font-bold text-slate-400">tCO₂e</span></p>
                  <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                    <TrendingDown size={13} /> −12.4% vs FY2024 Baseline
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-5 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">Scope 1 (Fuels & Fleet)</p>
                    <Flame size={16} className="text-emerald-400" />
                  </div>
                  <p className="text-3xl sm:text-4xl font-black text-emerald-300">349.2 <span className="text-xs font-bold text-slate-400">tCO₂e</span></p>
                  <p className="text-[11px] text-slate-300 font-medium">Diesel (2.68) & Vehicles (0.21)</p>
                </div>

                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/30 p-5 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">Scope 2 (DEWA Grid)</p>
                    <Zap size={16} className="text-teal-400" />
                  </div>
                  <p className="text-3xl sm:text-4xl font-black text-teal-300">899.4 <span className="text-xs font-bold text-slate-400">tCO₂e</span></p>
                  <p className="text-[11px] text-slate-300 font-medium">1,998,660 kWh × 0.45 kg/kWh</p>
                </div>
              </div>
            </div>
          </Card3D>
        </div>
      </section>

      {/* Interactive Live UAE Carbon Studio Section */}
      <section id="studio" className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-10 space-y-12 border-t border-emerald-500/20">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
            Live Interactive Simulator
          </p>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Instant UAE Carbon Studio
          </h2>
          <p className="text-sm text-slate-300">
            Select an industry sector or drag the sliders to test real-time Scope 1 & 2 carbon calculations powered by official DEWA/ADDC formulas.
          </p>
        </div>

        {/* Sector Preset Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {SECTOR_BENCHMARKS.map((sec) => {
            const Icon = sec.icon
            const isSelected = selectedSector.id === sec.id
            return (
              <button
                key={sec.id}
                onClick={() => handleSectorChange(sec)}
                className={`rounded-2xl border p-4 text-left transition-all ${
                  isSelected
                    ? 'border-emerald-400 bg-emerald-950/70 shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400'
                    : 'border-emerald-500/20 bg-emerald-950/20 hover:border-emerald-500/40 hover:bg-emerald-950/40'
                }`}
              >
                <Icon size={22} className={isSelected ? 'text-emerald-400' : 'text-slate-400'} />
                <p className="mt-2 font-black text-sm text-white">{sec.name}</p>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">{sec.desc}</p>
              </button>
            )
          })}
        </div>

        {/* Interactive Studio Console & Real-Time Output */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-center">
          {/* Sliders Console */}
          <div className="lg:col-span-7 rounded-3xl border border-emerald-500/30 bg-[#0a1811] p-6 sm:p-8 space-y-6 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calculator size={18} className="text-emerald-400" />
              Monthly Operational Activity Variables
            </h3>

            <div className="space-y-5 text-xs">
              {/* Slider 1: DEWA Electricity */}
              <div className="space-y-2">
                <div className="flex justify-between font-bold text-slate-200">
                  <span className="flex items-center gap-1.5">
                    <Zap size={14} className="text-teal-400" /> DEWA Grid Electricity (Dubai)
                  </span>
                  <span className="text-emerald-400 font-mono text-sm">{formatNumber(studioElectricity)} kWh/mo</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="200000"
                  step="1000"
                  value={studioElectricity}
                  onChange={(e) => setStudioElectricity(Number(e.target.value))}
                  className="w-full accent-emerald-400 h-2.5 bg-emerald-950 rounded-lg cursor-pointer"
                />
                <span className="text-[11px] text-slate-400 font-mono">
                  Math: {formatNumber(studioElectricity)} kWh × 0.45 kgCO₂/kWh = {formatTCO2e(calcScope2Kg / 1000, 2)} tCO₂e
                </span>
              </div>

              {/* Slider 2: Diesel Fleet */}
              <div className="space-y-2">
                <div className="flex justify-between font-bold text-slate-200">
                  <span className="flex items-center gap-1.5">
                    <Flame size={14} className="text-amber-400" /> Commercial Diesel Fleet & Generators
                  </span>
                  <span className="text-emerald-400 font-mono text-sm">{formatNumber(studioDiesel)} Litres/mo</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25000"
                  step="250"
                  value={studioDiesel}
                  onChange={(e) => setStudioDiesel(Number(e.target.value))}
                  className="w-full accent-emerald-400 h-2.5 bg-emerald-950 rounded-lg cursor-pointer"
                />
                <span className="text-[11px] text-slate-400 font-mono">
                  Math: {formatNumber(studioDiesel)} L × 2.68 kgCO₂/L = {formatTCO2e((studioDiesel * 2.68) / 1000, 2)} tCO₂e
                </span>
              </div>

              {/* Slider 3: Company Vehicles */}
              <div className="space-y-2">
                <div className="flex justify-between font-bold text-slate-200">
                  <span className="flex items-center gap-1.5">
                    <Building2 size={14} className="text-blue-400" /> Company Fleet Travel
                  </span>
                  <span className="text-emerald-400 font-mono text-sm">{formatNumber(studioVehicles)} km/mo</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="500"
                  value={studioVehicles}
                  onChange={(e) => setStudioVehicles(Number(e.target.value))}
                  className="w-full accent-emerald-400 h-2.5 bg-emerald-950 rounded-lg cursor-pointer"
                />
                <span className="text-[11px] text-slate-400 font-mono">
                  Math: {formatNumber(studioVehicles)} km × 0.21 kgCO₂/km = {formatTCO2e((studioVehicles * 0.21) / 1000, 2)} tCO₂e
                </span>
              </div>
            </div>
          </div>

          {/* Results Output with Environmental Equivalencies */}
          <div className="lg:col-span-5 rounded-3xl border-2 border-emerald-500/50 bg-gradient-to-br from-[#0c2419] to-[#04100b] p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-300">
                Calculated Monthly Footprint
              </span>
              <span className="rounded-full bg-emerald-400/20 border border-emerald-400/30 px-3 py-0.5 text-[10px] font-bold text-emerald-300">
                Law 11/2024 Verified
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-white">{formatTCO2e(calcTotalTCO2e, 2)}</span>
                <span className="text-base font-bold text-emerald-300">tCO₂e / month</span>
              </div>
              <p className="text-xs text-slate-300">
                Annual Total: <strong>{formatTCO2e(calcTotalTCO2e * 12, 1)} tCO₂e / year</strong>
              </p>
            </div>

            {/* Environmental Impact Equivalence Cards */}
            <div className="space-y-2.5 pt-2 border-t border-emerald-500/20 text-xs">
              <p className="font-bold text-emerald-300 text-[11px] uppercase tracking-wider">
                🌱 Real-World Environmental Equivalency
              </p>
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/40 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-300">
                    <Trees size={15} className="text-emerald-400" /> UAE Mangrove Seedlings
                  </span>
                  <span className="font-bold text-white font-mono">{formatNumber(mangroveEquivalent)} trees</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-300">
                    <Sun size={15} className="text-amber-400" /> Rooftop Solar Potential
                  </span>
                  <span className="font-bold text-white font-mono">{formatNumber(solarRoofOffsetKwh)} kWh/mo</span>
                </div>
              </div>
            </div>

            <Link
              href="/register"
              className="flex items-center justify-center gap-2 w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-300 py-3.5 text-xs font-black text-slate-950 shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              Generate Official MOCCAE Report <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* UAE Net Zero 2050 Roadmap Timeline Section */}
      <section id="environmental" className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-10 space-y-12 border-t border-emerald-500/20">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
            UAE Regulatory Pathway
          </p>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            UAE Net Zero 2050 Roadmap
          </h2>
          <p className="text-sm text-slate-300">
            How Federal Decree-Law No. 11 of 2024 guides businesses along the UAE national climate transition.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {TIMELINE_MILESTONES.map((m, idx) => (
            <div
              key={idx}
              className={`rounded-3xl border p-6 space-y-3 relative overflow-hidden transition-all ${
                m.highlight
                  ? 'border-amber-400/60 bg-gradient-to-br from-amber-950/40 via-[#162016] to-[#0a150e] shadow-2xl shadow-amber-950/30 ring-1 ring-amber-400/40'
                  : 'border-emerald-500/20 bg-[#0a1711]/60 hover:border-emerald-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-black font-mono ${
                    m.highlight
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}
                >
                  {m.year}
                </span>
                {m.highlight && (
                  <span className="flex items-center gap-1 text-[10px] font-extrabold text-amber-300 uppercase tracking-wider animate-pulse">
                    <ShieldAlert size={12} /> ACTION REQUIRED
                  </span>
                )}
              </div>

              <h3 className="font-extrabold text-base text-white">{m.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6-Card Apple-Grade Feature Bento Grid */}
      <section id="features" className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-10 space-y-12 border-t border-emerald-500/20">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
            Engineered For UAE Compliance
          </p>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Everything Required to Stay Compliant
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Card 1: 2-column wide */}
          <div className="md:col-span-2 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-[#0f281d] to-[#06140d] p-8 shadow-2xl space-y-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Zap size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white">Native UAE Utility Factor Engine</h3>
            <p className="text-xs leading-relaxed text-slate-300">
              Pre-loaded with accurate regional grid factors: DEWA (0.45 kgCO₂/kWh), ADDC (0.42), SEWA (0.47), FEWA (0.45), Commercial Diesel (2.68 kg/L), and Petrol (2.31 kg/L).
            </p>
            <div className="flex flex-wrap gap-2.5 pt-2 text-[11px] font-mono text-emerald-300 font-bold">
              <span className="rounded-xl bg-emerald-950/80 border border-emerald-500/30 px-3 py-1">DEWA 0.45</span>
              <span className="rounded-xl bg-emerald-950/80 border border-emerald-500/30 px-3 py-1">ADDC 0.42</span>
              <span className="rounded-xl bg-emerald-950/80 border border-emerald-500/30 px-3 py-1">SEWA 0.47</span>
              <span className="rounded-xl bg-emerald-950/80 border border-emerald-500/30 px-3 py-1">Diesel 2.68</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl border border-emerald-500/20 bg-[#0a1811] p-8 shadow-xl space-y-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/30">
              <FileCheck2 size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">1-Click MOCCAE Reports</h3>
            <p className="text-xs leading-relaxed text-slate-300">
              Generate submission-ready PDFs formatted to UAE Federal Decree-Law No. 11/2024 specifications with Trade License headers and verification seals.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-3xl border border-emerald-500/20 bg-[#0a1811] p-8 shadow-xl space-y-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Lock size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">5-Year Statutory Vault</h3>
            <p className="text-xs leading-relaxed text-slate-300">
              Article 8 of Federal Law 11/2024 mandates 5-year record retention. CarbonLedger encrypts and archives every activity record with SHA-256 proofs.
            </p>
          </div>

          {/* Card 4 */}
          <div className="rounded-3xl border border-emerald-500/20 bg-[#0a1811] p-8 shadow-xl space-y-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-300 border border-blue-500/30">
              <Building2 size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">Multi-Location Facilities</h3>
            <p className="text-xs leading-relaxed text-slate-300">
              Manage Dubai Industrial City HQ, JAFZA Warehouses, and Abu Dhabi Yards in one dashboard with consolidated or per-facility reporting.
            </p>
          </div>

          {/* Card 5 */}
          <div className="rounded-3xl border border-emerald-500/20 bg-[#0a1811] p-8 shadow-xl space-y-4">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <ShieldAlert size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">Fine Protection Shield</h3>
            <p className="text-xs leading-relaxed text-slate-300">
              Avoid penalties ranging from AED 50,000 to AED 2,000,000 before the May 30, 2026 enforcement deadline.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section (Starter 99, Growth 299, Enterprise 799, One-Time 499) */}
      <section id="pricing" className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-10 space-y-12 border-t border-emerald-500/20">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
            Transparent UAE Pricing
          </p>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Simple, Transparent Compliance
          </h2>
          <div className="inline-flex items-center gap-3 rounded-full border border-emerald-500/30 bg-emerald-950/40 p-1 text-xs font-semibold">
            <button
              onClick={() => setAnnualBilling(false)}
              className={`rounded-full px-4 py-1.5 transition-all ${
                !annualBilling ? 'bg-white text-slate-950 font-bold shadow-md' : 'text-slate-400'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnualBilling(true)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 transition-all ${
                annualBilling ? 'bg-emerald-400 text-slate-950 font-bold shadow-md' : 'text-slate-400'
              }`}
            >
              <span>Annual (20% Off)</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Starter Plan */}
          <div className="rounded-3xl border border-emerald-500/20 bg-[#0a1711] p-8 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Starter</h3>
              <p className="text-xs text-slate-400">For single-location businesses complying with UAE law.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">
                  AED {annualBilling ? '950/yr' : '99/mo'}
                </span>
              </div>

              <ul className="space-y-3 text-xs text-slate-300 pt-4 border-t border-white/10">
                {['1 UAE operational location', '1 annual MOCCAE compliance report', 'Scope 1 & 2 live calculator', 'DEWA/ADDC factor library', 'Email support'].map((x) => (
                  <li key={x} className="flex items-center gap-2">
                    <Check size={16} className="text-emerald-400 shrink-0" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/register?plan=starter"
              className="w-full rounded-2xl border border-emerald-500/30 bg-emerald-950/40 py-3.5 text-center text-xs font-bold text-white hover:bg-emerald-900/40 transition-colors"
            >
              Start Starter Trial
            </Link>
          </div>

          {/* Growth Plan — Most Popular */}
          <div className="rounded-3xl border-2 border-emerald-400 bg-gradient-to-br from-emerald-950 via-[#0e2419] to-[#07130c] p-8 shadow-2xl text-white flex flex-col justify-between space-y-6 relative overflow-hidden ring-1 ring-emerald-400">
            <div className="absolute top-4 right-4 rounded-full bg-emerald-400 px-3 py-1 text-[10px] font-black text-slate-950 uppercase tracking-wider">
              Most Popular
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Growth</h3>
              <p className="text-xs text-emerald-200/80">For companies with multiple sites and ongoing reporting.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">
                  AED {annualBilling ? '2,870/yr' : '299/mo'}
                </span>
              </div>

              <ul className="space-y-3 text-xs text-emerald-100 pt-4 border-t border-white/10">
                {[
                  'Up to 10 UAE locations / branches',
                  'Unlimited compliance PDF reports',
                  '5-Year auditable history vault',
                  'Utility invoice evidence storage',
                  'Priority compliance support',
                ].map((x) => (
                  <li key={x} className="flex items-center gap-2">
                    <Check size={16} className="text-emerald-400 shrink-0" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/register?plan=growth"
              className="w-full rounded-2xl bg-emerald-400 py-3.5 text-center text-xs font-black text-slate-950 shadow-xl shadow-emerald-500/30 hover:bg-emerald-300 transition-all"
            >
              Start Growth Trial
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="rounded-3xl border border-emerald-500/20 bg-[#0a1711] p-8 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Enterprise</h3>
              <p className="text-xs text-slate-400">For large industrial emitters (&gt;0.5M tCO2e) and hotel chains.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">
                  AED {annualBilling ? '7,670/yr' : '799/mo'}
                </span>
              </div>

              <ul className="space-y-3 text-xs text-slate-300 pt-4 border-t border-white/10">
                {[
                  'Unlimited locations & custom tags',
                  'Unlimited + custom report formats',
                  'Dedicated account manager',
                  'Audit liaison & verifier portal',
                  'API access & ERP CSV import',
                ].map((x) => (
                  <li key={x} className="flex items-center gap-2">
                    <Check size={16} className="text-emerald-400 shrink-0" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/register?plan=enterprise"
              className="w-full rounded-2xl border border-emerald-500/30 bg-emerald-950/40 py-3.5 text-center text-xs font-bold text-white hover:bg-emerald-900/40 transition-colors"
            >
              Contact Enterprise
            </Link>
          </div>
        </div>

        {/* One-Time Report Callout */}
        <div className="max-w-3xl mx-auto rounded-3xl border border-emerald-400/40 bg-gradient-to-r from-emerald-950/60 to-teal-950/60 p-6 sm:p-8 text-center space-y-3 shadow-xl">
          <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-300">
            Need Just a Single Compliance Report?
          </p>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            One-Time UAE Law Compliance Report — AED 499
          </h3>
          <p className="text-xs text-slate-300 max-w-xl mx-auto">
            No monthly subscription required. We generate your full verified MOCCAE-compliant GHG report delivered in 48 hours.
          </p>
          <div className="pt-2">
            <Link
              href="/register?type=onetime"
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-400 px-6 py-3 text-xs font-black text-slate-950 shadow-lg hover:bg-emerald-300 transition-colors"
            >
              Order 48-Hour Report for AED 499 <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="relative z-10 mx-auto max-w-4xl px-6 py-20 space-y-8 border-t border-emerald-500/20">
        <div className="text-center space-y-2">
          <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
            Regulatory Guidance
          </p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="divide-y divide-emerald-500/20 rounded-3xl border border-emerald-500/30 bg-[#0a1711] p-6 shadow-xl">
          {FAQS.map((faq, i) => (
            <div key={i} className="py-4 first:pt-0 last:pb-0">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between text-left text-sm font-bold text-white hover:text-emerald-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-slate-400 transition-transform duration-200 ${
                    openFaq === i ? 'rotate-180 text-emerald-400' : ''
                  }`}
                />
              </button>
              {openFaq === i && (
                <p className="mt-2 text-xs leading-relaxed text-slate-300 animate-in fade-in">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-emerald-500/20 bg-[#030704] px-6 py-12 text-xs text-slate-400">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-xl bg-emerald-400 text-slate-950 font-bold">
              <Leaf size={14} />
            </span>
            <span className="font-bold text-white">CarbonLedger UAE</span>
          </div>
          <p>© 2026 CarbonLedger. Built in the UAE for Federal Decree-Law No. 11/2024 compliance.</p>
          <div className="flex gap-4 font-bold text-slate-300">
            <Link href="/login" className="hover:text-emerald-400">
              Sign In
            </Link>
            <Link href="/calculator" className="hover:text-emerald-400">
              Free Lead Calculator
            </Link>
            <Link href="/register" className="hover:text-emerald-400">
              Start Free Trial
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
