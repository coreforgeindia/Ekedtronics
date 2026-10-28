'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react'
import { useStore } from '@/lib/store'

export function CartDrawer() {
  const router = useRouter()
  const { cartOpen, setCartOpen, cart, updateQuantity, removeFromCart, cartSubtotal, cartTax, cartTotal, cartCount } = useStore()
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCartOpen(false)
    }
    if (cartOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [cartOpen, setCartOpen])

  if (!cartOpen) return null

  const freeDeliveryThreshold = 999
  const progressPercent = Math.min(100, (cartTotal / freeDeliveryThreshold) * 100)

  const handleCheckout = () => {
    setCartOpen(false)
    router.push('/checkout')
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs"
      onClick={() => setCartOpen(false)}
    >
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10">
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex w-screen max-w-full sm:max-w-md flex-col bg-white shadow-2xl border-l border-slate-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 p-4 sm:p-5">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-lg bg-orange-50 text-[#d94815]">
                <ShoppingBag size={18} />
              </span>
              <div>
                <h2 id="cart-drawer-title" className="font-bold text-slate-900 text-sm sm:text-base">
                  Your Shopping Cart
                </h2>
                <p className="text-xs text-slate-500">{cartCount} items selected</p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close cart drawer"
              onClick={() => setCartOpen(false)}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={18} />
            </button>
          </div>

          {/* Delivery Threshold Notice */}
          <div className="bg-slate-50 border-b border-slate-100 px-5 py-2.5 text-xs">
            <div className="flex items-center justify-between font-semibold text-slate-700 text-[11px]">
              <span>{cartTotal >= freeDeliveryThreshold ? '✓ Free Insured Delivery Eligible' : `Add ₹${(freeDeliveryThreshold - cartTotal).toLocaleString('en-IN')} for Free Delivery`}</span>
              <span className="text-[#0f766e]">Direct GST Invoice</span>
            </div>
            <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full bg-[#0f766e] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="grid size-14 place-items-center rounded-xl bg-slate-100 text-slate-400">
                  <ShoppingBag size={28} />
                </div>
                <p className="mt-3 font-bold text-slate-900 text-sm">Your cart is currently empty</p>
                <p className="mt-1 text-xs text-slate-500 max-w-xs">
                  Browse our certified electronics catalog for genuine smartphones, laptops, audio systems, and televisions.
                </p>
                <Link
                  href="/products"
                  onClick={() => setCartOpen(false)}
                  className="mt-4 rounded-lg bg-[#d94815] px-4 py-2 text-xs font-bold text-white hover:bg-[#c2410c]"
                >
                  Explore Catalog
                </Link>
              </div>
            ) : (
              cart.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-3 rounded-lg border border-slate-200 bg-white p-3"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="size-16 shrink-0 rounded-md bg-slate-50 object-contain p-1 border border-slate-100"
                  />
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <p className="line-clamp-1 text-xs font-bold text-slate-900">{product.name}</p>
                        <button
                          type="button"
                          aria-label={`Remove ${product.name} from cart`}
                          onClick={() => removeFromCart(product.id)}
                          className="text-slate-400 hover:text-red-600 p-0.5"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-500">{product.brand} · {product.category}</p>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded-md border border-slate-200 bg-white">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="px-2 py-0.5 text-xs font-bold text-slate-600 hover:bg-slate-100"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-900">{quantity}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="px-2 py-0.5 text-xs font-bold text-slate-600 hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-xs font-bold text-slate-900">
                        ₹{(product.price * quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="border-t border-slate-200 bg-slate-50 p-4 sm:p-5">
              {/* Promo input */}
              <div className="mb-3.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Coupon Code"
                      className="h-8 w-full rounded-md border border-slate-200 bg-white pl-7 pr-2 text-xs outline-none focus:border-[#d94815]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (promoCode.trim()) setPromoApplied(true)
                    }}
                    className="rounded-md border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 hover:bg-slate-100"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="mt-1 text-[11px] font-semibold text-emerald-700">
                    ✓ Promo registered. Applicable discounts computed at checkout.
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18% Included)</span>
                  <span>₹{cartTax.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Insured Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-bold text-slate-900">
                  <span>Total Payable</span>
                  <span className="text-[#d94815]">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                type="button"
                onClick={handleCheckout}
                className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#d94815] py-2.5 text-xs font-bold text-white transition hover:bg-[#c2410c] active:scale-98"
              >
                <span>Proceed to Online Checkout</span>
                <ArrowRight size={15} />
              </button>

              <p className="mt-2 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1">
                <ShieldCheck size={13} className="text-[#0f766e]" />
                Online Payment Only · Instant Tax Invoice Generated
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
