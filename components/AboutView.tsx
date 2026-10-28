'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  Truck,
  ArrowRight,
  Headphones
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ScrollReveal } from '@/components/ScrollReveal'
import { PincodeModal } from '@/components/PincodeModal'
import { Logo } from '@/components/Logo'

export function AboutView() {
  const [locationModalOpen, setLocationModalOpen] = useState(false)

  const corporatePillars = [
    {
      title: 'Direct OEM Procurement',
      description: 'We source hardware exclusively through certified manufacturer distribution channels. Every device carries an uncompromised factory warranty recognized across all authorized service centers nationwide.',
      icon: ShieldCheck,
      badge: 'Brand Direct'
    },
    {
      title: 'Digital Invoicing & Tax Compliance',
      description: 'Every sale is documented under Indian GST regulations (GSTIN: 29AABCE1234F1Z8). Automated tax invoices with individual serial keys are delivered via WhatsApp and email upon payment.',
      icon: FileText,
      badge: 'GST Compliant'
    },
    {
      title: 'Insured Logistics Infrastructure',
      description: 'Consignments are packed with tamper-evident security tape and shipped via Tier-1 express air and ground cargo networks with comprehensive transit insurance.',
      icon: Truck,
      badge: 'Pan-India SLA'
    },
    {
      title: 'Human Technical Support Desk',
      description: 'Based at our Bengaluru facility, our specialist support staff assists with pre-purchase hardware compatibility, invoice queries, and after-sales warranty claim procedures.',
      icon: Headphones,
      badge: 'Direct Helpdesk'
    }
  ]

  const operationalStandards = [
    {
      metric: 'OEM Factory Seal',
      detail: '100% of shipments leave in untouched, original manufacturer packaging.'
    },
    {
      metric: 'Serial Number Logging',
      detail: 'Every unit is digitally matched to its GST bill for instant warranty authentication.'
    },
    {
      metric: 'Fast Regional Transit',
      detail: '24-48 hours delivery SLA for metropolitan hubs; 2-4 days for regional destinations.'
    },
    {
      metric: 'Pre-Shipment Verification',
      detail: 'Barcodes scanned and logged into the central dispatch registry prior to handover.'
    }
  ]

  return (
    <main className="min-h-screen bg-white text-[#0f172a]" id="main-content">
      <Navbar onOpenLocationModal={() => setLocationModalOpen(true)} />

      {/* Header / Corporate Overview */}
      <section className="border-b border-slate-200 bg-[#f8fafc] py-8 sm:py-16 px-3 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#0f766e]">
                Corporate Profile &amp; Operational Standards
              </span>
              <h1 className="mt-1.5 text-xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Authorized Electronics Distribution Built on Transparency and Authenticity
              </h1>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                Ekedtronics Retail Pvt. Ltd. was established to streamline consumer and business procurement of genuine technology hardware. By eliminating intermediate grey-market channels, we guarantee direct manufacturer warranties, digital GST documentation, and insured doorstep delivery across India.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Operational Highlights Grid */}
      <section className="mx-auto max-w-[1280px] px-3 sm:px-6 lg:px-8 py-8 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {operationalStandards.map((item, idx) => (
            <ScrollReveal key={idx}>
              <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
                <span className="text-xs font-bold text-[#d94815] uppercase tracking-wider block">
                  {item.metric}
                </span>
                <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{item.detail}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Corporate Purpose & Commercial Philosophy */}
      <section className="border-t border-slate-200 bg-white py-8 sm:py-16 px-3 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm leading-relaxed text-slate-600">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#d94815]">
                Our Operational Model
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Eliminating Ambiguity in Consumer Electronics Procurement
              </h2>
              <p>
                Purchasing flagship smartphones, 4K OLED televisions, or specialized audio equipment should never involve doubt regarding product authenticity or service coverage. In today&apos;s marketplace, unauthorized open-box units and tampered serial numbers frequently cause warranty claim rejections.
              </p>
              <p>
                At Ekedtronics, we solve this through a direct-to-consumer digital infrastructure: every item in our catalog is mapped directly to certified brand distribution agreements. We require zero cash handling, which eliminates courier transit risks and ensures every package is sealed, insured, and verified.
              </p>

              <div className="pt-2 space-y-2.5 text-xs font-semibold text-slate-800">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#0f766e] shrink-0" aria-hidden="true" />
                  <span>Physical Bengaluru Experience Hub and regional logistics center</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#0f766e] shrink-0" aria-hidden="true" />
                  <span>Immediate tax invoice with HSN codes and individual serial tracking</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#0f766e] shrink-0" aria-hidden="true" />
                  <span>Strict non-COD protocol ensures fast dispatch and eliminated courier surcharges</span>
                </div>
              </div>
            </div>

            {/* Corporate Summary Card */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-slate-200 bg-[#0f172a] p-6 sm:p-8 text-white">
                <div className="rounded-lg bg-white p-2.5 inline-block">
                  <Logo height={40} />
                </div>
                <h3 className="mt-5 text-base font-bold text-white">
                  Corporate Registration &amp; Governance
                </h3>
                <div className="mt-4 space-y-2.5 text-xs text-slate-300">
                  <p><strong>Entity Name:</strong> Ekedtronics Retail Pvt. Ltd.</p>
                  <p><strong>CIN:</strong> U52100KA2024PTC184920</p>
                  <p><strong>GSTIN:</strong> 29AABCE1234F1Z8</p>
                  <p><strong>Headquarters:</strong> Electronic City Phase 1, Bengaluru, Karnataka, India 560100</p>
                  <p><strong>Banking Partner:</strong> HDFC Bank Ltd. (Commercial Branch)</p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-800 text-[11px] text-slate-400">
                  Official verified member of Indian Consumer Electronics Retail Guild.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars */}
      <section className="border-t border-slate-200 bg-[#f8fafc] py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <ScrollReveal>
            <div className="max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0f766e]">
                Foundational Standards
              </span>
              <h2 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Core Operating Principles
              </h2>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {corporatePillars.map((pillar) => {
                const Icon = pillar.icon
                return (
                  <div
                    key={pillar.title}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="grid size-10 place-items-center rounded-lg bg-slate-50 text-[#d94815]">
                          <Icon size={20} aria-hidden="true" />
                        </span>
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                          {pillar.badge}
                        </span>
                      </div>
                      <h3 className="mt-4 font-bold text-slate-900 text-sm">{pillar.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600">{pillar.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Corporate Contact CTA */}
      <section className="border-t border-slate-200 bg-white py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-[1280px]">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 sm:p-10 max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Need Guidance with Hardware Specifications?</h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
              Our Bengaluru desk provides direct consultation for audio installations, home theater configuration, and enterprise volume procurement.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/products"
                className="flex items-center gap-2 rounded-lg bg-[#d94815] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#c2410c]"
              >
                <span>Browse Product Catalog</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Contact Customer Care Desk
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PincodeModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
      />

      <Footer />
    </main>
  )
}
