import { NextResponse } from 'next/server'
import { getDatabase, collections } from '@/lib/db'
import { hashPassword, signAuthToken, setSessionCookie, type AuthUser } from '@/lib/auth'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { companyName, tradeLicense, emirate, sector, name, email, password } = body

    if (!companyName || !email || !password || !name) {
      return NextResponse.json({ error: 'Please provide all required fields' }, { status: 400 })
    }

    const { hash, salt } = hashPassword(password)
    const db = await getDatabase()

    let userId = `usr_${Date.now()}`
    let orgId = `org_${Date.now()}`

    if (db) {
      const usersCol = db.collection(collections.users)
      const existing = await usersCol.findOne({ email: email.toLowerCase() })
      if (existing) {
        return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 })
      }

      const orgsCol = db.collection(collections.organizations)
      const orgResult = await orgsCol.insertOne({
        name: companyName,
        tradeLicense: tradeLicense || 'CN-2026-UAEDUB',
        emirate: emirate || 'Dubai',
        sector: sector || 'Manufacturing',
        status: 'active',
        plan: 'starter',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      orgId = orgResult.insertedId.toString()

      const userResult = await usersCol.insertOne({
        name,
        email: email.toLowerCase(),
        passwordHash: hash,
        passwordSalt: salt,
        role: 'owner',
        organizationId: orgId,
        organizationName: companyName,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      userId = userResult.insertedId.toString()
    }

    const authUser: AuthUser = {
      id: userId,
      name,
      email: email.toLowerCase(),
      role: 'owner',
      organizationId: orgId,
      organizationName: companyName,
    }

    const token = signAuthToken(authUser)
    await setSessionCookie(token)

    return NextResponse.json({
      success: true,
      user: authUser,
      token,
      message: 'Workspace registered successfully',
    })
  } catch (error) {
    console.error('[Register API Error]', error)
    return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 })
  }
}
