import { NextResponse } from 'next/server'
import { clearSessionCookie } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST() {
  try {
    await clearSessionCookie()
    return NextResponse.json({ success: true, message: 'Logged out successfully' })
  } catch (error) {
    console.error('[Logout Error]', error)
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 })
  }
}
