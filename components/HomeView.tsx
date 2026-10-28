'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  CreditCard,
  FileText,
  Smartphone,
  Laptop,
  Tv,
  Headphones,
  Camera,
  Coffee,
  Gamepad2,
  Home,
  CheckCircle2
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ProductCard } from '@/components/ProductCard'
import { ScrollReveal } from '@/components/ScrollReveal'
import { PincodeModal } from '@/components/PincodeModal'
import { AdvertisementCarousel } from '@/components/AdvertisementCarousel'
import { BrandPartners } from '@/components/BrandPartners'
import { useStore } from '@/lib/store'

const categories = [
  { name: 'Smartphones', count: '4 Models', icon: Smartphone },
  { name: 'Laptops', count: '3 Models', icon: Laptop },
  { name: 'Televisions', count: '3 Models', icon: Tv },
  { name: 'Audio', count: '4 Models', icon: Headphones },
  { name: 'Cameras', count: '2 Models', icon: Camera },
  { name: 'Appliances', count: '2 Models', icon: Coffee },
  { name: 'Gaming', count: '3 Models', icon: Gamepad2 },
  { name: 'Smart Home', count: '2 Models', icon: Home },
]

export function HomeView() {
  const { products } = useStore()
  const [locationModalOpen, setLocationModalOpen] = useState(false)

  // Curated lists
  const bestsellerProducts = products.filter((p) => p.tag === 'Bestseller' || p.tag === 'Hot deal').slice(0, 4)
  const flagshipProducts = products.filter((p) => p.category === 'Audio' || p.category === 'Televisions' || p.category === 'Smart Home').slice(0, 4)

  return (
    <div className="min-h-screen bg-white text-[#0f172a]" id="main-content">
      {/* Navigation */}
      <Navbar onOpenLocationModal={() => setLocationModalOpen(true)} />

      {/* Primary Promotional Campaign Carousel */}
      <AdvertisementCarousel />

      {/* Enterprise Operational Assurances Strip */}
      <section className="border-b border-slate-200 bg-[#f8fafc] py-3 sm:py-4" aria-label="Operational Guarantees">
        <div className="mx-auto max-w-[1280px] px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            <div className="flex items-start sm:items-center gap-2 sm:gap-3">
              <span className="grid size-7 sm:size-9 place-items-center rounded-lg bg-orange-50 text-[#d94815] shrink-0" aria-hidden="true">
                <ShieldCheck className="size-4 sm:size-4.5" />
              </span>
              <div>
                <p className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">Direct Brand Warranty</p>
                <p className="text-[10px] sm:text-[11px] text-slate-500">Official Indian OEM Service</p>
              </div>
            </div>

            <div className="flex items-start sm:items-center gap-2 sm:gap-3">
              <span className="grid size-7 sm:size-9 place-items-center rounded-lg bg-teal-50 text-[#0f766e] shrink-0" aria-hidden="true">
                <Truck className="size-4 sm:size-4.5" />
              </span>
              <div>
                <p className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">Insured Pan-India Transit</p>
                <p className="text-[10px] sm:text-[11px] text-slate-500">Expedited Hub Logistics</p>
              </div>
            </div>

            <div className="flex items-start sm:items-center gap-2 sm:gap-3">
              <span className="grid size-7 sm:size-9 place-items-center rounded-lg bg-orange-50 text-[#d94815] shrink-0" aria-hidden="true">
                <CreditCard className="size-4 sm:size-4.5" />
              </span>
              <div>
                <p className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">Encrypted Online Checkout</p>
                <p className="text-[10px] sm:text-[11px] text-slate-500">UPI, Cards &amp; NetBanking</p>
              </div>
            </div>

            <div className="flex items-start sm:items-center gap-2 sm:gap-3">
              <span className="grid size-7 sm:size-9 place-items-center rounded-lg bg-teal-50 text-[#0f766e] shrink-0" aria-hidden="true">
                <FileText className="size-4 sm:size-4.5" />
              </span>
              <div>
                <p className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight">Instant GST Invoicing</p>
                <p className="text-[10px] sm:text-[11px] text-slate-500">WhatsApp &amp; Email Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Directory Grid */}
      <section className="mx-auto max-w-[1280px] px-3 sm:px-6 lg:px-8 py-7 sm:py-12" aria-labelledby="categories-heading">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 pb-3 sm:pb-4">
            <div>
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#0f766e]">Product Directory</p>
              <h2 id="categories-heading" className="mt-0.5 text-lg sm:text-2xl font-bold tracking-tight text-slate-900">
                Browse by Category
              </h2>
            </div>
            <Link
              href="/products"
              className="flex items-center gap-1.5 text-xs font-bold text-[#d94815] hover:underline"
            >
              <span>View full catalog ({products.length} products)</span>
              <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-4 sm:mt-6 grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <Link
                  key={cat.name}
                  href={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="group flex flex-col items-center rounded-lg sm:rounded-xl border border-slate-200 bg-white p-2 sm:p-3.5 text-center transition duration-150 hover:border-[#d94815] hover:shadow-xs"
                >
                  <span className="grid size-8 sm:size-11 place-items-center rounded-lg bg-slate-50 text-slate-700 transition group-hover:bg-orange-50 group-hover:text-[#d94815]">
                    <Icon className="size-4 sm:size-5" aria-hidden="true" />
                  </span>
                  <span className="mt-1.5 sm:mt-2.5 text-[10px] sm:text-xs font-bold text-slate-900 group-hover:text-[#d94815] truncate max-w-full">
                    {cat.name}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium">{cat.count}</span>
                </Link>
              )
            })}
          </div>
        </ScrollReveal>
      </section>

      {/* Featured Bestsellers Strip */}
      <section className="bg-[#f8fafc] border-y border-slate-200 py-7 sm:py-14" aria-labelledby="featured-heading">
        <div className="mx-auto max-w-[1280px] px-3 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 pb-3 sm:pb-4">
              <div>
                <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#d94815]">High-Demand Hardware</p>
                <h2 id="featured-heading" className="mt-0.5 text-lg sm:text-2xl font-bold tracking-tight text-slate-900">
                  Featured Bestsellers
                </h2>
              </div>
              <Link
                href="/products"
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-slate-300"
              >
                <span>All Products</span>
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
              {bestsellerProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Enterprise Capabilities & Direct Warranty Architecture */}
      <section className="mx-auto max-w-[1280px] px-3 sm:px-6 lg:px-8 py-8 sm:py-16" aria-labelledby="corporate-standards-heading">
        <ScrollReveal>
          <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-[#0f172a] p-5 sm:p-10 lg:p-12 text-white">
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-[#0f766e] px-2.5 py-1 text-xs font-bold text-white">
                  <ShieldCheck size={14} aria-hidden="true" />
                  <span>Quality Assurance Standard</span>
                </span>
                <h2 id="corporate-standards-heading" className="mt-2.5 text-xl sm:text-3xl font-bold tracking-tight">
                  Commercial &amp; Consumer Technology Distribution
                </h2>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-300 max-w-xl">
                  Ekedtronics operates direct brand procurement agreements with global manufacturers. Every consignment leaves our facility verified for serial traceability, accompanied by a digitally validated GST tax invoice accepted across authorized service centers nationwide.
                </p>

                <div className="mt-5 flex flex-wrap gap-2.5 sm:gap-3">
                  <Link
                    href="/products?category=Televisions"
                    className="rounded-lg bg-[#d94815] px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-bold text-white transition hover:bg-[#c2410c]"
                  >
                    Explore OLED Displays
                  </Link>
                  <Link
                    href="/about"
                    className="rounded-lg border border-slate-700 bg-slate-800 px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-bold text-white transition hover:bg-slate-700"
                  >
                    Review Corporate Standards
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-xl border border-slate-800 bg-slate-900/95 p-4 sm:p-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400">
                    Operational Assurances
                  </h3>
                  <div className="mt-3.5 space-y-2.5 sm:space-y-3 text-xs text-slate-300">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-[#d94815] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Tamper-evident security packaging with serial number logging</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-teal-400 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Instant digital GST invoice sent to WhatsApp &amp; Email upon checkout</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-[#d94815] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Insured transit with real-time status telemetry</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-teal-400 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>7-Day Dead on Arrival (DOA) factory replacement protocol</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Flagship Vision & Acoustic Systems Section */}
      <section className="mx-auto max-w-[1280px] px-3 sm:px-6 lg:px-8 pb-10 sm:pb-16" aria-labelledby="flagship-heading">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 pb-3 sm:pb-4">
            <div>
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#0f766e]">Precision Engineering</p>
              <h2 id="flagship-heading" className="mt-0.5 text-lg sm:text-2xl font-bold tracking-tight text-slate-900">
                Acoustic Sound &amp; Ultra-HD Visual Displays
              </h2>
            </div>
            <Link
              href="/products?category=Audio"
              className="flex items-center gap-1.5 text-xs font-bold text-[#d94815] hover:underline"
            >
              <span>Explore High-Fidelity Audio</span>
              <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
            {flagshipProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Authorized OEM Brand Partner Strip */}
      <BrandPartners />

      {/* Delivery Postal Code Modal */}
      <PincodeModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  )
}
