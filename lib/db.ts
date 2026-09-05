import { MongoClient, type Db } from 'mongodb'

const uri = process.env.MONGODB_URI
let clientPromise: Promise<MongoClient> | undefined

/**
 * Returns the connected MongoDB database instance if configured.
 */
export async function getDatabase(): Promise<Db | null> {
  if (!uri) {
    return null
  }
  try {
    clientPromise ??= new MongoClient(uri).connect()
    const client = await clientPromise
    return client.db()
  } catch (error) {
    console.error('[MongoDB Connection Error]', error)
    return null
  }
}

export const collections = {
  organizations: 'organizations',
  users: 'users',
  assessments: 'assessments',
  reports: 'reports',
  facilities: 'facilities',
  emissionFactors: 'emissionFactors',
  auditLog: 'auditLog',
  cms: 'cms',
} as const

export interface DbUser {
  _id?: string
  name: string
  email: string
  passwordHash: string
  passwordSalt: string
  role: 'owner' | 'admin' | 'reviewer' | 'super_admin'
  organizationId: string
  organizationName: string
  createdAt: Date
  updatedAt: Date
}
