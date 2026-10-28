'use client'

import React, { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Search,
  ArrowUpDown,
  X,
  Heart
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ProductCard } from '@/components/ProductCard'
import { ScrollReveal } from '@/components/ScrollReveal'
import { PincodeModal } from '@/components/PincodeModal'
import { useStore } from '@/lib/store'

export function ProductsCatalogView() {
  const searchParams = useSearchParams()
  const { products, wishlist } = useStore()

  const initialCat = searchParams.get('category') || 'All'
  const initialSearch = searchParams.get('q') || ''
  const initialFilter = searchParams.get('filter') || ''

  const [selectedCategory, setSelectedCategory] = useState(initialCat)
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured')
  const [selectedBrand, setSelectedBrand] = useState('All')
  const [onlyWishlist, setOnlyWishlist] = useState(initialFilter === 'wishlist')
  const [locationModalOpen, setLocationModalOpen] = useState(false)

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) setSelectedCategory(cat)
    const q = searchParams.get('q')
    if (q) setSearchQuery(q)
    const f = searchParams.get('filter')
    if (f === 'wishlist') setOnlyWishlist(true)
  }, [searchParams])

  const categories = [
    'All',
    'Smartphones',
    'Laptops',
    'Televisions',
    'Audio',
    'Cameras',
    'Appliances',
    'Gaming',
    'Smart Home'
  ]

  const brands = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.brand)))
    return ['All', ...unique]
  }, [products])

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'All' && p.category !== selectedCategory) return false
        if (selectedBrand !== 'All' && p.brand !== selectedBrand) return false
        if (onlyWishlist && !wishlist.includes(p.id)) return false
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase()
          const match =
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
          if (!match) return false
        }
        return true
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price
        if (sortBy === 'price-desc') return b.price - a.price
        if (sortBy === 'rating') return b.rating - a.rating
        return 0
      })
  }, [products, selectedCategory, selectedBrand, onlyWishlist, searchQuery, sortBy, wishlist])

  const clearAllFilters = () => {
    setSelectedCategory('All')
    setSelectedBrand('All')
    setSearchQuery('')
    setOnlyWishlist(false)
    setSortBy('featured')
  }

  return (
    <main className="min-h-screen bg-white text-[#0f172a]" id="main-content">
      <Navbar onOpenLocationModal={() => setLocationModalOpen(true)} />

      {/* Header Banner */}
      <section className="border-b border-slate-200 bg-[#f8fafc] py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0f766e]">
                Certified Electronics Inventory
              </span>
              <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Product Catalog ({products.length} Products)
              </h1>
              <p className="mt-1.5 text-xs text-slate-500 max-w-xl">
                Factory-sealed technology with direct manufacturer warranties, serial-tracked tax invoicing, and insured courier dispatch.
              </p>
            </div>

            {/* Wishlist filter badge */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setOnlyWishlist(!onlyWishlist)}
                aria-pressed={onlyWishlist}
                className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                  onlyWishlist
                    ? 'border-red-300 bg-red-50 text-red-600'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <Heart size={14} fill={onlyWishlist ? 'currentColor' : 'none'} aria-hidden="true" />
                <span>Wishlist Only ({wishlist.length})</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Controls: Categories Strip */}
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-5">
          {/* Categories Tab Buttons */}
          <div
            role="tablist"
            aria-label="Filter catalog by category"
            className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none"
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 rounded-lg px-3.5 py-1.5 text-xs font-bold transition ${
                    isActive
                      ? 'bg-[#d94815] text-white shadow-xs'
                      : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Search, Brand Filter & Sorting */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
            {/* Search */}
            <div className="relative w-full sm:max-w-md">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by name, brand, or specifications..."
                className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-7 text-xs outline-none focus:border-[#d94815] focus:bg-white"
              />
              {searchQuery && (
                <button
                  type="button"
                  aria-label="Clear filter query"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Brand, Sort & Reset */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {/* Brand Selector */}
              <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 shrink-0">
                <span className="text-slate-400 text-[11px]">Brand:</span>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  aria-label="Filter by brand"
                  className="bg-transparent font-bold text-slate-900 outline-none text-xs"
                >
                  {brands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 shrink-0">
                <ArrowUpDown size={13} className="text-slate-400" aria-hidden="true" />
                <span className="text-slate-400 text-[11px]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Sort products"
                  className="bg-transparent font-bold text-slate-900 outline-none text-xs"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {(selectedCategory !== 'All' || selectedBrand !== 'All' || searchQuery || onlyWishlist) && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 shrink-0"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Metadata Bar */}
        <div className="flex items-center justify-between py-3.5 text-xs text-slate-500">
          <p>
            Showing <strong className="text-slate-900">{filteredProducts.length}</strong> of{' '}
            <strong className="text-slate-900">{products.length}</strong> products
            {selectedCategory !== 'All' && <span> in <span className="text-[#d94815] font-semibold">{selectedCategory}</span></span>}
            {onlyWishlist && <span> (Wishlist)</span>}
          </p>
          <span className="hidden sm:inline font-medium text-emerald-700">
            ✓ Factory sealed box · Direct OEM warranty
          </span>
        </div>

        {/* Products Grid */}
        <ScrollReveal>
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 p-12 text-center">
              <div className="grid size-12 place-items-center rounded-lg bg-white shadow-xs text-slate-400 border border-slate-200">
                <Search size={22} />
              </div>
              <p className="mt-3 text-sm font-bold text-slate-900">No matching electronics found</p>
              <p className="mt-1 text-xs text-slate-500 max-w-sm">
                Try modifying your search criteria or resetting filters to browse all categories.
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="mt-4 rounded-lg bg-[#d94815] px-4 py-2 text-xs font-bold text-white"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </ScrollReveal>
      </div>

      <PincodeModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
      />

      <Footer />
    </main>
  )
}
