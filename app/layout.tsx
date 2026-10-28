import type { Metadata, Viewport } from 'next'
import './globals.css'
import { StoreProvider } from '@/lib/store'
import { CartDrawer } from '@/components/CartDrawer'
import { QuickViewModal } from '@/components/QuickViewModal'
import { AuthModal } from '@/components/AuthModal'

export const metadata: Metadata = {
  metadataBase: new URL('https://ekedtronics.com'),
  title: {
    default: 'Ekedtronics — Authorized Electronics & Smart Tech Retailer',
    template: '%s | Ekedtronics',
  },
  description:
    'Authorized retailer for flagship smartphones, laptops, 4K OLED televisions, audio systems, and smart home appliances. Direct brand warranties with Pan-India insured delivery.',
  applicationName: 'Ekedtronics Retail',
  keywords: [
    'Ekedtronics',
    'Electronics Retailer India',
    'Smartphones',
    'Laptops',
    'OLED TV',
    'Audio Systems',
    'Direct Brand Warranty',
    'Bangalore Electronics',
  ],
  authors: [{ name: 'Ekedtronics Engineering & Operations' }],
  creator: 'Ekedtronics Retail Pvt. Ltd.',
  publisher: 'Ekedtronics Retail Pvt. Ltd.',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ekedtronics — Authorized Electronics & Smart Tech Retailer',
    description:
      'Official authorized distributor of premium consumer electronics. Guaranteed authentic products with manufacturer warranties, digital GST bills, and insured Pan-India shipping.',
    url: 'https://ekedtronics.com',
    siteName: 'Ekedtronics',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/ekedtronics-logo.png',
        width: 1200,
        height: 630,
        alt: 'Ekedtronics Logo and Brand Identity',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ekedtronics — Authorized Electronics & Smart Tech Retailer',
    description:
      'Direct brand warranties with verified digital GST tax invoices. Fast Pan-India delivery on certified electronics.',
    images: ['/ekedtronics-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/ekedtronics-logo.png',
        type: 'image/png',
      },
    ],
    apple: '/ekedtronics-logo.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light dark',
  themeColor: '#d94815',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ElectronicsStore',
    name: 'Ekedtronics',
    legalName: 'Ekedtronics Retail Pvt. Ltd.',
    url: 'https://ekedtronics.com',
    logo: 'https://ekedtronics.com/ekedtronics-logo.png',
    description:
      'Authorized retailer for flagship electronics, OLED TVs, high-fidelity audio, laptops, and appliances in India.',
    telephone: '+918150077222',
    email: 'ekedtronics.sales@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bangalore',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    paymentAccepted: 'UPI, Credit Card, Debit Card, Net Banking',
    currenciesAccepted: 'INR',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '08:00',
        closes: '22:00',
      },
    ],
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-[#ffffff] text-[#0f172a]">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <StoreProvider>
          {children}
          <CartDrawer />
          <QuickViewModal />
          <AuthModal />
        </StoreProvider>
      </body>
    </html>
  )
}
