import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { PRODUCTS } from '@/lib/products'

export const runtime = 'nodejs'
export async function POST(request: Request) { const { productId } = await request.json(); const product = PRODUCTS.find((item) => item.id === productId); if (!product) return NextResponse.json({ error: 'Unknown plan' }, { status: 400 }); try { const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? ''); const session = await stripe.checkout.sessions.create({ mode: 'subscription', line_items: [{ price_data: { currency: 'aed', product_data: { name: product.name, description: product.description }, recurring: { interval: 'month' }, unit_amount: product.priceInCents }, quantity: 1 }], success_url: `${new URL(request.url).origin}/dashboard/settings?billing=success`, cancel_url: `${new URL(request.url).origin}/dashboard/settings?billing=cancelled`, metadata: { productId } }, { idempotencyKey: `carbyn-${productId}-${Date.now()}` }); return NextResponse.json({ url: session.url }) } catch (error) { console.error('[v0] billing checkout failed', error); return NextResponse.json({ error: 'Billing unavailable' }, { status: 503 }) } }
