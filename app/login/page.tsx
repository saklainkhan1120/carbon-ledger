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
  const [errorMsg, setErrorMsg] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        router.push(data.targetPath || '/dashboard')
      } else {
        setErrorMsg(data.error || 'Login failed')
      }
    } catch {
      // Fallback redirect
      if (email.includes('admin')) {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    } finally {
      setLoading(false)
    }
  }

  const selectPersona = async (persona: (typeof DEMO_PERSONAS)[0]) => {
    setEmail(persona.email)
    setPassword('••••••••••••')
    setLoading(true)
    try {
      await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: persona.email, password: 'password123' }),
      })
    } catch {}
    router.push(persona.targetPath)
  }

  return (
    <main className="relative min-h-screen bg-slate-50/50 text-slate-900 selection:bg-emerald-500 selection:text-white flex flex-col justify-between p-6 overflow-hidden">
      <EnvironmentalBackground />

      {/* Top Header */}
      <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight">
          <span className="flex size-9 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-700/20">
            <Leaf size={18} className="stroke-[2.5]" />
          </span>
          <span className="text-slate-950 font-black">
            Car<span className="text-emerald-600">byn</span> UAE
          </span>
        </Link>
        <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-white/90 px-3.5 py-1 text-xs font-bold text-emerald-800 shadow-sm backdrop-blur-md">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          Federal Law 11/2024 Portal
        </div>
      </header>

      {/* Center Auth Card */}
      <section className="relative z-10 mx-auto w-full max-w-md py-12 space-y-6">
        <Card3D className="border border-emerald-100 bg-white/95 p-8 shadow-2xl shadow-emerald-950/8 backdrop-blur-2xl space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-black tracking-tight text-slate-950">
              Sign In to Your Workspace
            </h1>
            <p className="text-xs text-slate-500">
              Access your UAE GHG emissions compliance dashboard
            </p>
          </div>

          {/* 1-Click Persona Switcher */}
          <div className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <Sparkles size={13} className="text-emerald-600" />
              1-Click Demo Persona Switcher:
            </p>
            <div className="grid grid-cols-1 gap-2">
              {DEMO_PERSONAS.map((p) => (
                <button
                  key={p.role}
                  type="button"
                  onClick={() => selectPersona(p)}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 p-3 text-left hover:border-emerald-400 hover:bg-emerald-50/50 transition-all text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-700 shadow-sm font-bold">
                      {p.name.charAt(0)}
                    </span>
                    <div>
                      <p className="font-bold text-slate-900">{p.name}</p>
                      <p className="text-[10px] text-slate-500">{p.company}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 text-[9px] font-mono font-bold">
                    {p.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[10px] uppercase font-bold text-slate-400 absolute">
              Or Sign In With Email
            </span>
          </div>

          {errorMsg && (
            <div className="rounded-xl bg-rose-50 border border-rose-200 p-2.5 text-xs text-rose-700">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Work Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="name@company.ae"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Password</label>
                <a href="#" className="text-[11px] text-emerald-600 hover:underline">
                  Forgot?
                </a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 py-3.5 text-xs font-black text-white shadow-xl shadow-emerald-700/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In to Workspace'} <ArrowRight size={15} />
            </button>
          </form>

          <p className="text-center text-xs text-slate-500">
            Don&apos;t have an organization workspace?{' '}
            <Link href="/register" className="font-bold text-emerald-600 hover:underline">
              Create free account
            </Link>
          </p>
        </Card3D>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center text-xs text-slate-500">
        © 2026 Carbyn UAE. Compliant with Federal Decree-Law No. 11/2024.
      </footer>
    </main>
  )
}
