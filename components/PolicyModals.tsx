'use client'

import React, { useEffect } from 'react'
import { X, ShieldCheck, Truck, RefreshCw, FileText } from 'lucide-react'

export type PolicyType = 'terms' | 'privacy' | 'shipping' | 'warranty' | null

interface PolicyModalsProps {
  policy: PolicyType
  onClose: () => void
}

export function PolicyModals({ policy, onClose }: PolicyModalsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (policy) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [policy, onClose])

  if (!policy) return null

  const contentMap: Record<
    Exclude<PolicyType, null>,
    {
      title: string
      subtitle: string
      icon: typeof ShieldCheck
      sections: { heading: string; body: string }[]
    }
  > = {
    terms: {
      title: 'Terms of Service & Commercial Conditions',
      subtitle: 'Standard retail and online sales terms governing Ekedtronics transactions',
      icon: FileText,
      sections: [
        {
          heading: '1. Commercial Sale & Pricing',
          body: 'All products listed on Ekedtronics Retail Pvt. Ltd. are genuine, brand-authorized units intended for end-consumer or business use. Prices are inclusive of all applicable Goods and Services Tax (GST 18%) unless specified otherwise. We reserve the right to correct typographical pricing discrepancies prior to order dispatch.'
        },
        {
          heading: '2. Payment Methods & Cash on Delivery Policy',
          body: 'To uphold strict courier tracking compliance, reduce transit shrinkage, and provide instant GST documentation, Ekedtronics processes orders exclusively through verified digital payment channels (UPI, Debit/Credit Cards, and Net Banking). Cash on Delivery (COD) is not supported.'
        },
        {
          heading: '3. Digital Tax Invoicing',
          body: 'Every confirmed online transaction instantly generates a legally valid computer-generated GST tax invoice containing item serial numbers, HSN/SAC codes, and GSTIN breakdown. This invoice is transmitted to your registered WhatsApp number and email address.'
        },
        {
          heading: '4. Limitation of Liability',
          body: 'Ekedtronics warrants that products are free from tampering at the time of handover to logistics partners. Hardware operational warranties are provided directly by original equipment manufacturers (OEMs).'
        }
      ]
    },
    privacy: {
      title: 'Privacy Policy & Data Protection',
      subtitle: 'How Ekedtronics safeguards customer identifiers, payment data, and communication records',
      icon: ShieldCheck,
      sections: [
        {
          heading: '1. Information We Collect',
          body: 'We collect minimal necessary customer information to fulfill orders: full legal name, shipping address, landmark, PIN code, email address, and mobile/WhatsApp number for delivery logistics and GST invoicing.'
        },
        {
          heading: '2. Payment Information Security',
          body: 'Ekedtronics does not store raw credit/debit card numbers, CVV codes, or bank account credentials. All payment processing is routed through PCI-DSS Level 1 compliant online payment gateways using 256-bit SSL encryption.'
        },
        {
          heading: '3. Data Sharing Restrictions',
          body: 'We never sell, rent, or trade customer contact details to third-party marketers. Shipping information is shared strictly with authorized logistics partners solely for delivering consignments.'
        },
        {
          heading: '4. WhatsApp & Email Communications',
          body: 'Transactional order confirmations, tracking links, and GST tax invoices are automatically transmitted via WhatsApp and Email. Customers can opt out of promotional communications at any time.'
        }
      ]
    },
    shipping: {
      title: 'Pan-India Shipping & Fulfillment Policy',
      subtitle: 'Dispatch timeframes, insurance coverage, and delivery guarantees across India',
      icon: Truck,
      sections: [
        {
          heading: '1. Serviceable Locations & Hub Logistics',
          body: 'Ekedtronics ships to over 19,000 postal PIN codes across India through Tier-1 insured courier partners (Blue Dart, Delhivery, DTDC, and Express Air Cargo).'
        },
        {
          heading: '2. Dispatch & Delivery Timelines',
          body: 'Orders placed before 2:00 PM IST on business days are dispatched on the same day from our Bangalore fulfillment center. Metropolitan deliveries (Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai, Pune) typically arrive within 24 to 48 hours. Other Indian regions are delivered within 2 to 4 business days.'
        },
        {
          heading: '3. Transit Insurance & Tamper-Evident Packaging',
          body: 'Every consignment is protected by full transit insurance against damage or loss. High-value electronics (smartphones, laptops, 4K TVs) are sealed with tamper-evident security tape. If the outer carton shows signs of compromise, inspect the packaging with the courier agent before accepting.'
        },
        {
          heading: '4. Free Shipping Threshold',
          body: 'Standard delivery is complimentary on all orders exceeding ₹999. Orders below ₹999 carry a nominal flat fulfillment charge of ₹79.'
        }
      ]
    },
    warranty: {
      title: 'Brand Warranty & Replacement Policy',
      subtitle: 'Direct manufacturer service network support and authentic product replacement guidelines',
      icon: RefreshCw,
      sections: [
        {
          heading: '1. 100% Direct Manufacturer Warranty',
          body: 'All products sold on Ekedtronics are factory-sealed and backed by official Indian brand warranties (Apple, Samsung, Sony, LG, Dell, Bose, Marshall, Dyson, and authorized partners). Warranty terms range from 1 to 3 years depending on the brand category.'
        },
        {
          heading: '2. Service Center Access',
          body: 'Your Ekedtronics official GST invoice serves as authentic proof of purchase accepted across all brand-authorized customer service centers nationwide. No additional warranty registration is required for standard coverage.'
        },
        {
          heading: '3. 7-Day Dead on Arrival (DOA) / Transit Damage Replacement',
          body: 'In the rare event that an item arrives physically damaged or dead on arrival, contact our Bangalore support desk within 7 days of delivery. Upon verification, we facilitate expedited reverse pickup and issue a brand-new sealed replacement.'
        },
        {
          heading: '4. Customer Support Desk',
          body: 'Our experienced product specialists in Bangalore are available Monday through Sunday, 8:00 AM to 10:00 PM IST via Phone (+91 8150077222) and WhatsApp for immediate troubleshooting or warranty guidance.'
        }
      ]
    }
  }

  const activeContent = contentMap[policy]
  const Icon = activeContent.icon

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[85vh] w-full max-w-2xl flex-col rounded-xl sm:rounded-2xl bg-white shadow-2xl border border-slate-200"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 p-4 sm:p-6">
          <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">
            <span className="grid size-8 sm:size-10 shrink-0 place-items-center rounded-lg sm:rounded-xl bg-orange-50 text-[#d94815] mt-0.5 sm:mt-0">
              <Icon className="size-4 sm:size-5" />
            </span>
            <div>
              <h2 id="policy-dialog-title" className="text-sm sm:text-lg font-bold text-slate-900 leading-snug">
                {activeContent.title}
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">{activeContent.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 ml-2"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 sm:space-y-5 text-xs leading-relaxed text-slate-600">
          {activeContent.sections.map((sec, idx) => (
            <div key={idx} className="rounded-lg sm:rounded-xl border border-slate-100 bg-slate-50/60 p-3 sm:p-4">
              <h3 className="font-bold text-slate-900 text-sm">{sec.heading}</h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-normal">{sec.body}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-5 py-3 text-xs text-slate-500">
          <span>Ekedtronics Retail Pvt. Ltd. · Bangalore, Karnataka</span>
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
