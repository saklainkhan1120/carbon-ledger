import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || 'carbyn-uae-secret-key-2026-super-secure'
const COOKIE_NAME = 'carbyn_session_token'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: 'owner' | 'admin' | 'reviewer' | 'super_admin'
  organizationId: string
  organizationName: string
}

/**
 * Hashes a plaintext password with a random salt using PBKDF2
 */
export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  return { hash, salt }
}

/**
 * Verifies a plaintext password against a stored hash and salt
 */
export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const checkHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  return hash === checkHash
}

/**
 * Signs a JWT authentication token
 */
export function signAuthToken(user: AuthUser): string {
  return jwt.sign(
    {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId,
      organizationName: user.organizationName,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

/**
 * Verifies and decodes a JWT token
 */
export function verifyAuthToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & {
      sub: string
      name: string
      email: string
      role: AuthUser['role']
      organizationId: string
      organizationName: string
    }
    return {
      id: decoded.sub,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
      organizationId: decoded.organizationId,
      organizationName: decoded.organizationName,
    }
  } catch {
    return null
  }
}

/**
 * Sets the authentication cookie in Next.js Server Actions / API Routes
 */
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

/**
 * Gets the current authenticated user from cookie
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifyAuthToken(token)
}

/**
 * Clears the session cookie on logout
 */
export async function clearSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}
