'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Globe,
  Leaf,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react'
import { Card3D } from '@/components/card-3d'
import { EnvironmentalBackground } from '@/components/environmental-background'

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // Form State
  const [fullName, setFullName] = useState('Sarah Ahmed')
  const [workEmail, setWorkEmail] = useState('sarah.a@company.ae')
  const [password, setPassword] = useState('SecurePass123!')
  const [companyName, setCompanyName] = useState('Emirates Clean Energy & Industrial LLC')
  const [tradeLicense, setTradeLicense] = useState('CN-2094182-DXB')
  const [emirate, setEmirate] = useState('Dubai')
  const [sector, setSector] = useState('Industrial & Manufacturing')
  const [baseYear, setBaseYear] = useState('2024')
  const [facilitiesCount, setFacilitiesCount] = useState('2')

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    if (step < 3) {
      setStep(step + 1)
    } else {
      setLoading(true)
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: fullName,
            email: workEmail,
            password,
            companyName,
            tradeLicense,
            emirate,
            sector,
          }),
        })
        const data = await res.json()
        if (res.ok && data.success) {
          router.push('/dashboard')
        } else {
          setErrorMsg(data.error || 'Registration failed')
          // Fallback redirect for demo
          setTimeout(() => router.push('/dashboard'), 1000)
        }
      } catch {
        router.push('/dashboard')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <main className="relative min-h-screen bg-slate-50/50 text-slate-900 selection:bg-emerald-500 selection:text-white px-6 py-8 flex flex-col justify-between overflow-hidden">
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
        <span className="rounded-full bg-emerald-100 border border-emerald-200 px-3 py-1 text-xs font-mono font-bold text-emerald-800 shadow-sm">
          Step {step} of 3
        </span>
      </header>

      {/* Main Registration Card */}
      <section className="relative z-10 mx-auto w-full max-w-lg py-10 space-y-6">
        {/* Step Progress Bar */}
        <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden border border-slate-300/60">
          <div
            className="h-full bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-300 rounded-full"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <Card3D className="border border-emerald-100 bg-white/95 p-8 shadow-2xl shadow-emerald-950/8 backdrop-blur-2xl space-y-6">
          {errorMsg && (
            <div className="rounded-xl bg-rose-50 border border-rose-200 p-2.5 text-xs text-rose-700">
              {errorMsg}
            </div>
          )}

          {/* Step 1: Work Account */}
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
                  Step 1: Administrator Credentials
                </span>
                <h1 className="text-2xl font-black tracking-tight text-slate-950">
                  Create Your Account
                </h1>
                <p className="text-xs text-slate-500">
                  Set up your administrative login for your UAE carbon workspace.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 font-semibold text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Work Email Address</label>
                  <input
                    type="email"
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    required
                    placeholder="name@company.ae"
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 font-semibold text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 font-semibold text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 py-3.5 text-xs font-black text-white shadow-xl shadow-emerald-700/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Continue to Business Details <ArrowRight size={15} />
              </button>

              <p className="text-center text-xs text-slate-500">
                Already have an account?{' '}
                <Link href="/login" className="font-bold text-emerald-600 hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          )}

          {/* Step 2: UAE Business Info */}
          {step === 2 && (
            <form onSubmit={handleNext} className="space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
                  Step 2: Regulatory Verification
                </span>
                <h1 className="text-2xl font-black tracking-tight text-slate-950">
                  UAE Company Details
                </h1>
                <p className="text-xs text-slate-500">
                  Pre-configures your regional emission factors (DEWA / ADDC / SEWA).
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Company Legal Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 font-semibold text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Trade License Number</label>
                  <input
                    type="text"
                    value={tradeLicense}
                    onChange={(e) => setTradeLicense(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 font-semibold text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Primary Emirate</label>
                    <select
                      value={emirate}
                      onChange={(e) => setEmirate(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white p-3 font-semibold text-slate-900 outline-none"
                    >
                      <option value="Dubai">Dubai (DEWA 0.45)</option>
                      <option value="Abu Dhabi">Abu Dhabi (ADDC 0.42)</option>
                      <option value="Sharjah">Sharjah (SEWA 0.47)</option>
                      <option value="Northern Emirates">Northern Emirates (FEWA 0.45)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Sector</label>
                    <select
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white p-3 font-semibold text-slate-900 outline-none"
                    >
                      <option value="Industrial & Manufacturing">Manufacturing</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Logistics">Logistics</option>
                      <option value="Corporate / Tech">Corporate</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 py-3.5 text-xs font-black text-white shadow-xl shadow-emerald-700/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  Continue to Baseline <ArrowRight size={15} />
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Carbon Baseline Setup */}
          {step === 3 && (
            <form onSubmit={handleNext} className="space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
                  Step 3: Baseline Initialization
                </span>
                <h1 className="text-2xl font-black tracking-tight text-slate-950">
                  Set Your GHG Baseline
                </h1>
                <p className="text-xs text-slate-500">
                  Configure your accounting period and facility count to launch your workspace.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Historical Baseline Year</label>
                  <select
                    value={baseYear}
                    onChange={(e) => setBaseYear(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 font-semibold text-slate-900 outline-none"
                  >
                    <option value="2025">FY 2025</option>
                    <option value="2024">FY 2024 (Recommended)</option>
                    <option value="2023">FY 2023</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Total Operational Facilities</label>
                  <input
                    type="number"
                    value={facilitiesCount}
                    onChange={(e) => setFacilitiesCount(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 font-semibold text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 space-y-1">
                  <p className="font-black text-emerald-800 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-emerald-600" /> Workspace Ready for Launch
                  </p>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Initialized with {emirate} factor standards ({emirate === 'Dubai' ? 'DEWA 0.45' : 'ADDC 0.42'}) and 5-year audit preservation vault.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 py-4 text-xs font-black text-white shadow-xl shadow-emerald-700/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Initializing Database Workspace...' : 'Launch Carbyn Workspace'} <ArrowRight size={15} />
              </button>
            </form>
          )}
        </Card3D>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center text-xs text-slate-500">
        © 2026 Carbyn UAE. Compliant with Federal Decree-Law No. 11/2024.
      </footer>
    </main>
  )
}
