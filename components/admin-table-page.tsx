'use client'

import React, { useMemo, useState } from 'react'
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  Plus,
  Search,
  Sparkles,
  X,
} from 'lucide-react'
import { PageHeading, PlatformShell } from '@/components/platform-shell'
import { getAuditBadge } from '@/lib/utils'

export interface AdminTablePageProps {
  title: string
  eyebrow?: string
  description: string
  columns: (string | { key: string; header: string })[]
  rows?: (string | number)[][]
  data?: any[]
  searchPlaceholder?: string
  action?: string
  actionButtonLabel?: string
  onActionClick?: () => void
  onActionButtonClick?: () => void
}

export function AdminTablePage({
  title,
  eyebrow = 'Super Admin Control',
  description,
  columns,
  rows: initialRows = [],
  data: initialData,
  searchPlaceholder = 'Search records...',
  action,
  actionButtonLabel,
  onActionClick,
  onActionButtonClick,
}: AdminTablePageProps) {
  // Live mutable rows state for real in-session additions
  const [tableRows, setTableRows] = useState<(string | number)[][]>(() => {
    if (initialRows && initialRows.length > 0) return initialRows
    if (initialData && initialData.length > 0) {
      return initialData.map((item) => Object.values(item) as (string | number)[])
    }
    return []
  })

  const [search, setSearch] = useState('')
  const [sortColIndex, setSortColIndex] = useState<number | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Interactive Create Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [successToast, setSuccessToast] = useState('')

  // Normalize column headers
  const colHeaders = useMemo(() => {
    return columns.map((c) => (typeof c === 'string' ? c : c.header))
  }, [columns])

  const actionLabel = action || actionButtonLabel

  // Filtered & Searched Data
  const processedRows = useMemo(() => {
    let result = [...tableRows]

    if (search.trim()) {
      const term = search.toLowerCase()
      result = result.filter((row) =>
        row.some((cell) => String(cell).toLowerCase().includes(term))
      )
    }

    if (sortColIndex !== null) {
      result.sort((a, b) => {
        const aVal = a[sortColIndex]
        const bVal = b[sortColIndex]
        if (aVal === bVal) return 0
        if (aVal === null || aVal === undefined) return 1
        if (bVal === null || bVal === undefined) return -1
        const comp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true })
        return sortOrder === 'asc' ? comp : -comp
      })
    }

    return result
  }, [tableRows, search, sortColIndex, sortOrder])

  // Pagination
  const totalPages = Math.ceil(processedRows.length / pageSize) || 1
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return processedRows.slice(start, start + pageSize)
  }, [processedRows, currentPage, pageSize])

  const handleSort = (idx: number) => {
    if (sortColIndex === idx) {
      if (sortOrder === 'asc') setSortOrder('desc')
      else {
        setSortColIndex(null)
        setSortOrder('asc')
      }
    } else {
      setSortColIndex(idx)
      setSortOrder('asc')
    }
  }

  // Real CSV Export
  const exportCSV = () => {
    const headerRow = colHeaders.map((h) => `"${h}"`).join(',')
    const dataRows = processedRows.map((row) =>
      row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(',')
    )
    const csvContent = 'data:text/csv;charset=utf-8,' + [headerRow, ...dataRows].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `${title.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleOpenModal = () => {
    if (onActionClick) {
      // If parent has custom handler, call it
      onActionClick()
      return
    }
    if (onActionButtonClick) {
      onActionButtonClick()
      return
    }
    // Otherwise open product-grade creation modal
    setFormData({})
    setIsModalOpen(true)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newRow = colHeaders.map((col) => formData[col] || 'Active')
    setTableRows([newRow, ...tableRows])
    setIsModalOpen(false)
    setSuccessToast(`Successfully added record to ${title}!`)
    setTimeout(() => setSuccessToast(''), 4000)
  }

  return (
    <PlatformShell admin>
      <div className="space-y-6">
        {/* Success Toast */}
        {successToast && (
          <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-bold text-emerald-900 shadow-md animate-in fade-in">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Header with Title & Primary Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
          <PageHeading eyebrow={eyebrow} title={title} description={description} />

          <div className="flex items-center gap-3">
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 text-xs font-bold text-foreground hover:bg-muted transition-colors shadow-sm"
            >
              <Download size={14} /> Export CSV
            </button>
            {actionLabel && (
              <button
                onClick={handleOpenModal}
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-all shadow-md shadow-emerald-700/20"
              >
                <Plus size={15} /> {actionLabel}
              </button>
            )}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
              placeholder={searchPlaceholder}
              className="w-full rounded-2xl border border-input bg-card py-2.5 pl-10 pr-4 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
            <span>Total Records:</span>
            <span className="font-mono font-bold text-foreground">{processedRows.length}</span>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-muted/40 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <tr>
                  {colHeaders.map((header, idx) => (
                    <th
                      key={idx}
                      onClick={() => handleSort(idx)}
                      className="cursor-pointer px-4 py-3.5 hover:text-foreground transition-colors select-none"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>{header}</span>
                        <span className="text-muted-foreground/60">
                          {sortColIndex === idx ? (
                            sortOrder === 'asc' ? (
                              <ArrowUp size={12} className="text-primary" />
                            ) : (
                              <ArrowDown size={12} className="text-primary" />
                            )
                          ) : (
                            <ArrowUpDown size={12} className="opacity-30" />
                          )}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {paginatedRows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={colHeaders.length}
                      className="py-12 text-center text-muted-foreground text-xs font-medium"
                    >
                      No records found matching your query.
                    </td>
                  </tr>
                ) : (
                  paginatedRows.map((row, rowIdx) => (
                    <tr key={rowIdx} className="hover:bg-muted/30 transition-colors">
                      {row.map((cell, cellIdx) => {
                        const cellStr = String(cell)
                        const isStatus =
                          ['Active', 'Published', 'Certified', 'Review Needed', 'Draft', 'Pending'].some((s) =>
                            cellStr.includes(s)
                          )
                        const badge = isStatus ? getAuditBadge(cellStr) : null

                        return (
                          <td key={cellIdx} className="px-4 py-3.5 text-foreground font-medium">
                            {badge ? (
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${badge.bg}`}
                              >
                                <span className={`size-1.5 rounded-full ${badge.dot}`} />
                                {cellStr}
                              </span>
                            ) : cellIdx === 0 ? (
                              <span className="font-bold text-foreground">{cellStr}</span>
                            ) : (
                              <span className="text-muted-foreground">{cellStr}</span>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer & Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border/80 px-4 py-3 text-xs text-muted-foreground">
            <span>
              Showing {processedRows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{' '}
              {Math.min(currentPage * pageSize, processedRows.length)} of {processedRows.length}{' '}
              entries
            </span>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="text-[11px]">Rows per page:</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value))
                    setCurrentPage(1)
                  }}
                  className="rounded-lg border border-input bg-background px-2 py-1 text-xs outline-none"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>

              <div className="flex items-center gap-1">
                <button
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="rounded-xl border border-border p-1.5 hover:bg-muted disabled:opacity-40 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="px-2 text-xs font-semibold text-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="rounded-xl border border-border p-1.5 hover:bg-muted disabled:opacity-40 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product-Grade Interactive Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Plus size={16} />
                </span>
                <div>
                  <h3 className="font-extrabold text-base text-foreground">{actionLabel}</h3>
                  <p className="text-xs text-muted-foreground">Add new record to {title}</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl p-2 text-muted-foreground hover:bg-muted"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                {colHeaders.map((col, idx) => (
                  <div key={idx} className="space-y-1.5 text-xs">
                    <label className="font-bold text-foreground">{col}</label>
                    <input
                      type="text"
                      required={idx === 0}
                      value={formData[col] || ''}
                      onChange={(e) => setFormData({ ...formData, [col]: e.target.value })}
                      placeholder={`Enter ${col.toLowerCase()}...`}
                      className="w-full rounded-xl border border-input bg-background p-3 text-xs text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 rounded-xl border border-border py-3 text-xs font-bold text-muted-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-primary py-3 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-all shadow-md"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PlatformShell>
  )
}
