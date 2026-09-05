'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  Leaf,
  Lock,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from 'lucide-react'
import { Card3D } from '@/components/card-3d'
import { EnvironmentalBackground } from '@/components/environmental-background'

const DEMO_PERSONAS = [
  {
    role: 'Client ESG Director',
    name: 'Aisha Khan',
    email: 'aisha.k@alnoormfg.ae',
    company: 'Al Noor Manufacturing LLC (Dubai HQ)',
    badge: 'Standard User',
    targetPath: '/dashboard',
  },
  {
    role: 'Super Admin Portal',
    name: 'Super Admin',
    email: 'admin@carbyn.ae',
    company: 'Carbyn UAE Authority',
    badge: 'Full Governance',
    targetPath: '/admin',
  },
]

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('aisha.k@alnoormfg.ae')
  const [password, setPassword] = useState('••••••••••••')
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      if (email.includes('admin')) {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    }, 600)
  }

  const selectPersona = (persona: (typeof DEMO_PERSONAS)[0]) => {
    setEmail(persona.email)
    setPassword('••••••••••••')
    setLoading(true)
    setTimeout(() => {
      router.push(persona.targetPath)
    }, 500)
  }

  return (
    <main className="relative min-h-screen bg-[#050a07] text-white selection:bg-emerald-400 selection:text-black flex flex-col justify-between p-6">
      <EnvironmentalBackground />

      {/* Top Header */}
      <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight">
          <span className="flex size-9 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-slate-950 shadow-md shadow-emerald-500/20">
            <Leaf size={18} className="stroke-[2.5]" />
          </span>
          <span className="text-white font-black">
            Car<span className="text-emerald-400">byn</span> UAE
          </span>
        </Link>
        <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs font-bold text-emerald-300">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          Federal Law 11/2024 Portal
        </div>
      </header>

      {/* Center Auth Card */}
      <section className="relative z-10 mx-auto w-full max-w-md py-12 space-y-6">
        <Card3D className="border-2 border-emerald-500/30 bg-[#0a1811]/90 p-8 shadow-2xl backdrop-blur-2xl space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-black tracking-tight text-white">
              Sign In to Your Workspace
            </h1>
            <p className="text-xs text-slate-300">
              Access your UAE GHG emissions compliance dashboard
            </p>
          </div>

          {/* 1-Click Persona Switcher */}
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
              1-Click Instant Demo Login
            </p>
            <div className="space-y-2">
              {DEMO_PERSONAS.map((p) => (
                <button
                  key={p.role}
                  type="button"
                  onClick={() => selectPersona(p)}
                  className="flex w-full items-center justify-between rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-3 text-left hover:border-emerald-400 hover:bg-emerald-950/70 transition-all text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-xs">
                      {p.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-white">{p.name}</p>
                      <p className="text-[10px] text-slate-400">{p.company}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[9px] font-bold text-emerald-300">
                    {p.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-emerald-500/20 w-full" />
            <span className="bg-[#0a1811] px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Or Manual Email
            </span>
          </div>

          {/* Standard Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-200">Work Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3 font-semibold text-white outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between">
                <label className="font-bold text-slate-200">Password</label>
                <a href="#" className="text-emerald-400 hover:underline text-[11px]">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3 font-semibold text-white outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-300 py-3.5 text-xs font-black text-slate-950 shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              {loading ? (
                <span>Authenticating with SHA-256...</span>
              ) : (
                <>
                  Sign In to UAE Workspace <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400">
            Don&apos;t have an organization workspace?{' '}
            <Link href="/register" className="font-bold text-emerald-400 hover:underline">
              Create free account
            </Link>
          </p>
        </Card3D>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center text-xs text-slate-400">
        © 2026 Carbyn UAE. Compliant with Federal Decree-Law No. 11/2024.
      </footer>
    </main>
  )
}
