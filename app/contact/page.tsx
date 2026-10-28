import type { Metadata } from 'next'
import { ContactView } from '@/components/ContactView'

export const metadata: Metadata = {
  title: 'Contact Customer Support & Commercial Desk — Ekedtronics',
  description:
    'Contact the Ekedtronics customer support desk in Bengaluru. Official assistance for orders, hardware specifications, GST invoicing, and manufacturer warranty resolution.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Ekedtronics — Customer Care & Corporate Support',
    description:
      'Direct telephone, WhatsApp, and email support desk for electronics procurement and warranty inquiries.',
    url: 'https://ekedtronics.com/contact',
  },
}

export default function ContactPage() {
  return <ContactView />
}
