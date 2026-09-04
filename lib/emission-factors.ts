export interface EmissionFactor {
  id: string
  name: string
  category: 'Scope 1' | 'Scope 2' | 'Scope 3'
  subcategory: string
  region: string
  unit: string
  factor: number // in kg CO2e per unit
  source: string
  version: string
  effectiveYear: number
  status: 'Published' | 'Draft' | 'Deprecated'
}

export const UAE_EMISSION_FACTORS: EmissionFactor[] = [
  // Scope 1 - Direct Emissions (PDF Section 04/06 exact figures)
  {
    id: 'diesel-uae',
    name: 'Commercial Diesel (Fleet & Generators)',
    category: 'Scope 1',
    subcategory: 'Mobile & Stationary Diesel',
    region: 'UAE / GCC',
    unit: 'Litres',
    factor: 2.68,
    source: 'UAE MOCCAE / IPCC GHG Protocol',
    version: '2025.2',
    effectiveYear: 2025,
    status: 'Published',
  },
  {
    id: 'petrol-uae',
    name: 'Motor Gasoline (Special 95 / Super 98)',
    category: 'Scope 1',
    subcategory: 'Mobile Combustion',
    region: 'UAE / GCC',
    unit: 'Litres',
    factor: 2.31,
    source: 'UAE MOCCAE Guidelines',
    version: '2025.1',
    effectiveYear: 2025,
    status: 'Published',
  },
  {
    id: 'lpg-uae',
    name: 'LPG Gas (Commercial 11kg Cylinders)',
    category: 'Scope 1',
    subcategory: 'Stationary Combustion',
    region: 'UAE',
    unit: 'Cylinders (11kg)',
    factor: 16.61, // 1.51 kg CO2/kg * 11kg
    source: 'IPCC / UAE National Guidelines',
    version: '2025.1',
    effectiveYear: 2025,
    status: 'Published',
  },
  {
    id: 'gas-uae',
    name: 'Natural Gas (Pipeline Combustion)',
    category: 'Scope 1',
    subcategory: 'Stationary Combustion',
    region: 'UAE',
    unit: 'm³',
    factor: 2.04,
    source: 'GHG Protocol / UAE MOCCAE',
    version: '2025.1',
    effectiveYear: 2025,
    status: 'Published',
  },
  {
    id: 'vehicle-km-uae',
    name: 'Company Vehicle Transport (Passenger & Vans)',
    category: 'Scope 1',
    subcategory: 'Transport Activity',
    region: 'UAE',
    unit: 'km driven',
    factor: 0.21,
    source: 'UAE MOCCAE Vehicle Standard',
    version: '2025.1',
    effectiveYear: 2025,
    status: 'Published',
  },
  {
    id: 'refrigerant-r410a',
    name: 'HVAC Refrigerant Top-Up (R-410A / Freon)',
    category: 'Scope 1',
    subcategory: 'Fugitive Emissions',
    region: 'Global / UAE',
    unit: 'kg leaked',
    factor: 2088.0,
    source: 'IPCC AR5 GWP100',
    version: '2024.1',
    effectiveYear: 2024,
    status: 'Published',
  },

  // Scope 2 - Indirect Emissions (Utility Providers - PDF exact figures)
  {
    id: 'dewa-electricity',
    name: 'DEWA Grid Electricity (Dubai)',
    category: 'Scope 2',
    subcategory: 'Purchased Electricity',
    region: 'Dubai, UAE',
    unit: 'kWh',
    factor: 0.450,
    source: 'Dubai Electricity & Water Authority (DEWA)',
    version: '2025.2',
    effectiveYear: 2025,
    status: 'Published',
  },
  {
    id: 'addc-electricity',
    name: 'ADDC / TAQA Grid Electricity (Abu Dhabi)',
    category: 'Scope 2',
    subcategory: 'Purchased Electricity',
    region: 'Abu Dhabi, UAE',
    unit: 'kWh',
    factor: 0.420,
    source: 'Abu Dhabi Distribution Company (ADDC) / DOE',
    version: '2025.1',
    effectiveYear: 2025,
    status: 'Published',
  },
  {
    id: 'sewa-electricity',
    name: 'SEWA Grid Electricity (Sharjah)',
    category: 'Scope 2',
    subcategory: 'Purchased Electricity',
    region: 'Sharjah, UAE',
    unit: 'kWh',
    factor: 0.470,
    source: 'Sharjah Electricity & Water Authority (SEWA)',
    version: '2025.1',
    effectiveYear: 2025,
    status: 'Published',
  },
  {
    id: 'fewa-electricity',
    name: 'FEWA / EtihadWE Electricity (Northern Emirates)',
    category: 'Scope 2',
    subcategory: 'Purchased Electricity',
    region: 'Ajman, RAK, Fujairah, UAQ',
    unit: 'kWh',
    factor: 0.450,
    source: 'Etihad Water & Electricity (FEWA)',
    version: '2025.1',
    effectiveYear: 2025,
    status: 'Published',
  },

  // Scope 3 - Expected / Value Chain
  {
    id: 'flight-short-haul',
    name: 'Commercial Flights (GCC / Regional)',
    category: 'Scope 3',
    subcategory: 'Business Travel',
    region: 'Middle East & GCC',
    unit: 'passenger·km',
    factor: 0.158,
    source: 'ICAO Carbon Calculator',
    version: '2025.1',
    effectiveYear: 2025,
    status: 'Published',
  },
  {
    id: 'water-desalination',
    name: 'Municipal Desalinated Water Supply',
    category: 'Scope 3',
    subcategory: 'Water & Utilities',
    region: 'UAE Coastal',
    unit: 'm³ (1,000 L)',
    factor: 4.85,
    source: 'UAE MOCCAE Water Footprint Study',
    version: '2025.1',
    effectiveYear: 2025,
    status: 'Published',
  },
]

export function getFactorById(id: string): EmissionFactor | undefined {
  return UAE_EMISSION_FACTORS.find((f) => f.id === id)
}

export function calculateEmissionsKg(activityValue: number, factorId: string): number {
  const factorObj = getFactorById(factorId)
  if (!factorObj || isNaN(activityValue) || activityValue < 0) return 0
  return activityValue * factorObj.factor
}
