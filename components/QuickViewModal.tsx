'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { X, Star, ShoppingBag, Zap, Heart, Check, ShieldCheck, Truck, RotateCcw } from 'lucide-react'
import { useStore } from '@/lib/store'

export function QuickViewModal() {
  const router = useRouter()
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } = useStore()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setQuickViewProduct(null)
      }
    }
    if (quickViewProduct) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [quickViewProduct, setQuickViewProduct])

  if (!quickViewProduct) return null

  const isWish = isInWishlist(quickViewProduct.id)

  const handleAdd = () => {
    addToCart(quickViewProduct, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleBuy = () => {
    addToCart(quickViewProduct, quantity)
    setQuickViewProduct(null)
    router.push('/checkout')
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
      onClick={() => setQuickViewProduct(null)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl border border-slate-200"
      >
        <button
          type="button"
          aria-label="Close product quick view"
          onClick={() => setQuickViewProduct(null)}
          className="absolute right-4 top-4 z-20 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={18} />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="flex items-center justify-center bg-slate-50 p-6 border-b md:border-b-0 md:border-r border-slate-100">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="max-h-56 sm:max-h-72 w-auto object-contain mix-blend-multiply"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col p-6 sm:p-7">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
              <span>{quickViewProduct.brand}</span>
              <span className="text-[#0f766e]">{quickViewProduct.category}</span>
            </div>

            <h2 id="quick-view-title" className="mt-2 text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {quickViewProduct.name}
            </h2>

            <div className="mt-2 flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 rounded bg-[#0f766e] px-2 py-0.5 font-bold text-white text-[11px]">
                {quickViewProduct.rating} <Star size={10} fill="currentColor" aria-hidden="true" />
              </span>
              <span className="text-slate-500">({quickViewProduct.reviewsCount} verified reviews)</span>
              <span className="ml-auto font-semibold text-emerald-700">● {quickViewProduct.stockCount} in stock</span>
            </div>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-3 border-y border-slate-100 py-3">
              <span className="text-xl font-bold text-slate-900">
                ₹{quickViewProduct.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}
              </span>
              <span className="rounded bg-orange-50 px-2 py-0.5 text-xs font-bold text-[#d94815]">
                {quickViewProduct.discount}
              </span>
            </div>

            {/* Description */}
            <p className="mt-3 text-xs leading-relaxed text-slate-600">
              {quickViewProduct.description}
            </p>

            {/* Specifications */}
            {quickViewProduct.features && (
              <div className="mt-3.5 space-y-1 rounded-lg bg-slate-50 p-3 text-xs">
                <p className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">Specifications:</p>
                {quickViewProduct.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-600">
                    <span className="size-1 rounded-full bg-[#d94815]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="mt-5">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-700">Quantity:</span>
                <div className="flex items-center rounded-lg border border-slate-200">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1 text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-slate-900">{quantity}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-1 text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  aria-label={isWish ? 'Remove from wishlist' : 'Save to wishlist'}
                  className={`ml-auto flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold ${
                    isWish ? 'border-red-200 bg-red-50 text-red-600' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Heart size={14} fill={isWish ? 'currentColor' : 'none'} aria-hidden="true" />
                  <span>{isWish ? 'Saved' : 'Wishlist'}</span>
                </button>
              </div>

              <div className="mt-3.5 grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`flex items-center justify-center gap-1.5 rounded-lg border py-2.5 text-xs font-bold transition ${
                    added
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                      : 'border-[#d94815] text-[#d94815] hover:bg-orange-50'
                  }`}
                >
                  {added ? <Check size={14} /> : <ShoppingBag size={14} />}
                  <span>{added ? 'Added to Cart' : 'Add to Cart'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleBuy}
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-[#d94815] py-2.5 text-xs font-bold text-white transition hover:bg-[#c2410c]"
                >
                  <Zap size={14} fill="currentColor" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>

            {/* Direct Guarantees */}
            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-[10px] text-slate-500 font-medium text-center">
              <span className="flex flex-col items-center gap-1">
                <ShieldCheck size={14} className="text-[#0f766e]" aria-hidden="true" /> 100% Genuine
              </span>
              <span className="flex flex-col items-center gap-1">
                <Truck size={14} className="text-[#d94815]" aria-hidden="true" /> Insured Delivery
              </span>
              <span className="flex flex-col items-center gap-1">
                <RotateCcw size={14} className="text-[#0f766e]" aria-hidden="true" /> Direct Warranty
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
