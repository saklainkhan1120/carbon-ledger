import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getProduct } from '@/lib/products'

export async function POST(request: Request) {
  try {
    const body = await request.json() as { productId?: string }
    const product = body.productId ? getProduct(body.productId) : undefined
    if (!product) return NextResponse.json({ error: 'Invalid product' }, { status: 400 })
    if (!process.env.STRIPE_SECRET_KEY) return NextResponse.json({ error: 'Stripe is not configured' }, { status: 503 })
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const origin = request.headers.get('origin') ?? 'http://localhost:3000'
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price_data: { currency: 'aed', product_data: { name: product.name, description: product.description }, unit_amount: product.priceInCents, recurring: { interval: 'month' } }, quantity: 1 }],
      success_url: `${origin}/dashboard/settings?billing=success`,
      cancel_url: `${origin}/register?billing=cancelled`,
      metadata: { productId: product.id },
    }, { idempotencyKey: `carbyn-${product.id}-${new Date().toISOString().slice(0, 13)}` })
    return NextResponse.json({ url: session.url })
  } catch { return NextResponse.json({ error: 'Unable to create checkout session' }, { status: 500 }) }
}
