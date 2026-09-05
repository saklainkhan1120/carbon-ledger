'use client'

import { useEffect, useState } from 'react'
import {
  DEMO_COMPANY,
  DEMO_FACILITIES,
  EmissionRecord,
  Facility,
  GeneratedReport,
  INITIAL_RECORDS,
  INITIAL_REPORTS,
} from './demo-data'

const STORAGE_KEYS = {
  RECORDS: 'carbyn_records_v1',
  REPORTS: 'carbyn_reports_v1',
  FACILITIES: 'carbyn_facilities_v1',
  COMPANY: 'carbyn_company_v1',
  ACTIVE_FACILITY: 'carbyn_active_fac_v1',
}

export function useCarbonStore() {
  const [records, setRecords] = useState<EmissionRecord[]>(INITIAL_RECORDS)
  const [reports, setReports] = useState<GeneratedReport[]>(INITIAL_REPORTS)
  const [facilities, setFacilities] = useState<Facility[]>(DEMO_FACILITIES)
  const [company, setCompany] = useState(DEMO_COMPANY)
  const [activeFacilityId, setActiveFacilityId] = useState<string>('all')
  const [isLoaded, setIsLoaded] = useState(false)

  // Hydrate from localStorage on client
  useEffect(() => {
    try {
      const storedRecords = localStorage.getItem(STORAGE_KEYS.RECORDS)
      if (storedRecords) setRecords(JSON.parse(storedRecords))

      const storedReports = localStorage.getItem(STORAGE_KEYS.REPORTS)
      if (storedReports) setReports(JSON.parse(storedReports))

      const storedFacilities = localStorage.getItem(STORAGE_KEYS.FACILITIES)
      if (storedFacilities) setFacilities(JSON.parse(storedFacilities))

      const storedCompany = localStorage.getItem(STORAGE_KEYS.COMPANY)
      if (storedCompany) setCompany(JSON.parse(storedCompany))

      const storedActiveFac = localStorage.getItem(STORAGE_KEYS.ACTIVE_FACILITY)
      if (storedActiveFac) setActiveFacilityId(storedActiveFac)
    } catch (e) {
      console.warn('Could not read from localStorage', e)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Persist helpers
  const addRecord = (record: Omit<EmissionRecord, 'id' | 'date'>) => {
    const newRecord: EmissionRecord = {
      ...record,
      id: `rec-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    }
    const updated = [newRecord, ...records]
    setRecords(updated)
    try {
      localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(updated))
    } catch {}
    return newRecord
  }

  const deleteRecord = (id: string) => {
    const updated = records.filter((r) => r.id !== id)
    setRecords(updated)
    try {
      localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(updated))
    } catch {}
  }

  const addReport = (report: Omit<GeneratedReport, 'id' | 'generatedAt' | 'verificationHash'>) => {
    const hash = `0x${Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
    const now = new Date()
    const formattedDate = `${now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} · ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`

    const newReport: GeneratedReport = {
      ...report,
      id: `rep-${Date.now()}`,
      generatedAt: formattedDate,
      verificationHash: hash,
    }
    const updated = [newReport, ...reports]
    setReports(updated)
    try {
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(updated))
    } catch {}
    return newReport
  }

  const addFacility = (facility: Omit<Facility, 'id'>) => {
    const newFac: Facility = {
      ...facility,
      id: `fac-${Date.now()}`,
    }
    const updated = [...facilities, newFac]
    setFacilities(updated)
    try {
      localStorage.setItem(STORAGE_KEYS.FACILITIES, JSON.stringify(updated))
    } catch {}
    return newFac
  }

  const updateCompany = (updates: Partial<typeof DEMO_COMPANY>) => {
    const updated = { ...company, ...updates }
    setCompany(updated)
    try {
      localStorage.setItem(STORAGE_KEYS.COMPANY, JSON.stringify(updated))
    } catch {}
  }

  const selectFacility = (id: string) => {
    setActiveFacilityId(id)
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_FACILITY, id)
    } catch {}
  }

  // Filtered records
  const filteredRecords = activeFacilityId === 'all'
    ? records
    : records.filter((r) => r.facilityId === activeFacilityId)

  // Totals
  const totalScope1 = filteredRecords
    .filter((r) => r.scope === 'Scope 1')
    .reduce((sum, r) => sum + r.emissionsTCO2e, 0)

  const totalScope2 = filteredRecords
    .filter((r) => r.scope === 'Scope 2')
    .reduce((sum, r) => sum + r.emissionsTCO2e, 0)

  const totalScope3 = filteredRecords
    .filter((r) => r.scope === 'Scope 3')
    .reduce((sum, r) => sum + r.emissionsTCO2e, 0)

  const totalEmissions = totalScope1 + totalScope2 + totalScope3

  return {
    isLoaded,
    company,
    facilities,
    records: filteredRecords,
    allRecords: records,
    reports,
    activeFacilityId,
    selectFacility,
    totalScope1,
    totalScope2,
    totalScope3,
    totalEmissions,
    addRecord,
    deleteRecord,
    addReport,
    addFacility,
    updateCompany,
  }
}
