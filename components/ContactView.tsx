'use client'

import React, { useState } from 'react'
import {
  Phone,
  Mail,
  MapPin,
  Send,
  MessageSquare,
  CheckCircle2,
  ChevronDown,
  ExternalLink
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ScrollReveal } from '@/components/ScrollReveal'
import { PincodeModal } from '@/components/PincodeModal'

const faqs = [
  {
    q: 'Why does Ekedtronics operate strictly on an online payment model?',
    a: 'To guarantee immediate courier handover, full transit insurance coverage, eliminate delivery cash-collection surcharges, and instantly log item serial numbers into the manufacturer warranty registry, orders are processed exclusively through encrypted digital gateways (UPI, Cards, and NetBanking).'
  },
  {
    q: 'How and when do I receive my official GST tax invoice?',
    a: 'Upon successful payment authentication, a computer-generated tax invoice containing full customer billing details, shipping destination, GSTIN breakdown, HSN/SAC codes, and item serial numbers is automatically delivered to your registered WhatsApp number and email address.'
  },
  {
    q: 'What are the delivery timelines for regional and metropolitan destinations?',
    a: 'Tier-1 metropolitan locations (Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai, Kolkata, Pune) are delivered within 24 to 48 hours. Other Indian cities, towns, and regional destinations are fulfilled within 2 to 4 business days via insured express couriers.'
  },
  {
    q: 'How does warranty service claim verification work?',
    a: 'Every electronic device delivered by Ekedtronics is 100% genuine with an active official manufacturer warranty. Your GST invoice serves as authentic proof of purchase accepted across all brand-authorized customer service centers nationwide.'
  }
]

