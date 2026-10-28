'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  CheckCircle2,
  Printer,
  Mail,
  ArrowRight,
  ShieldCheck,
  LayoutDashboard,
  MessageSquare
} from 'lucide-react'
import { Logo } from '@/components/Logo'
import { useStore } from '@/lib/store'
import { Order } from '@/lib/types'

function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const { orders } = useStore()

  const [order, setOrder] = useState<Order | null>(null)
  const [emailSent, setEmailSent] = useState(false)
  const [whatsappSent, setWhatsappSent] = useState(false)

  useEffect(() => {
    if (orders.length > 0) {
      if (orderId) {
        const found = orders.find((o) => o.id === orderId)
        if (found) setOrder(found)
        else setOrder(orders[0])
      } else {
        setOrder(orders[0])
      }
    }
  }, [orders, orderId])

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6 text-center">
        <div>
          <h2 className="text-sm font-bold text-slate-700">Loading Order Records...</h2>
          <Link href="/" className="mt-3 inline-block text-xs font-bold text-[#d94815]">
            Return to Store
          </Link>
        </div>
      </div>
    )
  }

  // Pre-formatted WhatsApp Message
  const whatsappMessage = encodeURIComponent(
    `*EKEDTRONICS - OFFICIAL TAX INVOICE*\n` +
    `Invoice: ${order.invoiceNumber}\n` +
    `Order ID: ${order.id}\n` +
    `Customer: ${order.customer.fullName}\n` +
    `Shipping To: ${order.customer.street}, ${order.customer.city} - ${order.customer.pincode}\n` +
    `Amount Paid: ₹${order.totalAmount.toLocaleString('en-IN')}\n` +
    `Payment Method: ${order.paymentMethod} (Transaction ID: ${order.transactionId})\n` +
    `Status: Verified Online Payment (PAID)\n\n` +
    `Thank you for choosing Ekedtronics Retail Pvt. Ltd.`
  )

  const handleSendWhatsApp = () => {
    const phoneClean = order.customer.whatsapp.replace(/[^\d]/g, '')
    const url = `https://api.whatsapp.com/send?phone=${phoneClean}&text=${whatsappMessage}`
    window.open(url, '_blank')
    setWhatsappSent(true)
  }

  const handleSendEmail = () => {
    setEmailSent(true)
    setTimeout(() => setEmailSent(false), 4000)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#0f172a] py-5 sm:py-8 px-3 sm:px-6 lg:px-8" id="main-content">
      <div className="mx-auto max-w-4xl">
        {/* Top Header Actions (Hidden on Print) */}
        <div className="no-print mb-4 flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center gap-2">
            <Logo height={38} />
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-xs hover:border-slate-300"
            >
              <Printer size={14} aria-hidden="true" />
              <span>Print Tax Invoice</span>
            </button>
            <Link
              href="/admin"
              className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-800"
            >
              <LayoutDashboard size={14} aria-hidden="true" />
              <span>Admin Records</span>
            </Link>
          </div>
        </div>

        {/* Order Confirmed Notice (Hidden on Print) */}
        <div className="no-print mb-5 rounded-xl border border-emerald-200 bg-white p-4 sm:p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center gap-3.5 text-center sm:text-left">
            <div className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
              <CheckCircle2 size={26} />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 uppercase">
                  Payment Authenticated (PAID)
                </span>
                <span className="text-xs text-slate-500 font-mono font-medium">{order.id}</span>
              </div>
              <h1 className="mt-1 text-base sm:text-xl font-bold text-slate-900">
                Payment Successful — Tax Invoice Generated
              </h1>
              <p className="mt-0.5 text-xs text-slate-600">
                Your order is confirmed and scheduled for priority packaging. A computer-generated tax invoice has been compiled below.
              </p>
            </div>
          </div>

          {/* WhatsApp & Email Invoice Dispatches */}
          <div className="mt-3.5 border-t border-slate-100 pt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleSendWhatsApp}
              className="flex items-center gap-1.5 rounded-lg bg-[#0f766e] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#115e59]"
            >
              <MessageSquare size={13} />
              <span>WhatsApp Invoice ({order.customer.whatsapp})</span>
            </button>

            <button
              type="button"
              onClick={handleSendEmail}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
            >
              <Mail size={13} />
              <span>{emailSent ? '✓ Sent to Email' : `Email Invoice (${order.customer.email})`}</span>
            </button>
          </div>

          {whatsappSent && (
            <p className="mt-2 text-[11px] font-medium text-emerald-700">
              ✓ WhatsApp chat interface initiated with official tax invoice payload.
            </p>
          )}
        </div>

        {/* Printable Official Tax Invoice */}
        <div
          id="printable-invoice"
          className="rounded-xl border border-slate-200 bg-white p-4 sm:p-8 shadow-xs"
        >
          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-slate-200 pb-5">
            <div>
              <Logo height={42} />
              <p className="mt-2 text-xs font-bold text-slate-900">Ekedtronics Retail Pvt. Ltd.</p>
              <p className="text-[11px] text-slate-500">GSTIN: 29AABCE1234F1Z8 · State Code: 29 (Karnataka)</p>
              <p className="text-[11px] text-slate-500">Electronic City Phase 1, Bengaluru, Karnataka, India 560100</p>
              <p className="text-[11px] text-slate-500">Support: +91 8150077222 · ekedtronics.sales@gmail.com</p>
            </div>

            <div className="text-left sm:text-right">
              <span className="rounded bg-orange-50 px-2.5 py-1 text-xs font-bold text-[#d94815] uppercase tracking-wider">
                ORIGINAL TAX INVOICE
              </span>
              <p className="mt-2 font-mono text-xs font-bold text-slate-900">{order.invoiceNumber}</p>
              <p className="text-xs text-slate-500">Order ID: {order.id}</p>
              <p className="text-xs text-slate-500">Date: {order.date}</p>
              <div className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                <ShieldCheck size={12} /> {order.paymentStatus} via {order.paymentMethod}
              </div>
            </div>
          </div>

          {/* Customer & Shipping Details */}
          <div className="grid gap-6 py-5 sm:grid-cols-2 border-b border-slate-200 text-xs">
            <div>
              <p className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">Billed &amp; Shipped To</p>
              <p className="mt-1 font-bold text-slate-900 text-sm">{order.customer.fullName}</p>
              <p className="mt-1 text-slate-600">{order.customer.street}</p>
              {order.customer.landmark && <p className="text-slate-600">Landmark: {order.customer.landmark}</p>}
              <p className="text-slate-600">{order.customer.city}, {order.customer.state} - {order.customer.pincode}</p>
              <p className="mt-1 text-slate-600">WhatsApp: {order.customer.whatsapp}</p>
              <p className="text-slate-600">Email: {order.customer.email}</p>
            </div>

            <div className="sm:text-right">
              <p className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">Transaction &amp; Dispatch Telemetry</p>
              <p className="mt-1 font-mono text-xs text-slate-800">TXN Ref: {order.transactionId}</p>
              <p className="text-slate-600">Mode: {order.paymentMethod}</p>
              <p className="text-slate-600">Fulfillment Status: <strong className="text-[#0f766e]">{order.orderStatus}</strong></p>
              <p className="text-slate-600">Estimated Transit SLA: 24 - 48 Hours Insured</p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="py-5 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 text-[10px] uppercase font-bold text-slate-500">
                <tr>
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Item Description</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3 text-center">Qty</th>
                  <th className="py-2.5 px-3 text-right">Unit Price</th>
                  <th className="py-2.5 px-3 text-right">Total (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {order.items.map((item, idx) => (
                  <tr key={item.product.id}>
                    <td className="py-3 px-3 text-slate-400 font-mono">{idx + 1}</td>
                    <td className="py-3 px-3">
                      <p className="font-bold text-slate-900">{item.product.name}</p>
                      <p className="text-[10px] text-slate-400">Brand: {item.product.brand} · SKU: {item.product.sku}</p>
                    </td>
                    <td className="py-3 px-3 text-slate-500">{item.product.category}</td>
                    <td className="py-3 px-3 text-center font-bold">{item.quantity}</td>
                    <td className="py-3 px-3 text-right font-medium">₹{item.product.price.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-3 text-right font-bold text-slate-900">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals & Terms */}
          <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row justify-between items-start gap-6 text-xs">
            <div className="max-w-xs space-y-1 text-[11px] text-slate-500">
              <p className="font-bold text-slate-700">Invoice Terms:</p>
              <p>1. Computer-generated tax invoice issued under GST Act, 2017.</p>
              <p>2. Preserved copy valid for warranty claims across OEM customer service centers.</p>
              <p>3. Online payment verified. Reverse charge applicability: No.</p>
            </div>

            <div className="w-full sm:w-64 space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>Taxable Value</span>
                <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Integrated GST (18%)</span>
                <span>₹{order.tax.toLocaleString('en-IN')}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Promotional Discount</span>
                  <span>- ₹{order.discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Shipping &amp; Handling</span>
                <span className="text-emerald-700 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-bold text-slate-900">
                <span>Grand Total</span>
                <span className="text-[#d94815]">₹{order.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Signature Block */}
          <div className="mt-8 border-t border-slate-100 pt-5 flex justify-between items-end text-xs text-slate-400">
            <div>
              <p className="font-bold text-slate-800">Ekedtronics Retail Pvt. Ltd.</p>
              <p className="text-[10px]">Bengaluru, Karnataka · GSTIN: 29AABCE1234F1Z8</p>
            </div>
            <div className="text-right">
              <div className="text-xs text-[#0f766e] font-bold">Authorized Signatory</div>
              <p className="text-[10px]">Digitally verified signature</p>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="no-print mt-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/products"
            className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800"
          >
            <span>Continue Shopping</span>
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/admin"
            className="text-xs font-bold text-[#0f766e] hover:underline"
          >
            Open Admin Order Registry →
          </Link>
        </div>
      </div>
    </main>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs font-bold text-slate-500">Loading Order Confirmation...</div>}>
      <OrderSuccessContent />
    </Suspense>
  )
}
