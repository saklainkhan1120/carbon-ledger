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

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <main className="relative min-h-screen bg-[#050a07] text-white selection:bg-emerald-400 selection:text-black px-6 py-8 flex flex-col justify-between">
      <EnvironmentalBackground />

      {/* Top Header */}
      <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight">
          <span className="flex size-9 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-slate-950 shadow-md shadow-emerald-500/20">
            <Leaf size={18} className="stroke-[2.5]" />
          </span>
          <span className="text-white font-black">CarbonLedger UAE</span>
        </Link>
        <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 text-xs font-mono font-bold text-emerald-300">
          Step {step} of 3
        </span>
      </header>

      {/* Main Registration Card */}
      <section className="relative z-10 mx-auto w-full max-w-lg py-10 space-y-6">
        {/* Step Progress Bar */}
        <div className="h-2 w-full rounded-full bg-emerald-950/60 overflow-hidden border border-emerald-500/20">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300 rounded-full"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <Card3D className="border-2 border-emerald-500/30 bg-[#0a1811]/90 p-8 shadow-2xl backdrop-blur-2xl space-y-6">
          {/* Step 1: Work Account */}
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                  Step 1: Administrator Credentials
                </span>
                <h1 className="text-2xl font-black tracking-tight text-white">
                  Create Your Account
                </h1>
                <p className="text-xs text-slate-300">
                  Set up your administrative login for your UAE carbon workspace.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-200">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3 font-semibold text-white outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-200">Work Email Address</label>
                  <input
                    type="email"
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    required
                    placeholder="name@company.ae"
                    className="w-full rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3 font-semibold text-white outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-200">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3 font-semibold text-white outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-300 py-3.5 text-xs font-black text-slate-950 shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Continue to Business Details <ArrowRight size={15} />
              </button>

              <p className="text-center text-xs text-slate-400">
                Already have an account?{' '}
                <Link href="/login" className="font-bold text-emerald-400 hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          )}

          {/* Step 2: UAE Business Info */}
          {step === 2 && (
            <form onSubmit={handleNext} className="space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                  Step 2: Regulatory Verification
                </span>
                <h1 className="text-2xl font-black tracking-tight text-white">
                  UAE Company Details
                </h1>
                <p className="text-xs text-slate-300">
                  Pre-configures your regional emission factors (DEWA / ADDC / SEWA).
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-200">Company Legal Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3 font-semibold text-white outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-200">Trade License Number</label>
                  <input
                    type="text"
                    value={tradeLicense}
                    onChange={(e) => setTradeLicense(e.target.value)}
                    required
                    className="w-full rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3 font-semibold text-white outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-200">Primary Emirate</label>
                    <select
                      value={emirate}
                      onChange={(e) => setEmirate(e.target.value)}
                      className="w-full rounded-xl border border-emerald-500/30 bg-[#08150f] p-3 font-semibold text-white outline-none"
                    >
                      <option value="Dubai">Dubai (DEWA 0.45)</option>
                      <option value="Abu Dhabi">Abu Dhabi (ADDC 0.42)</option>
                      <option value="Sharjah">Sharjah (SEWA 0.47)</option>
                      <option value="Northern Emirates">Northern Emirates (FEWA 0.45)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-200">Sector</label>
                    <select
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      className="w-full rounded-xl border border-emerald-500/30 bg-[#08150f] p-3 font-semibold text-white outline-none"
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
                  className="rounded-2xl border border-emerald-500/30 px-5 py-3.5 text-xs font-bold text-slate-300 hover:bg-emerald-950/40"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-300 py-3.5 text-xs font-black text-slate-950 shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
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
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                  Step 3: Baseline Initialization
                </span>
                <h1 className="text-2xl font-black tracking-tight text-white">
                  Set Your GHG Baseline
                </h1>
                <p className="text-xs text-slate-300">
                  Configure your accounting period and facility count to launch your workspace.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-200">Historical Baseline Year</label>
                  <select
                    value={baseYear}
                    onChange={(e) => setBaseYear(e.target.value)}
                    className="w-full rounded-xl border border-emerald-500/30 bg-[#08150f] p-3 font-semibold text-white outline-none"
                  >
                    <option value="2025">FY 2025</option>
                    <option value="2024">FY 2024 (Recommended)</option>
                    <option value="2023">FY 2023</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-200">Total Operational Facilities</label>
                  <input
                    type="number"
                    value={facilitiesCount}
                    onChange={(e) => setFacilitiesCount(e.target.value)}
                    className="w-full rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3 font-semibold text-white outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                  />
                </div>

                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-4 space-y-1">
                  <p className="font-black text-emerald-300 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-emerald-400" /> Workspace Ready for Launch
                  </p>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Initialized with {emirate} factor standards ({emirate === 'Dubai' ? 'DEWA 0.45' : 'ADDC 0.42'}) and 5-year audit preservation vault.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-300 py-4 text-xs font-black text-slate-950 shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Launch CarbonLedger Workspace <ArrowRight size={15} />
              </button>
            </form>
          )}
        </Card3D>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center text-xs text-slate-400">
        © 2026 CarbonLedger UAE. Compliant with Federal Decree-Law No. 11/2024.
      </footer>
    </main>
  )
}
