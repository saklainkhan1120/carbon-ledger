'use client'

import Link from 'next/link'
import { ArrowLeft, Calculator, Home, LayoutDashboard, Leaf, ShieldAlert } from 'lucide-react'
import { Card3D } from '@/components/card-3d'
import { EnvironmentalBackground } from '@/components/environmental-background'

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-[#050a07] text-white selection:bg-emerald-400 selection:text-black flex flex-col justify-between p-6">
      <EnvironmentalBackground />

      <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight">
          <span className="flex size-9 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-slate-950 shadow-md shadow-emerald-500/20">
            <Leaf size={18} className="stroke-[2.5]" />
          </span>
          <span className="text-white font-black">Carbyn UAE</span>
        </Link>
      </header>

      <section className="relative z-10 mx-auto w-full max-w-md py-12 text-center space-y-6">
        <Card3D className="border-2 border-emerald-500/30 bg-[#0a1811]/90 p-8 sm:p-10 shadow-2xl backdrop-blur-2xl space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-6xl font-black text-emerald-400">404</span>
            <h1 className="text-2xl font-black tracking-tight text-white">
              Emissions Record Not Found
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              The compliance route or disclosure report you are looking for has been relocated or does not exist in the UAE statutory ledger.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 py-3 text-xs font-black text-slate-950 shadow-md hover:bg-emerald-300 transition-all"
            >
              <Home size={15} /> Return to Homepage
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 py-3 text-xs font-bold text-emerald-300 hover:bg-emerald-900/40 transition-colors"
            >
              <LayoutDashboard size={15} /> Go to Dashboard
            </Link>
          </div>
        </Card3D>
      </section>

      <footer className="relative z-10 text-center text-xs text-slate-400">
        © 2026 Carbyn UAE. Compliant with Federal Decree-Law No. 11/2024.
      </footer>
    </main>
  )
}
