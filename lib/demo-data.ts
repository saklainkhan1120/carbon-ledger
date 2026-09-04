export interface Facility {
  id: string
  name: string
  emirate: 'Dubai' | 'Abu Dhabi' | 'Sharjah' | 'Ajman' | 'Ras Al Khaimah' | 'Fujairah'
  type: 'Headquarters' | 'Manufacturing Plant' | 'Logistics Hub' | 'Retail Branch'
  areaSqM: number
  activeMeters: number
}

export interface EmissionRecord {
  id: string
  period: string // e.g. 'Aug 2026'
  date: string
  facilityId: string
  facilityName: string
  scope: 'Scope 1' | 'Scope 2' | 'Scope 3'
  activityType: string
  quantity: number
  unit: string
  factorId: string
  factorName: string
  factorValue: number
  emissionsTCO2e: number
  evidenceFile?: string
  evidenceStatus: 'Verified' | 'Pending Review' | 'Missing Document'
  auditReady: boolean
  loggedBy: string
}

export interface GeneratedReport {
  id: string
  title: string
  reportingYear: string
  framework: 'GHG Protocol Corporate Standard' | 'UAE Net Zero 2050 Charter' | 'DFM / ADX ESG Guide' | 'ISO 14064-1'
  totalEmissionsTCO2e: number
  scope1TCO2e: number
  scope2TCO2e: number
  scope3TCO2e: number
  generatedAt: string
  status: 'Audited & Certified' | 'Ready for Review' | 'Draft'
  pages: number
  fileFormat: 'PDF' | 'XLSX'
  verificationHash: string
}

export const DEMO_COMPANY = {
  name: 'Al Noor Manufacturing LLC',
  tradeLicense: 'CN-1049281-DXB',
  emirate: 'Dubai',
  sector: 'Heavy Industrial & Metals',
  employees: 480,
  reportingYear: '2025',
  baseYear: '2022',
  targetReductionPct: 35,
  netZeroTargetYear: 2045,
  currentPlan: 'Professional',
  billingPeriod: 'Annual (Next renewal: 15 Dec 2026)',
}

export const DEMO_FACILITIES: Facility[] = [
  {
    id: 'fac-1',
    name: 'Dubai Industrial City Plant (HQ)',
    emirate: 'Dubai',
    type: 'Manufacturing Plant',
    areaSqM: 32000,
    activeMeters: 8,
  },
  {
    id: 'fac-2',
    name: 'JAFZA Logistics & Distribution Hub',
    emirate: 'Dubai',
    type: 'Logistics Hub',
    areaSqM: 18500,
    activeMeters: 4,
  },
  {
    id: 'fac-3',
    name: 'ICAD Abu Dhabi Fabrication Yard',
    emirate: 'Abu Dhabi',
    type: 'Manufacturing Plant',
    areaSqM: 24000,
    activeMeters: 6,
  },
]

export const DEMO_MONTHLY_TREND = [
  { month: 'Jan', scope1: 34.2, scope2: 74.8, scope3: 12.4, target: 125.0 },
  { month: 'Feb', scope1: 31.5, scope2: 68.2, scope3: 11.0, target: 125.0 },
  { month: 'Mar', scope1: 38.6, scope2: 71.4, scope3: 14.2, target: 125.0 },
  { month: 'Apr', scope1: 29.4, scope2: 64.1, scope3: 10.5, target: 120.0 },
  { month: 'May', scope1: 27.8, scope2: 57.5, scope3: 9.8, target: 120.0 },
  { month: 'Jun', scope1: 25.1, scope2: 51.2, scope3: 8.9, target: 120.0 },
  { month: 'Jul', scope1: 28.3, scope2: 59.0, scope3: 10.1, target: 115.0 },
  { month: 'Aug', scope1: 26.7, scope2: 54.6, scope3: 9.4, target: 115.0 },
  { month: 'Sep (Est)', scope1: 24.5, scope2: 50.0, scope3: 8.5, target: 110.0 },
]

