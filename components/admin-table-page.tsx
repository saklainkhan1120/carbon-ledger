'use client'

import React, { useMemo, useState } from 'react'
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Plus,
  Search,
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
  const [search, setSearch] = useState('')
  const [sortColIndex, setSortColIndex] = useState<number | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Normalize column headers
  const colHeaders = useMemo(() => {
    return columns.map((c) => (typeof c === 'string' ? c : c.header))
  }, [columns])

  // Normalize rows into string[][]
  const allRows: (string | number)[][] = useMemo(() => {
    if (initialRows && initialRows.length > 0) return initialRows
    if (initialData && initialData.length > 0) {
      return initialData.map((item) => Object.values(item) as (string | number)[])
    }
    return []
  }, [initialRows, initialData])

  // Filtered & Searched Data
  const processedRows = useMemo(() => {
    let result = [...allRows]

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
  }, [allRows, search, sortColIndex, sortOrder])

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

  const handleExportCSV = () => {
    const headers = colHeaders.join(',')
    const rows = processedRows.map((r) =>
      r.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(',')
    )
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `${title.toLowerCase().replace(/\s+/g, '_')}_export.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const buttonLabel = action || actionButtonLabel
  const buttonClick = onActionClick || onActionButtonClick

  return (
    <PlatformShell admin>
      <PageHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
        action={
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 rounded-2xl border border-border bg-card px-4 py-2.5 text-xs font-bold text-foreground hover:bg-muted transition-colors shadow-xs"
            >
              <Download size={14} /> Export CSV
            </button>
            {buttonLabel && (
              <button
                onClick={buttonClick}
                className="inline-flex items-center gap-1.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all"
              >
                <Plus size={15} /> {buttonLabel}
              </button>
            )}
          </div>
        }
      />

      {/* Main Table Card */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-xs space-y-6">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3.5 top-3 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
              placeholder={searchPlaceholder}
              className="w-full rounded-xl border border-input bg-background pl-9 pr-8 py-2.5 text-xs font-semibold outline-none focus:ring-2 focus:ring-ring text-foreground"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-3 text-muted-foreground hover:text-foreground"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground self-start sm:self-auto">
            {processedRows.length} Total Records
          </span>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 uppercase tracking-wider text-[11px] font-bold text-muted-foreground">
              <tr>
                {colHeaders.map((header, idx) => (
                  <th
                    key={idx}
                    onClick={() => handleSort(idx)}
                    className="px-4 py-3 select-none cursor-pointer hover:text-foreground transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{header}</span>
                      <span>
                        {sortColIndex === idx ? (
                          sortOrder === 'asc' ? (
                            <ArrowUp size={12} className="text-emerald-600" />
                          ) : (
                            <ArrowDown size={12} className="text-emerald-600" />
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border/80 pt-4 text-xs text-muted-foreground">
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
    </PlatformShell>
  )
}
