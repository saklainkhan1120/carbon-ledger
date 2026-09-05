export const PRODUCTS = [{ id: 'professional', name: 'Carbyn Professional', description: 'Audit-ready emissions tracking for growing teams.', priceInCents: 29900 }] as const
export type ProductId = (typeof PRODUCTS)[number]['id']
export function getProduct(id: string) { return PRODUCTS.find((product) => product.id === id) }