export const INITIAL_RECORDS: EmissionRecord[] = [
  {
    id: 'rec-1',
    period: 'Aug 2026',
    date: '2026-08-31',
    facilityId: 'fac-1',
    facilityName: 'Dubai Industrial City Plant (HQ)',
    scope: 'Scope 2',
    activityType: 'DEWA Grid Electricity',
    quantity: 130000,
    unit: 'kWh',
    factorId: 'dewa-electricity',
    factorName: 'DEWA Grid Electricity (Dubai)',
    factorValue: 0.420,
    emissionsTCO2e: 54.6,
    evidenceFile: 'DEWA_Bill_Aug2026_DIC.pdf',
    evidenceStatus: 'Verified',
    auditReady: true,
    loggedBy: 'Aisha Khan',
  },
  {
    id: 'rec-2',
    period: 'Aug 2026',
    date: '2026-08-28',
    facilityId: 'fac-2',
    facilityName: 'JAFZA Logistics & Distribution Hub',
    scope: 'Scope 1',
    activityType: 'Heavy Commercial Fleet Diesel',
    quantity: 9960,
    unit: 'Litres',
    factorId: 'diesel-uae',
    factorName: 'Commercial Diesel (ENOC / ADNOC)',
    factorValue: 2.68,
    emissionsTCO2e: 26.7,
    evidenceFile: 'ENOC_Fleet_Statement_Aug2026.pdf',
    evidenceStatus: 'Verified',
    auditReady: true,
    loggedBy: 'Omar Rahman',
  },
  {
    id: 'rec-3',
    period: 'Aug 2026',
    date: '2026-08-25',
    facilityId: 'fac-1',
    facilityName: 'Dubai Industrial City Plant (HQ)',
    scope: 'Scope 3',
    activityType: 'Desalinated Industrial Water',
    quantity: 1940,
    unit: 'm³',
    factorId: 'water-desalination',
    factorName: 'Municipal Desalinated Water Supply',
    factorValue: 4.85,
    emissionsTCO2e: 9.4,
    evidenceFile: 'DEWA_Water_Invoice_Aug2026.pdf',
    evidenceStatus: 'Verified',
    auditReady: true,
    loggedBy: 'Aisha Khan',
  },
  {
    id: 'rec-4',
    period: 'Jul 2026',
    date: '2026-07-31',
    facilityId: 'fac-1',
    facilityName: 'Dubai Industrial City Plant (HQ)',
    scope: 'Scope 2',
    activityType: 'DEWA Grid Electricity',
    quantity: 140500,
    unit: 'kWh',
    factorId: 'dewa-electricity',
    factorName: 'DEWA Grid Electricity (Dubai)',
    factorValue: 0.420,
    emissionsTCO2e: 59.0,
    evidenceFile: 'DEWA_Bill_Jul2026_DIC.pdf',
    evidenceStatus: 'Verified',
    auditReady: true,
    loggedBy: 'Aisha Khan',
  },
  {
    id: 'rec-5',
    period: 'Jul 2026',
    date: '2026-07-28',
    facilityId: 'fac-3',
    facilityName: 'ICAD Abu Dhabi Fabrication Yard',
    scope: 'Scope 1',
    activityType: 'Stationary Natural Gas Combustion',
    quantity: 14000,
    unit: 'm³',
    factorId: 'gas-uae',
    factorName: 'Industrial Natural Gas',
    factorValue: 2.02,
    emissionsTCO2e: 28.3,
    evidenceFile: 'ADNOC_Gas_Meter_Jul2026.pdf',
    evidenceStatus: 'Verified',
    auditReady: true,
    loggedBy: 'Sarah Ahmed',
  },
]

export const INITIAL_REPORTS: GeneratedReport[] = [
  {
    id: 'rep-2025-annual',
    title: 'FY 2025 Comprehensive Carbon Footprint & GHG Inventory',
    reportingYear: '2025',
    framework: 'GHG Protocol Corporate Standard',
    totalEmissionsTCO2e: 1248.6,
    scope1TCO2e: 349.2,
    scope2TCO2e: 899.4,
    scope3TCO2e: 142.0,
    generatedAt: '03 Sep 2026 · 11:20 AM',
    status: 'Audited & Certified',
    pages: 24,
    fileFormat: 'PDF',
    verificationHash: '0x8f4c2e91b7d34a12903e67c8',
  },
  {
    id: 'rep-2025-q3',
    title: 'Q3 2025 ESG Sustainability & Decarbonization Progress',
    reportingYear: '2025',
    framework: 'UAE Net Zero 2050 Charter',
    totalEmissionsTCO2e: 286.4,
    scope1TCO2e: 81.2,
    scope2TCO2e: 205.2,
    scope3TCO2e: 34.0,
    generatedAt: '12 Jul 2026 · 02:45 PM',
    status: 'Audited & Certified',
    pages: 14,
    fileFormat: 'PDF',
    verificationHash: '0x3a7e5f18c9b20d41829e11a6',
  },
  {
    id: 'rep-2024-annual',
    title: 'FY 2024 Baseline GHG Emissions Disclosure for DFM',
    reportingYear: '2024',
    framework: 'DFM / ADX ESG Guide',
    totalEmissionsTCO2e: 1425.2,
    scope1TCO2e: 380.0,
    scope2TCO2e: 1045.2,
    scope3TCO2e: 168.5,
    generatedAt: '18 Jan 2025 · 09:15 AM',
    status: 'Audited & Certified',
    pages: 22,
    fileFormat: 'PDF',
    verificationHash: '0x99b12a84c56e7f013d8a7c29',
  },
]

export const DEMO_ADMIN_ORGS = [
  {
    id: 'org-1',
    name: 'Al Noor Manufacturing LLC',
    sector: 'Manufacturing & Metals',
    emirate: 'Dubai',
    emissions: '1,248.6 tCO₂e',
    plan: 'Professional',
    status: 'Active',
    members: 6,
    lastActive: 'Just now',
    healthScore: 98,
  },
  {
    id: 'org-2',
    name: 'Gulf Horizon Properties PJSC',
    sector: 'Real Estate & Hospitality',
    emirate: 'Abu Dhabi',
    emissions: '842.2 tCO₂e',
    plan: 'Enterprise',
    status: 'Active',
    members: 14,
    lastActive: '2h ago',
    healthScore: 94,
  },
  {
    id: 'org-3',
    name: 'Mira Logistics & Marine FZCO',
    sector: 'Logistics & Supply Chain',
    emirate: 'Dubai',
    emissions: '2,104.7 tCO₂e',
    plan: 'Professional',
    status: 'Review Needed',
    members: 8,
    lastActive: 'Yesterday',
    healthScore: 72,
  },
  {
    id: 'org-4',
    name: 'Nexa Retail Group Middle East',
    sector: 'Retail & Commerce',
    emirate: 'Sharjah',
    emissions: '596.8 tCO₂e',
    plan: 'Starter',
    status: 'Active',
    members: 3,
    lastActive: '3 days ago',
    healthScore: 89,
  },
  {
    id: 'org-5',
    name: 'Emirates Tech Solutions FZ-LLC',
    sector: 'Technology & Cloud',
    emirate: 'Dubai',
    emissions: '148.2 tCO₂e',
    plan: 'Starter',
    status: 'Active',
    members: 4,
    lastActive: '1 week ago',
    healthScore: 99,
  },
]
