import type { Metadata } from 'next'
import { HomeView } from '@/components/HomeView'

export const metadata: Metadata = {
  title: 'Ekedtronics — Authorized Consumer Electronics & Flagship Smart Tech',
  description:
    'Shop authentic smartphones, laptops, 4K OLED televisions, party audio, and appliances. Direct manufacturer warranty with fast insured Pan-India delivery and instant GST billing.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ekedtronics — Authorized Electronics & Smart Tech Retailer',
    description:
      'Direct manufacturer warranties, 100% genuine factory sealed products, insured courier delivery across India.',
    url: 'https://ekedtronics.com',
  },
}

export default function HomePage() {
  return <HomeView />
}
