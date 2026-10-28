'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Heart,
  MapPin,
  Menu,
  Phone,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  UserRound,
  X,
  ShieldCheck,
  LayoutDashboard
} from 'lucide-react'
import { Logo } from './Logo'
import { useStore } from '@/lib/store'

interface NavbarProps {
  onOpenLocationModal?: () => void
}

export function Navbar({ onOpenLocationModal }: NavbarProps) {
  const pathname = usePathname()
  const { cartCount, wishlist, products, setCartOpen, deliveryLocation, setQuickViewProduct, authUser, setAuthModalOpen } = useStore()
  const [mobileMenu, setMobileMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Catalog', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact & Support', href: '/contact' }
  ]

  const searchResults = searchQuery.trim()
    ? products
        .filter((p) => `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 5)
    : []

  // Handle escape key to close menus/search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchFocused(false)
        setMobileMenu(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenu])

  return (
    <>
      {/* Top Utility Announcement Bar */}
      <div className="bg-[#0f172a] text-slate-300 text-[11px] sm:text-xs border-b border-slate-800">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8 py-2">
          <div className="hidden sm:flex items-center gap-2 text-slate-300 font-medium">
            <ShieldCheck size={14} className="text-[#d94815] shrink-0" aria-hidden="true" />
            <span>Authorized Direct Brand Distribution · 100% Original Sealed Units</span>
          </div>

          <div className="mx-auto sm:mx-0 flex items-center gap-3 font-semibold text-white">
            <span>Pan-India Insured Dispatch</span>
            <span className="text-slate-500 hidden md:inline">|</span>
            <span className="hidden md:inline text-slate-300">GST Invoice with Serial Traceability</span>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-slate-300 font-medium">
            <a
              href="tel:+918150077222"
              className="flex items-center gap-1.5 transition hover:text-white"
              title="Bangalore Customer Support Desk"
            >
              <Phone size={13} className="text-[#0f766e] shrink-0" aria-hidden="true" />
              <span>Bangalore Helpdesk: +91 8150077222</span>
            </a>
            <span className="text-slate-600">|</span>
            <Link
              href="/admin"
              className="flex items-center gap-1 font-semibold text-slate-200 hover:text-white"
            >
              <LayoutDashboard size={12} aria-hidden="true" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xs">
        <div className="mx-auto flex max-w-[1280px] items-center gap-2 sm:gap-3 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
          {/* Corporate Brand Logo */}
          <Logo height={44} />

          {/* Primary Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-7 text-xs font-bold ml-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 transition ${
                    isActive
                      ? 'text-[#d94815]'
                      : 'text-slate-700 hover:text-[#0f766e]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#d94815]" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Desktop Search Bar */}
          <div className="relative ml-auto hidden md:block max-w-sm flex-1">
            <label htmlFor="desktop-site-search" className="sr-only">
              Search electronics catalog
            </label>
            <div className="relative">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                size={16}
                aria-hidden="true"
              />
              <input
                id="desktop-site-search"
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                placeholder="Search products, brands, models..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-8 text-xs text-slate-900 outline-none transition focus:border-[#d94815] focus:bg-white"
              />
              {searchQuery && (
                <button
                  type="button"
                  aria-label="Clear search input"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Live Search Results Dropdown */}
            {searchFocused && searchResults.length > 0 && (
              <div
                role="listbox"
                aria-label="Search results"
                className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
              >
                <div className="border-b border-slate-100 bg-slate-50 px-3 py-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Matching Products ({searchResults.length})
                </div>
                <div className="max-h-72 divide-y divide-slate-100 overflow-y-auto">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      role="option"
                      aria-selected="false"
                      onClick={() => {
                        setQuickViewProduct(product)
                        setSearchFocused(false)
                      }}
                      className="flex cursor-pointer items-center gap-3 p-3 transition hover:bg-slate-50"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="size-11 rounded-md object-contain bg-slate-50 p-1 border border-slate-100 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-bold text-slate-900">{product.name}</p>
                        <p className="text-[11px] text-slate-500">{product.brand} · {product.category}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs font-bold text-[#d94815]">₹{product.price.toLocaleString('en-IN')}</p>
                        <span className="text-[10px] text-emerald-700 font-semibold">{product.discount}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-100 p-2 text-center bg-slate-50">
                  <Link
                    href={`/products?q=${encodeURIComponent(searchQuery)}`}
                    className="text-xs font-bold text-[#0f766e] hover:underline"
                    onClick={() => setSearchFocused(false)}
                  >
                    View all catalog results →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-3 ml-auto md:ml-0">
            {/* Delivery Pincode Selector */}
            <button
              type="button"
              onClick={onOpenLocationModal}
              aria-label={`Delivery location: ${deliveryLocation.city} ${deliveryLocation.pincode}`}
              className="hidden xl:flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-left text-xs text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <MapPin size={16} className="text-[#d94815] shrink-0" aria-hidden="true" />
              <span className="leading-tight">
                <span className="text-[10px] text-slate-400 block uppercase font-semibold">Deliver to</span>
                <strong className="text-slate-900 text-xs font-bold">{deliveryLocation.city} {deliveryLocation.pincode}</strong>
              </span>
            </button>

            {/* Account Trigger */}
            <button
              type="button"
              aria-label={authUser ? `Account: ${authUser.name}` : 'Sign in to account'}
              onClick={() => setAuthModalOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-transparent p-1.5 sm:p-2 text-slate-700 hover:border-slate-200 hover:bg-slate-50"
            >
              <UserRound size={19} className={authUser ? 'text-[#d94815]' : 'text-slate-600'} aria-hidden="true" />
              <span className="hidden xl:inline text-xs font-semibold text-slate-700">
                {authUser ? authUser.name.split(' ')[0] : 'Sign In'}
              </span>
            </button>

            {/* Wishlist Link */}
            <Link
              href="/products?filter=wishlist"
              aria-label={`Wishlist, ${wishlist.length} saved items`}
              className="relative rounded-lg border border-transparent p-1.5 sm:p-2 text-slate-700 hover:border-slate-200 hover:bg-slate-50"
            >
              <Heart size={19} className={wishlist.length > 0 ? 'text-[#d94815] fill-current' : 'text-slate-600'} aria-hidden="true" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 grid size-4 place-items-center rounded-full bg-[#0f766e] text-[9px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Cart Drawer Trigger */}
            <button
              type="button"
              aria-label={`Shopping Cart, ${cartCount} items`}
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-1.5 sm:gap-2 rounded-lg bg-[#d94815] px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-bold text-white shadow-xs transition hover:bg-[#c2410c] active:scale-98"
            >
              <ShoppingBag size={16} className="sm:size-4.25" aria-hidden="true" />
              <span className="hidden sm:inline">Cart</span>
              <span className="grid size-4 place-items-center rounded-full bg-white text-[10px] font-black text-[#d94815]">
                {cartCount}
              </span>
            </button>

            {/* Mobile hamburger button positioned on the right */}
            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenu}
              aria-controls="mobile-navigation-drawer"
              onClick={() => setMobileMenu(true)}
              className="rounded-lg p-1.5 sm:p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="relative border-t border-slate-100 px-3 py-2 md:hidden bg-slate-50">
          <label htmlFor="mobile-site-search" className="sr-only">
            Search electronics catalog
          </label>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              size={15}
              aria-hidden="true"
            />
            <input
              id="mobile-site-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              placeholder="Search catalog..."
              className="h-9 w-full rounded-md border border-slate-200 bg-white pl-9 pr-8 text-xs text-slate-900 outline-none focus:border-[#d94815]"
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="Clear search input"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Mobile Search Results */}
          {searchFocused && searchResults.length > 0 && (
            <div
              role="listbox"
              className="absolute left-4 right-4 top-12 z-50 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl"
            >
              <div className="max-h-60 divide-y divide-slate-100 overflow-y-auto">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    role="option"
                    aria-selected="false"
                    onClick={() => {
                      setQuickViewProduct(product)
                      setSearchFocused(false)
                    }}
                    className="flex cursor-pointer items-center gap-2.5 p-2.5 transition active:bg-slate-100"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="size-9 rounded-md object-contain bg-slate-50 p-1 shrink-0 border border-slate-100"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold text-slate-900">{product.name}</p>
                      <p className="text-[10px] text-slate-500">{product.brand}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-bold text-[#d94815]">₹{product.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Categories Strip */}
        <div className="hidden md:block border-t border-slate-100 bg-[#f8fafc]">
          <div className="mx-auto flex max-w-[1280px] items-center gap-6 overflow-x-auto px-4 sm:px-6 lg:px-8 py-2 text-xs font-semibold text-slate-600">
            <Link
              href="/products"
              className="flex shrink-0 items-center gap-1.5 font-bold text-[#0f766e] hover:text-[#d94815]"
            >
              <SlidersHorizontal size={13} aria-hidden="true" />
              <span>All Categories</span>
            </Link>
            {['Smartphones', 'Laptops', 'Televisions', 'Audio', 'Cameras', 'Appliances', 'Gaming', 'Smart Home'].map((cat) => (
              <Link
                key={cat}
                href={`/products?category=${encodeURIComponent(cat)}`}
                className="shrink-0 transition hover:text-[#d94815]"
              >
                {cat}
              </Link>
            ))}
            <span className="ml-auto hidden xl:flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <ShieldCheck size={13} className="text-[#0f766e]" aria-hidden="true" />
              <span>Official Indian Brand Service Network</span>
            </span>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenu && (
        <div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Drawer"
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileMenu(false)}
        >
          <aside
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-[85%] max-w-sm flex-col bg-white p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <Logo height={40} />
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setMobileMenu(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-5 flex flex-col gap-1.5">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Navigation</p>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenu(false)}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    pathname === link.href
                      ? 'bg-orange-50 text-[#d94815] font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/admin"
                onClick={() => setMobileMenu(false)}
                className="flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-bold text-white mt-2"
              >
                <LayoutDashboard size={15} />
                <span>Admin Workspace</span>
              </Link>
            </div>

            <div className="mt-6 flex flex-col gap-2 border-t border-slate-100 pt-4">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Shop by Category</p>
              <div className="grid grid-cols-2 gap-1.5 text-xs font-medium text-slate-700">
                {['Smartphones', 'Laptops', 'Televisions', 'Audio', 'Cameras', 'Smart Home'].map((cat) => (
                  <Link
                    key={cat}
                    href={`/products?category=${encodeURIComponent(cat)}`}
                    onClick={() => setMobileMenu(false)}
                    className="rounded-md bg-slate-50 p-2 hover:bg-orange-50 hover:text-[#d94815]"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-auto border-t border-slate-100 pt-4 text-xs text-slate-600">
              <p className="font-bold text-slate-900">Bangalore Customer Care</p>
              <p className="text-[11px] text-slate-500 mt-0.5">+91 8150077222 · Mon-Sun 8 AM - 10 PM IST</p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenu(false)
                    if (onOpenLocationModal) onOpenLocationModal()
                  }}
                  className="flex-1 rounded-lg border border-slate-200 bg-white p-2 font-bold text-slate-700 hover:bg-slate-50 text-center"
                >
                  Location: {deliveryLocation.city}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenu(false)
                    setAuthModalOpen(true)
                  }}
                  className="flex-1 rounded-lg bg-[#d94815] p-2 font-bold text-white hover:bg-[#c2410c] text-center"
                >
                  {authUser ? 'My Account' : 'Sign In'}
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}
