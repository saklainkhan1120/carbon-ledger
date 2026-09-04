import { NextResponse } from 'next/server'
import { collections, getDatabase } from '@/lib/db'

export async function GET() {
  try {
    const db = await getDatabase()
    const organizations = await db.collection(collections.organizations).find({}, { projection: { name: 1, sector: 1, plan: 1, status: 1, updatedAt: 1 } }).sort({ updatedAt: -1 }).limit(100).toArray()
    return NextResponse.json({ organizations })
  } catch (error) {
    console.error('[v0] organizations GET failed', error)
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
  }
}

export async function POST(request: Request) {
  const body = await request.json()
  if (typeof body.name !== 'string' || body.name.trim().length < 2) return NextResponse.json({ error: 'Organization name is required' }, { status: 400 })
  try {
    const db = await getDatabase()
    const organization = { name: body.name.trim(), sector: typeof body.sector === 'string' ? body.sector.trim() : 'Other', plan: 'starter', status: 'active', createdAt: new Date(), updatedAt: new Date() }
    const result = await db.collection(collections.organizations).insertOne(organization)
    return NextResponse.json({ organization: { ...organization, _id: result.insertedId } }, { status: 201 })
  } catch (error) {
    console.error('[v0] organizations POST failed', error)
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 })
  }
}
