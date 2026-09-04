import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTCO2e(value: number, decimals: number = 1): string {
  if (isNaN(value)) return '0.0'
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export function formatAED(valueInCents: number): string {
  return `AED ${(valueInCents / 100).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`
}

export function formatNumber(value: number): string {
  if (isNaN(value)) return '0'
  return value.toLocaleString('en-US')
}

export function getAuditBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'verified':
    case 'audited & certified':
    case 'published':
    case 'active':
      return {
        bg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20',
        dot: 'bg-emerald-500',
      }
    case 'pending review':
    case 'ready for review':
    case 'review needed':
    case 'draft':
      return {
        bg: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
        dot: 'bg-amber-500',
      }
    case 'missing document':
    case 'suspended':
    case 'deprecated':
      return {
        bg: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20',
        dot: 'bg-rose-500',
      }
    default:
      return {
        bg: 'bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/20',
        dot: 'bg-slate-500',
      }
  }
}
