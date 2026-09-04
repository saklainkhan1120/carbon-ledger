import { MongoClient, type Db } from 'mongodb'

const uri = process.env.MONGODB_URI
let clientPromise: Promise<MongoClient> | undefined

export function getDatabase(): Promise<Db> {
  if (!uri) throw new Error('MONGODB_URI is required for production data access')
  clientPromise ??= new MongoClient(uri).connect()
  return clientPromise.then((client) => client.db())
}

export const collections = {
  organizations: 'organizations',
  users: 'users',
  assessments: 'assessments',
  reports: 'reports',
  emissionFactors: 'emissionFactors',
  auditLog: 'auditLog',
  cms: 'cms',
} as const
