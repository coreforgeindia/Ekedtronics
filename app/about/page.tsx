import type { Metadata } from 'next'
import { AboutView } from '@/components/AboutView'

export const metadata: Metadata = {
  title: 'About Ekedtronics — Corporate Profile, Governance & Quality Standards',
  description:
    'Learn about Ekedtronics Retail Pvt. Ltd. Official authorized distributor for global electronics, direct OEM warranties, GST billing compliance, and Pan-India fulfillment logistics.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Ekedtronics — Corporate Profile & Quality Standards',
    description:
      'Authorized multi-brand technology distribution with direct manufacturer warranties, digital GST billing, and insured logistics.',
    url: 'https://ekedtronics.com/about',
  },
}

export default function AboutPage() {
  return <AboutView />
}
