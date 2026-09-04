import type { ObjectId } from 'mongodb'

export type Role = 'owner' | 'admin' | 'reviewer' | 'member' | 'super_admin'
export type OrganizationStatus = 'active' | 'trial' | 'suspended' | 'review_needed'
export type Plan = 'starter' | 'professional' | 'enterprise'
export type AuditEvent = { _id?: ObjectId; actorId?: ObjectId; actorName: string; action: string; resource: string; organizationId?: ObjectId; metadata?: Record<string, string>; createdAt: Date }
export type Organization = { _id?: ObjectId; name: string; sector: string; emirate?: string; plan: Plan; status: OrganizationStatus; ownerId?: ObjectId; createdAt: Date; updatedAt: Date }
export type Assessment = { _id?: ObjectId; organizationId: ObjectId; period: string; scope1: number; scope2: number; scope3?: number; total: number; factorVersion: string; evidenceStatus: 'missing' | 'partial' | 'complete'; createdBy: ObjectId; createdAt: Date; updatedAt: Date }
export type CMSContent = { _id?: ObjectId; slug: string; title: string; type: 'page' | 'article' | 'faq' | 'banner'; body: string; status: 'draft' | 'scheduled' | 'published'; updatedBy: ObjectId; updatedAt: Date; publishedAt?: Date }
