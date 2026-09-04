'use client'

import { useState } from 'react'
import {
  Award,
  Building2,
  Check,
  CheckCircle2,
  CreditCard,
  FileCheck2,
  Globe,
  Key,
  Leaf,
  Plus,
  Save,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react'
import { PageHeading, PlatformShell } from '@/components/platform-shell'
import { useCarbonStore } from '@/lib/store'

export default function SettingsPage() {
  const { company, facilities, updateCompany, addFacility } = useCarbonStore()
  const [activeTab, setActiveTab] = useState<'profile' | 'facilities' | 'team' | 'billing' | 'factors'>('profile')

  // Profile form state
  const [name, setName] = useState(company.name)
  const [tradeLicense, setTradeLicense] = useState(company.tradeLicense)
  const [emirate, setEmirate] = useState(company.emirate)
  const [sector, setSector] = useState(company.sector)
  const [savedSuccess, setSavedSuccess] = useState(false)

  // New facility state
  const [showAddFacility, setShowAddFacility] = useState(false)
  const [newFacName, setNewFacName] = useState('')
  const [newFacEmirate, setNewFacEmirate] = useState('Dubai')
  const [newFacUtility, setNewFacUtility] = useState('DEWA')

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    updateCompany({ name, tradeLicense, emirate, sector })
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2500)
  }

  const handleCreateFacility = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newFacName) return
    addFacility({
      name: newFacName,
      emirate: newFacEmirate,
      utilityProvider: newFacUtility,
      metersCount: 2,
    })
    setNewFacName('')
    setShowAddFacility(false)
  }

  return (
    <PlatformShell>
      <PageHeading
        eyebrow="Organization Governance"
        title="Workspace Settings"
        description="Manage company trade license details, UAE operational facilities, team permissions, and compliance presets."
      />

      {savedSuccess && (
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 size={18} />
          <span>Company profile updated successfully and synced with MOCCAE disclosure headers!</span>
        </div>
      )}

      {/* 5 Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-border/80 pb-3 text-xs font-bold">
        {[
          { id: 'profile', label: 'Company Profile', icon: Building2 },
          { id: 'facilities', label: 'UAE Facilities & Meters', icon: Globe },
          { id: 'team', label: 'Team Members & Roles', icon: Users },
          { id: 'billing', label: 'Billing & Plan', icon: CreditCard },
          { id: 'factors', label: 'Regional Emission Factors', icon: Leaf },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/20'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab 1: Company Profile */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-border/80 pb-4">
            <h2 className="text-base font-bold text-foreground">Official UAE Legal Registration</h2>
            <p className="text-xs text-muted-foreground">Used on MOCCAE disclosure headers and cryptographic audit certificates</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-muted-foreground">Company Legal Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl border border-input bg-background p-3 font-semibold text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-muted-foreground">UAE Trade License Number</label>
              <input
                type="text"
                value={tradeLicense}
                onChange={(e) => setTradeLicense(e.target.value)}
                required
                className="w-full rounded-xl border border-input bg-background p-3 font-semibold text-foreground font-mono outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-muted-foreground">Primary Emirate Jurisdiction</label>
              <select
                value={emirate}
                onChange={(e) => setEmirate(e.target.value)}
                className="w-full rounded-xl border border-input bg-background p-3 font-semibold text-foreground outline-none"
              >
                <option value="Dubai">Dubai (DEWA Factor 0.45)</option>
                <option value="Abu Dhabi">Abu Dhabi (ADDC Factor 0.42)</option>
                <option value="Sharjah">Sharjah (SEWA Factor 0.47)</option>
                <option value="Northern Emirates">Northern Emirates (FEWA Factor 0.45)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-muted-foreground">Industry Sector</label>
              <input
                type="text"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                required
                className="w-full rounded-xl border border-input bg-background p-3 font-semibold text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-border">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-xs font-bold text-primary-foreground shadow-sm hover:opacity-90 transition-all"
            >
              <Save size={16} /> Save Profile Changes
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: UAE Facilities & Meters */}
      {activeTab === 'facilities' && (
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
            <div>
              <h2 className="text-base font-bold text-foreground">Operational Locations & Sub-Meters</h2>
              <p className="text-xs text-muted-foreground">Manage facilities across Dubai, Abu Dhabi, Sharjah, and Northern Emirates</p>
            </div>
            <button
              onClick={() => setShowAddFacility(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition-colors"
            >
              <Plus size={15} /> Add New Facility
            </button>
          </div>

          {showAddFacility && (
            <form onSubmit={handleCreateFacility} className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 space-y-4 text-xs animate-in fade-in">
              <h3 className="font-bold text-foreground">Register New Facility</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-muted-foreground">Facility Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Al Quoz Logistics Hub"
                    value={newFacName}
                    onChange={(e) => setNewFacName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-input bg-background p-2.5 outline-none font-semibold text-foreground"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-muted-foreground">Emirate</label>
                  <select
                    value={newFacEmirate}
                    onChange={(e) => setNewFacEmirate(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background p-2.5 outline-none font-semibold text-foreground"
                  >
                    <option value="Dubai">Dubai</option>
                    <option value="Abu Dhabi">Abu Dhabi</option>
                    <option value="Sharjah">Sharjah</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-muted-foreground">Utility Authority</label>
                  <select
                    value={newFacUtility}
                    onChange={(e) => setNewFacUtility(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background p-2.5 outline-none font-semibold text-foreground"
                  >
                    <option value="DEWA">DEWA (Dubai)</option>
                    <option value="ADDC">ADDC (Abu Dhabi)</option>
                    <option value="SEWA">SEWA (Sharjah)</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-xs"
                >
                  Save Facility
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddFacility(false)}
                  className="rounded-xl border border-border px-3 py-2 text-xs hover:bg-muted"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {facilities.map((f) => (
              <div
                key={f.id}
                className="rounded-2xl border border-border bg-muted/20 p-5 space-y-3 hover:border-emerald-500/40 transition-all shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                    {f.emirate}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">{f.utilityProvider}</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground">{f.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{f.metersCount} Registered Power Meters</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Team Members & RBAC Roles */}
      {activeTab === 'team' && (
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-border/80 pb-4">
            <div>
              <h2 className="text-base font-bold text-foreground">Team Access & Sign-off Roles</h2>
              <p className="text-xs text-muted-foreground">Manage RBAC roles for sustainability officers and certified verifiers</p>
            </div>
            <button className="rounded-2xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700">
              <Plus size={15} /> Invite Team Member
            </button>
          </div>

          <div className="divide-y divide-border">
            {[
              { name: 'Aisha Khan', email: 'aisha.k@alnoormfg.ae', role: 'Lead ESG Director (Owner)' },
              { name: 'Dr. Tariq Al-Nuaimi', email: 'tariq.audit@moccae-verifier.ae', role: 'Accredited Lead Auditor' },
              { name: 'Zaid Mansour', email: 'zaid.m@alnoormfg.ae', role: 'Operations & Facility Manager' },
            ].map((member, i) => (
              <div key={i} className="flex items-center justify-between py-4 first:pt-0 last:pb-0 text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 font-bold">
                    {member.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{member.name}</p>
                    <p className="text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <span className="rounded-full bg-muted border border-border px-3 py-1 font-semibold text-foreground">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Billing & Plans */}
      {activeTab === 'billing' && (
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-border/80 pb-4">
            <h2 className="text-base font-bold text-foreground">Subscription & Active License</h2>
            <p className="text-xs text-muted-foreground">Manage payment methods, invoices, and multi-location license tiers</p>
          </div>

          <div className="rounded-2xl border-2 border-emerald-600 bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 p-6 text-white space-y-4">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-emerald-400 px-3 py-1 text-[10px] font-black text-slate-950 uppercase tracking-wider">
                Current Active Plan
              </span>
              <span className="text-xs font-mono font-bold text-emerald-300">Renewal: Aug 2027</span>
            </div>
            <div>
              <h3 className="text-2xl font-black">Growth Annual License</h3>
              <p className="text-xs text-emerald-200/80 mt-1">AED 2,870 / year · Up to 10 UAE facilities & unlimited MOCCAE reports</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Regional Factors */}
      {activeTab === 'factors' && (
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-border/80 pb-4">
            <h2 className="text-base font-bold text-foreground">UAE Standard Emission Factors Registry</h2>
            <p className="text-xs text-muted-foreground">Official factors published for UAE Federal Decree-Law No. 11 of 2024</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            {[
              { name: 'DEWA Grid Electricity (Dubai)', factor: '0.450 kgCO₂e/kWh' },
              { name: 'ADDC Grid Electricity (Abu Dhabi)', factor: '0.420 kgCO₂e/kWh' },
              { name: 'SEWA Grid Electricity (Sharjah)', factor: '0.470 kgCO₂e/kWh' },
              { name: 'Commercial Diesel Fleet', factor: '2.680 kgCO₂e/L' },
              { name: 'Motor Petrol Transport', factor: '2.310 kgCO₂e/L' },
              { name: 'LPG Commercial 11kg Cylinders', factor: '16.610 kgCO₂e/cyl' },
            ].map((f, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-xl border border-border bg-muted/20 p-3.5">
                <span className="text-foreground font-sans font-semibold">{f.name}</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400">{f.factor}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </PlatformShell>
  )
}