export function ContactView() {
  const [locationModalOpen, setLocationModalOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Order & Delivery Inquiry',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true)
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          inquiryType: 'Order & Delivery Inquiry',
          subject: '',
          message: ''
        })
      }, 500)
    }
  }

  return (
    <main className="min-h-screen bg-white text-[#0f172a]" id="main-content">
      <Navbar onOpenLocationModal={() => setLocationModalOpen(true)} />

      {/* Header Banner */}
      <section className="border-b border-slate-200 bg-[#f8fafc] py-8 sm:py-16 px-3 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#0f766e]">
                Direct Commercial Assistance
              </span>
              <h1 className="mt-1.5 text-xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Customer Care &amp; Technical Support Desk
              </h1>
              <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Connect directly with our Bengaluru support specialists for product compatibility advice, order dispatch tracking, bulk commercial procurement, or GST invoicing assistance.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Grid: Support Channels & Structured Form */}
      <div className="mx-auto max-w-[1280px] px-3 sm:px-6 lg:px-8 py-8 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column: Direct Official Channels */}
          <div className="space-y-4 lg:col-span-5">
            <ScrollReveal>
              <h2 className="text-lg font-bold text-slate-900">Direct Support Channels</h2>
              <p className="mt-1 text-xs text-slate-500">Official communication channels monitored during operating hours.</p>

              <div className="mt-5 space-y-3">
                {/* WhatsApp Support Desk */}
                <a
                  href="https://wa.me/918150077222?text=Hello%20Ekedtronics%20Support%2C%20I%20have%20an%20inquiry."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3.5 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-[#0f766e] hover:shadow-xs"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-teal-50 text-[#0f766e]">
                    <MessageSquare size={19} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-900">WhatsApp Commercial Desk</p>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-[#0f766e]">
                        Active Online <ExternalLink size={10} />
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs font-bold text-slate-800">+91 8150077222</p>
                    <p className="mt-1 text-[11px] text-slate-500">Order verification, bill PDF dispatch, and setup queries.</p>
                  </div>
                </a>

                {/* Telephone Helpline */}
                <div className="flex items-start gap-3.5 rounded-xl border border-slate-200 bg-white p-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-orange-50 text-[#d94815]">
                    <Phone size={19} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-500">Direct Telephone Desk</p>
                    <a href="tel:+918150077222" className="mt-0.5 block text-xs font-bold text-slate-900 hover:text-[#d94815]">
                      +91 8150077222
                    </a>
                    <p className="mt-1 text-[11px] text-slate-500">Bengaluru Facility · Monday - Sunday: 8:00 AM - 10:00 PM IST</p>
                  </div>
                </div>

                {/* Email Support */}
                <div className="flex items-start gap-3.5 rounded-xl border border-slate-200 bg-white p-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-teal-50 text-[#0f766e]">
                    <Mail size={19} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-500">Commercial &amp; Billing Inquiries</p>
                    <a href="mailto:ekedtronics.sales@gmail.com" className="mt-0.5 block text-xs font-bold text-slate-900 hover:text-[#0f766e]">
                      ekedtronics.sales@gmail.com
                    </a>
                    <p className="mt-1 text-[11px] text-slate-500">Official written response within 1 business hour</p>
                  </div>
                </div>

                {/* Physical Facility */}
                <div className="flex items-start gap-3.5 rounded-xl border border-slate-200 bg-white p-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-700">
                    <MapPin size={19} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-500">Fulfillment Hub &amp; Experience Center</p>
                    <p className="mt-0.5 text-xs font-bold text-slate-900">
                      Electronic City Phase 1, Bengaluru, Karnataka, India 560100
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500">Direct warehouse dispatch and pre-configured demonstration studio</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Inquiry Submission Form */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={100}>
              <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs">
                <h3 className="text-base font-bold text-slate-900">Submit an Inquiry</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Please provide your contact information and requirements. An assigned specialist will reach out.
                </p>

                {submitted ? (
                  <div className="mt-6 rounded-lg bg-emerald-50 border border-emerald-200 p-6 text-center">
                    <div className="mx-auto grid size-11 place-items-center rounded-full bg-emerald-600 text-white">
                      <CheckCircle2 size={22} />
                    </div>
                    <h4 className="mt-3 font-bold text-slate-900 text-sm">Inquiry Received</h4>
                    <p className="mt-1 text-xs text-slate-600 max-w-sm mx-auto">
                      Thank you. Your inquiry has been routed to our technical service team. You will receive an official update via email or WhatsApp shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-5 space-y-3.5 text-xs">
                    <div className="grid gap-3.5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-full-name" className="block font-bold text-slate-700">
                          Full Legal Name *
                        </label>
                        <input
                          id="contact-full-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Rajesh Kumar"
                          className="mt-1 h-9 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs outline-none focus:border-[#d94815] focus:bg-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="block font-bold text-slate-700">
                          Corporate / Personal Email *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. rajesh@company.com"
                          className="mt-1 h-9 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs outline-none focus:border-[#d94815] focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid gap-3.5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-phone" className="block font-bold text-slate-700">
                          Telephone / WhatsApp Number
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="mt-1 h-9 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs outline-none focus:border-[#d94815] focus:bg-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-department" className="block font-bold text-slate-700">
                          Department
                        </label>
                        <select
                          id="contact-department"
                          value={formData.inquiryType}
                          onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                          className="mt-1 h-9 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#d94815] focus:bg-white"
                        >
                          <option value="Order & Delivery Inquiry">Order &amp; Delivery Tracking</option>
                          <option value="Product Tech Advice">Hardware Compatibility Advice</option>
                          <option value="Online Payment & Invoice">Online Payment &amp; GST Bill</option>
                          <option value="Bulk Celebration / Corporate Gifting">Enterprise Bulk Procurement</option>
                          <option value="Warranty & Service Claim">Manufacturer Warranty Claim</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className="block font-bold text-slate-700">
                        Subject Line
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Brief summary of your inquiry"
                        className="mt-1 h-9 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs outline-none focus:border-[#d94815] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block font-bold text-slate-700">
                        Detailed Message *
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please describe your specific hardware requirements, order references, or questions..."
                        className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs outline-none focus:border-[#d94815] focus:bg-white resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#d94815] py-2.5 text-xs font-bold text-white transition hover:bg-[#c2410c] active:scale-98"
                    >
                      <Send size={13} aria-hidden="true" />
                      <span>Submit Inquiry</span>
                    </button>

                    <p className="text-[11px] text-slate-400 text-center">
                      256-bit SSL encrypted. Contact records are handled under strict privacy standards.
                    </p>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="mt-14 border-t border-slate-200 pt-10">
          <ScrollReveal>
            <div className="max-w-xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0f766e]">
                Knowledge Base
              </span>
              <h2 className="mt-1 text-xl font-bold text-slate-900">Frequently Asked Operational Questions</h2>
            </div>

            <div className="mt-6 mx-auto max-w-3xl space-y-2.5">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index
                return (
                  <div
                    key={faq.q}
                    className="overflow-hidden rounded-lg border border-slate-200 bg-white transition"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="flex w-full items-center justify-between p-4 text-left text-xs font-bold text-slate-900 hover:text-[#d94815]"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={15}
                        className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#d94815]' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <div className="border-t border-slate-100 bg-slate-50 p-4 text-xs leading-relaxed text-slate-600">
                        {faq.a}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </ScrollReveal>
        </div>
      </div>

      <PincodeModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
      />

      <Footer />
    </main>
  )
}
