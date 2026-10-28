'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Heart, ShoppingBag, Star, Eye, Zap, Check } from 'lucide-react'
import { Product } from '@/lib/types'
import { useStore } from '@/lib/store'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useStore()
  const [justAdded, setJustAdded] = useState(false)
  const isWish = isInWishlist(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(product, 1)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1800)
  }

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(product, 1)
    router.push('/checkout')
  }

  return (
    <article
      tabIndex={0}
      role="button"
      aria-label={`View details for ${product.name}, price ₹${product.price.toLocaleString('en-IN')}`}
      onClick={() => setQuickViewProduct(product)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setQuickViewProduct(product)
        }
      }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs transition duration-200 hover:border-slate-300 hover:shadow-md cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#d94815]"
    >
      {/* Top Tag */}
      {product.tag && (
        <div className="absolute left-2.5 top-2.5 z-10 rounded bg-[#0f172a] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
          {product.tag}
        </div>
      )}

      {/* Wishlist Button */}
      <button
        type="button"
        aria-label={isWish ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        onClick={(e) => {
          e.stopPropagation()
          toggleWishlist(product.id)
        }}
        className={`absolute right-2 top-2 z-10 grid size-7 sm:size-8 place-items-center rounded-full bg-white/95 shadow-xs border border-slate-200 transition hover:scale-105 ${
          isWish ? 'text-red-600' : 'text-slate-400 hover:text-red-600'
        }`}
      >
        <Heart size={14} fill={isWish ? 'currentColor' : 'none'} aria-hidden="true" />
      </button>

      {/* Product Image Preview */}
      <div className="relative flex h-36 sm:h-52 w-full items-center justify-center overflow-hidden bg-slate-50 p-2.5 sm:p-4 border-b border-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain mix-blend-multiply transition duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Quick View Overlay Button */}
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/20 opacity-0 transition group-hover:opacity-100 hidden sm:flex">
          <span className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-slate-800 shadow-sm">
            <Eye size={13} aria-hidden="true" />
            <span>Quick View</span>
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col p-2.5 sm:p-4">
        {/* Brand and Category Metadata */}
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500">
          <span className="truncate max-w-[50%]">{product.brand}</span>
          <span className="text-[#0f766e] truncate max-w-[50%] text-right">{product.category}</span>
        </div>

        {/* Title */}
        <h3 className="mt-1 line-clamp-2 text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#d94815] transition-colors leading-snug min-h-[2rem] sm:min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Rating and Reviews */}
        <div className="mt-1.5 sm:mt-2 flex items-center gap-1 sm:gap-1.5 text-xs">
          <span className="flex items-center gap-0.5 rounded bg-[#0f766e] px-1 sm:px-1.5 py-0.5 font-bold text-white text-[9px] sm:text-[10px]">
            {product.rating} <Star size={9} fill="currentColor" aria-hidden="true" />
          </span>
          <span className="text-slate-500 text-[10px] sm:text-[11px]">
            ({product.reviewsCount})
          </span>
        </div>

        {/* Feature highlight */}
        {product.features && product.features[0] && (
          <p className="mt-1.5 line-clamp-1 text-[11px] text-slate-500 hidden md:block">
            • {product.features[0]}
          </p>
        )}

        {/* Pricing Block */}
        <div className="mt-auto pt-2.5 sm:pt-3 border-t border-slate-100">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-sm sm:text-base md:text-lg font-bold text-slate-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-400 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
            <span className="ml-auto text-[10px] sm:text-xs font-bold text-[#d94815]">
              {product.discount}
            </span>
          </div>

          <div className="mt-1 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500">
            <span className="font-semibold text-emerald-700 truncate">✓ Insured Transit</span>
            <span className="font-medium shrink-0 ml-1">{product.stockCount} left</span>
          </div>

          {/* Action Buttons */}
          <div className="mt-2.5 sm:mt-3 grid grid-cols-2 gap-1.5 sm:gap-2">
            <button
              type="button"
              aria-label={`Add ${product.name} to cart`}
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-1 rounded-lg border py-1.5 sm:py-2 px-1 text-[11px] sm:text-xs font-bold transition active:scale-98 ${
                justAdded
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                  : 'border-[#d94815] text-[#d94815] hover:bg-orange-50'
              }`}
            >
              {justAdded ? (
                <>
                  <Check size={12} className="shrink-0" aria-hidden="true" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={12} className="shrink-0" aria-hidden="true" />
                  <span>Add</span>
                </>
              )}
            </button>
            <button
              type="button"
              aria-label={`Buy ${product.name} now`}
              onClick={handleBuyNow}
              className="flex items-center justify-center gap-1 rounded-lg bg-[#d94815] py-1.5 sm:py-2 px-1 text-[11px] sm:text-xs font-bold text-white transition hover:bg-[#c2410c] active:scale-98"
            >
              <Zap size={12} className="shrink-0" fill="currentColor" aria-hidden="true" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
