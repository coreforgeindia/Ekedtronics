'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Logo } from './Logo'
import { Check, Mail, Phone, MapPin, Send, ShieldCheck, Truck, FileText, Lock } from 'lucide-react'
import { PolicyModals, PolicyType } from './PolicyModals'

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim() && email.includes('@')) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 5000)
    }
  }

  return (
    <>
      <footer className="border-t border-slate-200 bg-[#0f172a] text-slate-300">
        {/* Trust & Operational Guarantees Strip */}
        <div className="border-b border-slate-800 bg-[#0b1120] py-5 sm:py-8">
          <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-3.5 sm:gap-5 px-3 sm:px-6 lg:px-8">
            <div className="flex items-start gap-2 sm:gap-3">
              <span className="grid size-8 sm:size-10 shrink-0 place-items-center rounded-lg bg-orange-500/10 text-[#d94815]" aria-hidden="true">
                <ShieldCheck className="size-4 sm:size-5" />
              </span>
              <div>
                <p className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider">100% Brand Authentic</p>
                <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 leading-snug">Sealed factory packaging with direct OEM warranty</p>
              </div>
            </div>

            <div className="flex items-start gap-2 sm:gap-3">
              <span className="grid size-8 sm:size-10 shrink-0 place-items-center rounded-lg bg-teal-500/10 text-teal-400" aria-hidden="true">
                <Truck className="size-4 sm:size-5" />
              </span>
              <div>
                <p className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider">Insured Door Fulfillment</p>
                <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 leading-snug">Pan-India express delivery with tracking telemetry</p>
              </div>
            </div>

            <div className="flex items-start gap-2 sm:gap-3">
              <span className="grid size-8 sm:size-10 shrink-0 place-items-center rounded-lg bg-orange-500/10 text-[#d94815]" aria-hidden="true">
                <FileText className="size-4 sm:size-5" />
              </span>
              <div>
                <p className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider">Verified GST Bill</p>
                <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 leading-snug">Tax invoice with serial number logged for warranty</p>
              </div>
            </div>

            <div className="flex items-start gap-2 sm:gap-3">
              <span className="grid size-8 sm:size-10 shrink-0 place-items-center rounded-lg bg-teal-500/10 text-teal-400" aria-hidden="true">
                <Lock className="size-4 sm:size-5" />
              </span>
              <div>
                <p className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider">Encrypted Payments</p>
                <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 leading-snug">256-Bit SSL verified digital checkout (Online Only)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Directory & Corporate Footer Content */}
        <div className="mx-auto max-w-[1280px] px-3 py-8 sm:py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
            {/* Corporate Profile Column */}
            <div className="lg:col-span-2">
              <Logo height={42} variant="light" />
              <p className="mt-3.5 max-w-sm text-xs leading-relaxed text-slate-400">
                Ekedtronics Retail Pvt. Ltd. is an authorized retail distributor for high-performance audiovisual equipment, smartphones, computing systems, and smart appliances. Every unit is dispatched in tamper-evident packaging with valid manufacturer documentation.
              </p>
              <div className="mt-4 flex flex-col gap-1.5 text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <MapPin size={13} className="text-[#d94815] shrink-0" aria-hidden="true" />
                  <span>Electronic City Phase 1, Bangalore, Karnataka 560100</span>
                </span>
                <span className="text-[11px] text-slate-500 pl-5">GSTIN: 29AABCE1234F1Z8 · Corporate CIN: U52100KA2024PTC184920</span>
                <a href="tel:+918150077222" className="flex items-center gap-2 hover:text-white transition">
                  <Phone size={13} className="text-[#0f766e] shrink-0" aria-hidden="true" />
                  <span>Direct Helpdesk: +91 8150077222 (8 AM - 10 PM IST)</span>
                </a>
                <a href="mailto:ekedtronics.sales@gmail.com" className="flex items-center gap-2 hover:text-white transition">
                  <Mail size={13} className="text-[#d94815] shrink-0" aria-hidden="true" />
                  <span>Support: ekedtronics.sales@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white">Store Directory</p>
              <ul className="mt-3.5 space-y-2 text-xs">
                <li>
                  <Link href="/" className="hover:text-white transition">Home Page</Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-white transition">All Products Catalog</Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition">Corporate Profile &amp; Quality Standards</Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition">Customer Care &amp; Support</Link>
                </li>
                <li>
                  <Link href="/admin" className="text-teal-400 hover:text-teal-300 font-semibold transition">
                    Admin Workspace →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Catalog Categories Column */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white">Product Categories</p>
              <ul className="mt-3.5 space-y-2 text-xs">
                {['Smartphones', 'Laptops', 'Televisions', 'Audio', 'Cameras', 'Appliances', 'Gaming', 'Smart Home'].map((cat) => (
                  <li key={cat}>
                    <Link href={`/products?category=${encodeURIComponent(cat)}`} className="hover:text-white transition">
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies & Newsletter Column */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white">Corporate Policies</p>
              <ul className="mt-3.5 space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => setActivePolicy('terms')}
                    className="text-left hover:text-white transition cursor-pointer"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePolicy('privacy')}
                    className="text-left hover:text-white transition cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePolicy('shipping')}
                    className="text-left hover:text-white transition cursor-pointer"
                  >
                    Pan-India Shipping Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePolicy('warranty')}
                    className="text-left hover:text-white transition cursor-pointer"
                  >
                    Warranty &amp; Replacement
                  </button>
                </li>
              </ul>

              {/* Newsletter Form */}
              <div className="mt-5 border-t border-slate-800 pt-4">
                <p className="text-[11px] font-bold text-white uppercase tracking-wider">Product Updates</p>
                <form onSubmit={handleSubscribe} className="mt-2">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address for product releases
                  </label>
                  <div className="flex overflow-hidden rounded-md border border-slate-700 bg-slate-800 focus-within:border-[#d94815]">
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter business or personal email"
                      className="w-full bg-transparent px-3 py-1.5 text-xs text-white placeholder-slate-400 outline-none"
                    />
                    <button
                      type="submit"
                      aria-label="Subscribe to updates"
                      className="bg-[#d94815] px-3 text-white transition hover:bg-[#c2410c]"
                    >
                      <Send size={13} />
                    </button>
                  </div>
                  {subscribed && (
                    <p className="mt-1.5 text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                      <Check size={12} /> Email registered for product releases.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Legal Disclaimers & Copyright */}
          <div className="mt-10 border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Ekedtronics Retail Pvt. Ltd. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-4 text-[11px]">
              <span>Verified Payment Channels: UPI · Visa · Mastercard · RuPay · NetBanking</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">Online Transactions Only (No COD)</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Corporate Policy Modals */}
      <PolicyModals policy={activePolicy} onClose={() => setActivePolicy(null)} />
    </>
  )
}
