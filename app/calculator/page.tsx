'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Building2,
  Calculator as CalculatorIcon,
  CheckCircle2,
  Download,
  Flame,
  Globe,
  Leaf,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Sun,
  Trees,
  Zap,
} from 'lucide-react'
import { Card3D } from '@/components/card-3d'
import { EnvironmentalBackground } from '@/components/environmental-background'
import { formatNumber, formatTCO2e } from '@/lib/utils'

const SECTOR_PRESETS = [
  {
    name: 'Industrial & Manufacturing',
    electricity: '85000',
    diesel: '4500',
    petrol: '600',
    vehicles: '8000',
  },
  {
    name: 'Corporate Office & Services',
    electricity: '25000',
    diesel: '200',
    petrol: '400',
    vehicles: '4500',
  },
  {
    name: 'Logistics & Fleet Transport',
    electricity: '18000',
    diesel: '18500',
    petrol: '1200',
    vehicles: '35000',
  },
  {
    name: 'Hospitality & Hotels',
    electricity: '140000',
    diesel: '2800',
    petrol: '500',
    vehicles: '6000',
  },
]

export default function PublicCalculatorPage() {
  const [electricity, setElectricity] = useState('14000') // DEWA factor 0.45 kg/kWh
  const [diesel, setDiesel] = useState('500') // Commercial Diesel 2.68 kg/L
  const [petrol, setPetrol] = useState('150') // Petrol 2.31 kg/L
  const [vehicleKm, setVehicleKm] = useState('3500') // 0.21 kg/km

  // Math: DEWA (0.45), Diesel (2.68), Petrol (2.31), Vehicles (0.21)
  const scope1Kg =
    (Number(diesel) || 0) * 2.68 + (Number(petrol) || 0) * 2.31 + (Number(vehicleKm) || 0) * 0.21
  const scope2Kg = (Number(electricity) || 0) * 0.45

  const totalKg = scope1Kg + scope2Kg
  const totalTCO2e = totalKg / 1000

  // Environmental impact equivalence math
  const mangroveEquivalent = Math.round(totalTCO2e * 12 * 45) // Seedlings required
  const solarRoofOffsetKwh = Math.round((Number(electricity) || 0) * 0.65)

  const applyPreset = (preset: (typeof SECTOR_PRESETS)[0]) => {
    setElectricity(preset.electricity)
    setDiesel(preset.diesel)
    setPetrol(preset.petrol)
    setVehicleKm(preset.vehicles)
  }

  return (
    <main className="relative min-h-screen bg-slate-50/50 text-slate-900 selection:bg-emerald-500 selection:text-white overflow-hidden">
      {/* Background Bio-Luminescent Particles */}
      <EnvironmentalBackground />

      {/* Top Header */}
      <header className="relative z-10 border-b border-emerald-100 bg-white/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight">
            <span className="flex size-9 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-700/20">
              <Leaf size={18} className="stroke-[2.5]" />
            </span>
            <span className="text-slate-950 font-black">
              Car<span className="text-emerald-600">byn</span> UAE
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Homepage
          </Link>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-6xl px-6 py-12 space-y-10">
        {/* Title & Law Notice */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800 backdrop-blur-md">
            <CalculatorIcon size={14} className="text-emerald-600" /> Free UAE Law 11/2024 Estimator
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 leading-tight">
            Estimate Your UAE Carbon Footprint
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed font-normal">
            Enter your monthly DEWA electricity and fuel consumption to get an instant Scope 1 & Scope 2 calculation under UAE Federal Decree-Law No. 11 of 2024.
          </p>
        </div>

        {/* Sector Presets */}
        <div className="space-y-3">
          <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-700">
            Quick UAE Industry Benchmarks
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SECTOR_PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => applyPreset(p)}
                className="rounded-2xl border border-slate-200 bg-white p-4 text-left text-xs font-semibold hover:border-emerald-400 hover:bg-emerald-50/40 transition-all shadow-md"
              >
                <span className="text-slate-900 block font-bold truncate">{p.name}</span>
                <span className="text-[11px] text-emerald-700 font-bold mt-1 block">
                  Load UAE numbers →
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Form & Live Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Console */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl space-y-6">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Zap size={18} className="text-emerald-600" /> Monthly Operational Consumption
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
              <div className="space-y-2">
                <div className="flex justify-between font-bold text-slate-700">
                  <label>DEWA Electricity (Dubai)</label>
                  <span className="text-emerald-700 font-mono">0.45 kg/kWh</span>
                </div>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/20">
                  <input
                    type="number"
                    value={electricity}
                    onChange={(e) => setElectricity(e.target.value)}
                    className="w-full py-3 bg-transparent font-mono font-bold outline-none text-slate-900 text-sm"
                  />
                  <span className="text-slate-500 font-bold">kWh/mo</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between font-bold text-slate-700">
                  <label>Commercial Diesel Fleet</label>
                  <span className="text-emerald-700 font-mono">2.68 kg/L</span>
                </div>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/20">
                  <input
                    type="number"
                    value={diesel}
                    onChange={(e) => setDiesel(e.target.value)}
                    className="w-full py-3 bg-transparent font-mono font-bold outline-none text-slate-900 text-sm"
                  />
                  <span className="text-slate-500 font-bold">Litres/mo</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between font-bold text-slate-700">
                  <label>Motor Petrol</label>
                  <span className="text-emerald-700 font-mono">2.31 kg/L</span>
                </div>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/20">
                  <input
                    type="number"
                    value={petrol}
                    onChange={(e) => setPetrol(e.target.value)}
                    className="w-full py-3 bg-transparent font-mono font-bold outline-none text-slate-900 text-sm"
                  />
                  <span className="text-slate-500 font-bold">Litres/mo</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between font-bold text-slate-700">
                  <label>Company Vehicle Travel</label>
                  <span className="text-emerald-700 font-mono">0.21 kg/km</span>
                </div>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/20">
                  <input
                    type="number"
                    value={vehicleKm}
                    onChange={(e) => setVehicleKm(e.target.value)}
                    className="w-full py-3 bg-transparent font-mono font-bold outline-none text-slate-900 text-sm"
                  />
                  <span className="text-slate-500 font-bold">km/mo</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setElectricity('0')
                  setDiesel('0')
                  setPetrol('0')
                  setVehicleKm('0')
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
              >
                <RotateCcw size={14} /> Clear all values
              </button>
              <span className="text-[11px] text-emerald-700 font-mono font-bold">
                DEWA & MOCCAE 2026 Standards
              </span>
            </div>
          </div>

          {/* 3D Result Output Card */}
          <div className="lg:col-span-5 space-y-6">
            <Card3D className="border border-emerald-600/30 bg-gradient-to-br from-emerald-700 via-teal-800 to-emerald-900 p-6 sm:p-8 text-white shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-emerald-200">
                  Calculated Monthly Output
                </span>
                <span className="rounded-full bg-emerald-400/20 border border-emerald-400/30 px-3 py-0.5 text-[10px] font-bold text-emerald-200">
                  DEWA 0.45
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-white">{formatTCO2e(totalTCO2e, 2)}</span>
                  <span className="text-base font-bold text-emerald-200">tCO₂e / mo</span>
                </div>
                <p className="text-xs text-emerald-100 mt-1">
                  Scope 1: {formatTCO2e(scope1Kg / 1000, 2)} tCO₂e | Scope 2: {formatTCO2e(scope2Kg / 1000, 2)} tCO₂e
                </p>
              </div>

              {/* Environmental Impact Equivalencies */}
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-4 space-y-2 text-xs">
                <p className="font-bold text-emerald-200 uppercase tracking-wider text-[11px]">
                  🌱 Real-World Environmental Equivalencies
                </p>
                <div className="flex items-center justify-between text-emerald-100">
                  <span className="flex items-center gap-1.5">
                    <Trees size={14} className="text-emerald-300" /> Mangrove Seedlings:
                  </span>
                  <span className="font-mono font-bold text-white">{formatNumber(mangroveEquivalent)} trees</span>
                </div>
                <div className="flex items-center justify-between text-emerald-100">
                  <span className="flex items-center gap-1.5">
                    <Sun size={14} className="text-amber-300" /> Solar Rooftop Offset:
                  </span>
                  <span className="font-mono font-bold text-white">{formatNumber(solarRoofOffsetKwh)} kWh/mo</span>
                </div>
              </div>

              {/* Lead Magnet CTA from PDF (AED 499 One-Time) */}
              <div className="rounded-2xl border border-amber-400/40 bg-amber-950/40 p-4 space-y-1.5 text-xs">
                <p className="font-bold text-amber-200">Get your full UAE law compliance report — AED 499</p>
                <p className="text-[11px] text-amber-100/80 leading-snug">
                  Includes full MOCCAE audit breakdown, trade license header, and 5-year record archival. Delivered in 48 hours.
                </p>
              </div>

              <div className="pt-2 space-y-2.5">
                <Link
                  href="/register?plan=growth"
                  className="flex items-center justify-center gap-2 w-full rounded-2xl bg-white py-3.5 text-xs font-black text-emerald-950 shadow-xl hover:bg-emerald-50 transition-all"
                >
                  Start Free 14-Day Trial <ArrowRight size={15} />
                </Link>
                <Link
                  href="/register?type=onetime"
                  className="flex items-center justify-center gap-2 w-full rounded-2xl border border-emerald-400/30 bg-emerald-950/40 py-2.5 text-xs font-bold text-emerald-200 hover:bg-emerald-900/40 transition-colors"
                >
                  Order 1-Time Compliance Report (AED 499)
                </Link>
              </div>
            </Card3D>
          </div>
        </div>
      </section>
    </main>
  )
}
