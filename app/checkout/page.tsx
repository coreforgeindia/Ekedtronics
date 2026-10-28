'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  QrCode,
  Building2,
  Lock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { Logo } from '@/components/Logo'
import { useStore } from '@/lib/store'
import { ClientAddress } from '@/lib/types'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, cartSubtotal, cartTax, cartDiscount, cartTotal, placeOrder, deliveryLocation } = useStore()

  // Form Details
  const [address, setAddress] = useState<ClientAddress>({
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    street: '',
    landmark: '',
    city: deliveryLocation.city || 'Bengaluru',
    state: 'Karnataka',
    pincode: deliveryLocation.pincode || '560001'
  })

  // Same as Phone checkbox for WhatsApp
  const [sameAsPhone, setSameAsPhone] = useState(true)

  // Payment Options (Online Only)
  const [paymentMethod, setPaymentMethod] = useState<'UPI / QR' | 'Credit / Debit Card' | 'Net Banking'>('UPI / QR')

  // Card Inputs
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')

  // UPI Inputs
  const [upiId, setUpiId] = useState('')

  // Netbanking Bank
  const [selectedBank, setSelectedBank] = useState('HDFC Bank')

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handlePhoneChange = (val: string) => {
    const cleaned = val.replace(/[^\d+]/g, '')
    setAddress((prev) => ({
      ...prev,
      phone: cleaned,
      whatsapp: sameAsPhone ? cleaned : prev.whatsapp
    }))
  }

  const validateForm = () => {
    if (!address.fullName.trim()) return 'Please enter your full legal name.'
    if (!address.email.trim() || !address.email.includes('@')) return 'Please enter a valid email address for tax invoice delivery.'
    if (!address.phone.trim() || address.phone.length < 10) return 'Please enter a valid 10-digit mobile phone number.'
    if (!address.whatsapp.trim()) return 'Please enter a valid WhatsApp number for automated billing updates.'
    if (!address.street.trim()) return 'Please enter your complete street address or apartment/house details.'
    if (!address.city.trim()) return 'Please enter your destination city.'
    if (!address.pincode.trim() || address.pincode.length < 6) return 'Please enter a valid 6-digit Indian PIN code.'

    if (paymentMethod === 'Credit / Debit Card') {
      const rawCard = cardNumber.replace(/\s/g, '')
      if (rawCard.length < 16) return 'Please enter a valid 16-digit card number.'
      if (!cardExpiry.trim()) return 'Please enter card expiry date (MM/YY).'
      if (!cardCvv.trim() || cardCvv.length < 3) return 'Please enter 3-digit CVV.'
    }

    return null
  }

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    const err = validateForm()
    if (err) {
      setErrorMessage(err)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (cart.length === 0) {
      setErrorMessage('Your cart is empty. Please add items to complete checkout.')
      return
    }

    setIsProcessing(true)

    // Simulate online gateway authentication
    setTimeout(() => {
      const txnRef =
        paymentMethod === 'UPI / QR'
          ? `UPI-TXN-${Math.floor(1000000000 + Math.random() * 9000000000)}`
          : paymentMethod === 'Credit / Debit Card'
          ? `CARD-TXN-${Math.floor(1000000000 + Math.random() * 9000000000)}`
          : `NETBK-TXN-${Math.floor(1000000000 + Math.random() * 9000000000)}`

      const generatedOrder = placeOrder(address, paymentMethod, txnRef)
      setIsProcessing(false)
      router.push(`/order-success?orderId=${encodeURIComponent(generatedOrder.id)}`)
    }, 1800)
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#0f172a] pb-16" id="main-content">
      {/* Checkout Minimal Header */}
      <header className="border-b border-slate-200 bg-white py-2.5 sm:py-3.5 px-3 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900"
            >
              <ArrowLeft size={15} />
              <span className="hidden sm:inline">Return to Catalog</span>
            </Link>
            <div className="h-4 w-px bg-slate-200" />
            <Logo height={36} />
          </div>

          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-[#0f766e]">
            <ShieldCheck size={15} aria-hidden="true" />
            <span className="hidden sm:inline">256-Bit SSL Encrypted Checkout</span>
            <span className="sm:hidden">256-Bit SSL</span>
          </div>
        </div>
      </header>

      {/* Online Only Notice */}
      <div className="bg-orange-50 border-b border-orange-200/80 py-2 px-3 text-center text-[11px] sm:text-xs font-semibold text-[#d94815]">
        Online Payment Gateway (Zero COD) · Instant Tax Invoice Dispatched to WhatsApp &amp; Email
      </div>

      <div className="mx-auto max-w-[1280px] px-3 sm:px-6 lg:px-8 pt-5 sm:pt-8">
        {errorMessage && (
          <div role="alert" className="mb-5 flex items-center gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-bold text-red-700">
            <AlertCircle size={18} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleProcessPayment} className="grid gap-6 sm:gap-8 lg:grid-cols-12">
          {/* Left Column: Shipping & Payment */}
          <div className="space-y-5 sm:space-y-6 lg:col-span-7">
            {/* 1. Client Contact & Address */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-7 shadow-xs">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3.5">
                <span className="grid size-7 place-items-center rounded-md bg-orange-50 text-[#d94815] font-bold text-xs">
                  1
                </span>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-slate-900">Contact &amp; Shipping Destination</h2>
                  <p className="text-xs text-slate-500">Official GST invoice is generated matching the billing details below</p>
                </div>
              </div>

              <div className="mt-4 space-y-3.5 text-xs">
                <div>
                  <label htmlFor="chk-fullname" className="block font-bold text-slate-700">
                    Full Legal Name *
                  </label>
                  <input
                    id="chk-fullname"
                    type="text"
                    required
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    placeholder="e.g. Aarav Mehta"
                    className="mt-1 h-9 w-full rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-[#d94815]"
                  />
                </div>

                <div className="grid gap-3.5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="chk-email" className="block font-bold text-slate-700">
                      Email Address (For GST Tax Invoice PDF) *
                    </label>
                    <input
                      id="chk-email"
                      type="email"
                      required
                      value={address.email}
                      onChange={(e) => setAddress({ ...address, email: e.target.value })}
                      placeholder="e.g. aarav@gmail.com"
                      className="mt-1 h-9 w-full rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-[#d94815]"
                    />
                  </div>
                  <div>
                    <label htmlFor="chk-phone" className="block font-bold text-slate-700">
                      Mobile Telephone Number *
                    </label>
                    <input
                      id="chk-phone"
                      type="tel"
                      required
                      value={address.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="+91 98201 54321"
                      className="mt-1 h-9 w-full rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-[#d94815]"
                    />
                  </div>
                </div>

                {/* WhatsApp Phone */}
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="chk-whatsapp" className="block font-bold text-slate-700">
                      WhatsApp Number (For Automatic Bill Dispatch) *
                    </label>
                    <label className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sameAsPhone}
                        onChange={(e) => {
                          setSameAsPhone(e.target.checked)
                          if (e.target.checked) {
                            setAddress((prev) => ({ ...prev, whatsapp: prev.phone }))
                          }
                        }}
                        className="rounded accent-[#d94815]"
                      />
                      Same as mobile phone
                    </label>
                  </div>
                  <input
                    id="chk-whatsapp"
                    type="tel"
                    required
                    disabled={sameAsPhone}
                    value={sameAsPhone ? address.phone : address.whatsapp}
                    onChange={(e) => setAddress({ ...address, whatsapp: e.target.value })}
                    placeholder="+91 98201 54321"
                    className="mt-1 h-9 w-full rounded-lg border border-slate-200 px-3 text-xs outline-none disabled:bg-slate-50 disabled:text-slate-500 focus:border-[#d94815]"
                  />
                </div>

                {/* Street Address */}
                <div>
                  <label htmlFor="chk-street" className="block font-bold text-slate-700">
                    Street Address / Flat / Building *
                  </label>
                  <input
                    id="chk-street"
                    type="text"
                    required
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    placeholder="e.g. Flat 402, Sea Green Heights, Worli Sea Face"
                    className="mt-1 h-9 w-full rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-[#d94815]"
                  />
                </div>

                <div className="grid gap-3.5 sm:grid-cols-3">
                  <div>
                    <label htmlFor="chk-landmark" className="block font-bold text-slate-700">
                      Landmark (Optional)
                    </label>
                    <input
                      id="chk-landmark"
                      type="text"
                      value={address.landmark}
                      onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                      placeholder="Near Worli Dairy"
                      className="mt-1 h-9 w-full rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-[#d94815]"
                    />
                  </div>
                  <div>
                    <label htmlFor="chk-city" className="block font-bold text-slate-700">
                      City *
                    </label>
                    <input
                      id="chk-city"
                      type="text"
                      required
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      placeholder="Mumbai"
                      className="mt-1 h-9 w-full rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-[#d94815]"
                    />
                  </div>
                  <div>
                    <label htmlFor="chk-pincode" className="block font-bold text-slate-700">
                      PIN Code *
                    </label>
                    <input
                      id="chk-pincode"
                      type="text"
                      maxLength={6}
                      required
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, '') })}
                      placeholder="400018"
                      className="mt-1 h-9 w-full rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-[#d94815]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="chk-state" className="block font-bold text-slate-700">
                    State *
                  </label>
                  <select
                    id="chk-state"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="mt-1 h-9 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-800 outline-none focus:border-[#d94815]"
                  >
                    {[
                      'Karnataka', 'Maharashtra', 'Delhi NCR', 'Gujarat', 'Tamil Nadu',
                      'Telangana', 'West Bengal', 'Haryana', 'Uttar Pradesh', 'Rajasthan',
                      'Kerala', 'Punjab', 'Madhya Pradesh', 'Goa', 'Andhra Pradesh'
                    ].map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Online Payment Gateway */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                <div className="flex items-center gap-3">
                  <span className="grid size-7 place-items-center rounded-md bg-teal-50 text-[#0f766e] font-bold text-xs">
                    2
                  </span>
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-slate-900">Secure Online Payment Gateway</h2>
                    <p className="text-xs text-slate-500">100% digital payment verified. No COD available.</p>
                  </div>
                </div>
                <span className="rounded bg-red-50 border border-red-200 px-2 py-0.5 text-[10px] font-bold text-red-600">
                  NO COD
                </span>
              </div>

              {/* Payment Method Selector Tabs */}
              <div className="mt-4 grid grid-cols-3 gap-1.5 sm:gap-2">
                {[
                  { id: 'UPI / QR', label: 'UPI / QR Code', icon: QrCode },
                  { id: 'Credit / Debit Card', label: 'Cards (Visa/MC)', icon: CreditCard },
                  { id: 'Net Banking', label: 'Net Banking', icon: Building2 }
                ].map((item) => {
                  const isSelected = paymentMethod === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPaymentMethod(item.id as any)}
                      className={`flex flex-col items-center gap-1 sm:gap-1.5 rounded-lg border p-2 sm:p-3 text-center transition ${
                        isSelected
                          ? 'border-[#d94815] bg-orange-50 text-[#d94815] font-bold shadow-xs'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <item.icon className="size-4 sm:size-5" />
                      <span className="text-[10px] sm:text-xs leading-tight font-medium">{item.label}</span>
                    </button>
                  )
                })}
              </div>

              {/* Tab 1: UPI / QR Code */}
              {paymentMethod === 'UPI / QR' && (
                <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col sm:flex-row items-center gap-5">
                    {/* SVG QR Code */}
                    <div className="flex flex-col items-center rounded-lg bg-white p-3 border border-slate-200 shrink-0">
                      <div className="grid size-36 place-items-center rounded-md bg-slate-900 p-2">
                        <svg viewBox="0 0 100 100" className="size-full text-white" fill="currentColor">
                          <rect x="5" y="5" width="25" height="25" rx="2" fill="#ffffff" />
                          <rect x="10" y="10" width="15" height="15" rx="1" fill="#0f172a" />
                          <rect x="70" y="5" width="25" height="25" rx="2" fill="#ffffff" />
                          <rect x="75" y="10" width="15" height="15" rx="1" fill="#0f172a" />
                          <rect x="5" y="70" width="25" height="25" rx="2" fill="#ffffff" />
                          <rect x="10" y="75" width="15" height="15" rx="1" fill="#0f172a" />
                          <circle cx="50" cy="50" r="12" fill="#d94815" />
                          <text x="50" y="54" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">e</text>
                          <rect x="40" y="15" width="8" height="8" fill="#ffffff" />
                          <rect x="55" y="25" width="8" height="8" fill="#ffffff" />
                          <rect x="70" y="45" width="10" height="8" fill="#ffffff" />
                          <rect x="45" y="75" width="12" height="10" fill="#ffffff" />
                          <rect x="70" y="75" width="8" height="8" fill="#ffffff" />
                        </svg>
                      </div>
                      <span className="mt-1.5 text-[10px] font-bold text-[#d94815]">
                        Scan via Any UPI App
                      </span>
                    </div>

                    <div className="flex-1 space-y-2.5 text-xs">
                      <div>
                        <p className="font-bold text-slate-900">Payable Amount: ₹{cartTotal.toLocaleString('en-IN')}</p>
                        <p className="text-[11px] text-slate-500">Google Pay, PhonePe, Paytm, BHIM, CRED</p>
                      </div>

                      <div className="rounded-md border border-slate-200 bg-white p-2.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Verified Merchant VPA</span>
                        <div className="mt-0.5 flex items-center justify-between font-mono font-bold text-slate-800">
                          <span>ekedtronics.pay@okhdfcbank</span>
                          <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] text-emerald-800">Active</span>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="chk-upi-id" className="block text-[11px] font-bold text-slate-700">
                          Or Enter Your UPI ID / VPA
                        </label>
                        <input
                          id="chk-upi-id"
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="e.g. username@okhdfcbank"
                          className="mt-1 h-8 w-full rounded-md border border-slate-200 bg-white px-2.5 text-xs outline-none focus:border-[#d94815]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Credit / Debit Card */}
              {paymentMethod === 'Credit / Debit Card' && (
                <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-3">
                  <div>
                    <label htmlFor="chk-card-num" className="block text-xs font-bold text-slate-700">
                      Card Number
                    </label>
                    <input
                      id="chk-card-num"
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim()
                        setCardNumber(val)
                      }}
                      placeholder="4532 8920 1234 5678"
                      className="mt-1 h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-xs outline-none focus:border-[#d94815]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="chk-card-name" className="block text-xs font-bold text-slate-700">
                        Cardholder Name
                      </label>
                      <input
                        id="chk-card-name"
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                        placeholder="NAME ON CARD"
                        className="mt-1 h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-xs outline-none focus:border-[#d94815]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label htmlFor="chk-card-exp" className="block text-xs font-bold text-slate-700">
                          Expiry
                        </label>
                        <input
                          id="chk-card-exp"
                          type="text"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="mt-1 h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-xs outline-none focus:border-[#d94815]"
                        />
                      </div>
                      <div>
                        <label htmlFor="chk-card-cvv" className="block text-xs font-bold text-slate-700">
                          CVV
                        </label>
                        <input
                          id="chk-card-cvv"
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                          placeholder="•••"
                          className="mt-1 h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-xs outline-none focus:border-[#d94815]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Net Banking */}
              {paymentMethod === 'Net Banking' && (
                <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2.5">
                  <p className="text-xs font-bold text-slate-700">Select Banking Partner:</p>
                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold sm:grid-cols-3">
                    {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map((bank) => (
                      <button
                        type="button"
                        key={bank}
                        onClick={() => setSelectedBank(bank)}
                        className={`rounded-md border p-2 text-center transition ${
                          selectedBank === bank
                            ? 'border-[#d94815] bg-white text-[#d94815] font-bold shadow-xs'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
              <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between text-sm">
                <span>Order Summary</span>
                <span className="text-xs text-slate-500 font-medium">{cart.length} items</span>
              </h3>

              {/* Items List */}
              <div className="max-h-56 divide-y divide-slate-100 overflow-y-auto py-2">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-3 py-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="size-12 rounded-md object-contain bg-slate-50 p-1 border border-slate-100 shrink-0"
                    />
                    <div className="min-w-0 flex-1 text-xs">
                      <p className="truncate font-bold text-slate-900">{product.name}</p>
                      <p className="text-[11px] text-slate-500">Qty: {quantity}</p>
                    </div>
                    <div className="text-right text-xs font-bold text-slate-900">
                      ₹{(product.price * quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Calculations */}
              <div className="mt-3 space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Taxable Subtotal</span>
                  <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18% Included)</span>
                  <span>₹{cartTax.toLocaleString('en-IN')}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Promotional Savings</span>
                    <span>- ₹{cartDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-emerald-700">
                  <span>Insured Doorstep Transit</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2.5 text-base font-bold text-slate-900">
                  <span>Total Payable</span>
                  <span className="text-[#d94815]">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Pay Action Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#d94815] py-3 text-xs sm:text-sm font-bold text-white transition hover:bg-[#c2410c] active:scale-98 disabled:opacity-60"
              >
                {isProcessing ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Processing Payment Gateway...</span>
                  </>
                ) : (
                  <>
                    <Lock size={15} />
                    <span>Pay ₹{cartTotal.toLocaleString('en-IN')} Online</span>
                  </>
                )}
              </button>

              <div className="mt-3.5 space-y-1 rounded-lg bg-slate-50 p-3 text-[11px] text-slate-500">
                <p className="flex items-center gap-1.5 font-bold text-slate-800">
                  <CheckCircle2 size={13} className="text-[#0f766e]" />
                  <span>GST Tax Invoice Authentication</span>
                </p>
                <p>
                  Upon payment confirmation, an authenticated PDF invoice with product serial tracking is dispatched to your WhatsApp ({address.phone || 'mobile'}) and email.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
