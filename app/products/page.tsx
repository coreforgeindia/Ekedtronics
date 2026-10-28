import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import { ProductsCatalogView } from '@/components/ProductsCatalogView'

export const metadata: Metadata = {
  title: 'Electronics Product Catalog — Flagship Smartphones, OLED TVs, Audio & Laptops',
  description:
    'Browse the full Ekedtronics inventory of certified electronics. Authentic units with direct manufacturer warranty, digital GST invoice, and express Pan-India insured shipping.',
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'Electronics Product Catalog — Ekedtronics',
    description:
      'Certified smartphones, 4K OLED televisions, party sound systems, laptops, and appliances with direct brand warranty.',
    url: 'https://ekedtronics.com/products',
  },
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs font-semibold text-slate-500">Loading catalog inventory...</div>}>
      <ProductsCatalogView />
    </Suspense>
  )
}
