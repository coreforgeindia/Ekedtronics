'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  BarChart3,
  Bell,
  Box,
  ChevronDown,
  CircleDollarSign,
  ClipboardList,
  LayoutDashboard,
  Menu,
  Package,
  PanelLeftClose,
  Search,
  Settings,
  ShoppingCart,
  TrendingUp,
  Users,
  X,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Printer,
  FileText,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  CreditCard,
  ExternalLink,
  Filter,
  Lock,
  LogOut
} from 'lucide-react'
import { Logo } from '@/components/Logo'
import { useStore } from '@/lib/store'
import { Order, Product } from '@/lib/types'

export default function AdminPage() {
  const {
    products,
    orders,
    updateOrderStatus,
    addProduct,
    updateProduct,
    deleteProduct
  } = useStore()

  // Admin Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [adminEmailInput, setAdminEmailInput] = useState('')
  const [adminPasswordInput, setAdminPasswordInput] = useState('')
  const [adminError, setAdminError] = useState('')

  // Check existing session
  React.useEffect(() => {
    try {
      const isAuth = sessionStorage.getItem('ek_admin_auth')
      if (isAuth === 'true') {
        setIsAdminLoggedIn(true)
      }
    } catch (e) {}
  }, [])

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!adminEmailInput.trim()) {
      setAdminError('Please enter admin email or username')
      return
    }
    // Simple authentication logic for demo
    sessionStorage.setItem('ek_admin_auth', 'true')
    setIsAdminLoggedIn(true)
    setAdminError('')
  }

  const handleAdminLogout = () => {
    sessionStorage.removeItem('ek_admin_auth')
    setIsAdminLoggedIn(false)
  }

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'Overview' | 'Orders' | 'Products' | 'Customers' | 'Invoices' | 'Analytics' | 'Settings'>('Overview')

  // Search in Admin
  const [adminSearch, setAdminSearch] = useState('')

  // Orders Tab Filter
  const [orderFilter, setOrderFilter] = useState<'All' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'>('All')
  const [selectedOrderForModal, setSelectedOrderForModal] = useState<Order | null>(null)

  // Products Tab Filter & Add Product Modal
  const [productCatFilter, setProductCatFilter] = useState('All')
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [newProd, setNewProd] = useState({
    name: '',
    brand: '',
    category: 'Smartphones' as Product['category'],
    price: 49999,
    originalPrice: 59999,
    discount: '17% OFF',
    rating: 4.8,
    reviewsCount: 120,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=700&q=85',
    tag: 'New' as Product['tag'],
    description: 'High-performance celebration electronics with official manufacturer warranty.',
    features: ['Ultra-fast processor', 'Long-lasting battery life', 'Direct brand warranty'],
    inStock: true,
    stockCount: 15,
    sku: 'EK-PROD-NEW'
  })

  // Settings State
  const [storeName, setStoreName] = useState('Ekedtronics Retail Store')
  const [gstNumber, setGstNumber] = useState('29AABCE1234F1Z8')
  const [supportPhone, setSupportPhone] = useState('+91 8150077222')
  const [supportEmail, setSupportEmail] = useState('ekedtronics.sales@gmail.com')
  const [settingsSaved, setSettingsSaved] = useState(false)

  // Navigation Items
  const navItems = [
    { label: 'Overview', icon: LayoutDashboard },
    { label: 'Orders', icon: ClipboardList, count: orders.length.toString() },
    { label: 'Products', icon: Package, count: products.length.toString() },
    { label: 'Customers', icon: Users },
    { label: 'Invoices', icon: FileText, count: orders.length.toString() },
    { label: 'Analytics', icon: BarChart3 },
    { label: 'Settings', icon: Settings },
  ]

  // KPI Calculations
  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0)
  const uniqueCustomers = Array.from(new Set(orders.map((o) => o.customer.email))).length

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    if (orderFilter !== 'All' && o.orderStatus !== orderFilter) return false
    if (adminSearch.trim()) {
      const q = adminSearch.toLowerCase()
      const match =
        o.id.toLowerCase().includes(q) ||
        o.customer.fullName.toLowerCase().includes(q) ||
        o.customer.city.toLowerCase().includes(q) ||
        o.customer.phone.toLowerCase().includes(q) ||
        o.invoiceNumber.toLowerCase().includes(q)
      if (!match) return false
    }
    return true
  })

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    if (productCatFilter !== 'All' && p.category !== productCatFilter) return false
    if (adminSearch.trim()) {
      const q = adminSearch.toLowerCase()
      const match =
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
      if (!match) return false
    }
    return true
  })

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newProd.name || !newProd.brand) return
    addProduct(newProd)
    setIsAddProductOpen(false)
    setNewProd({
      name: '',
      brand: '',
      category: 'Smartphones',
      price: 49999,
      originalPrice: 59999,
      discount: '17% OFF',
      rating: 4.8,
      reviewsCount: 120,
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=700&q=85',
      tag: 'New',
      description: 'High-performance celebration electronics with official manufacturer warranty.',
      features: ['Ultra-fast processor', 'Long-lasting battery life', 'Direct brand warranty'],
      inStock: true,
      stockCount: 15,
      sku: 'EK-PROD-NEW'
    })
  }

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault()
    setSettingsSaved(true)
    setTimeout(() => setSettingsSaved(false), 3000)
  }

  // Admin Login Screen if not authenticated
  if (!isAdminLoggedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4">
        <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl border border-slate-200">
          <div className="h-1.5 w-full bg-[#d94815]" />
          <div className="p-8">
            <div className="text-center">
              <div className="inline-block p-2 bg-white rounded-lg">
                <Logo height={48} />
              </div>
              <h1 className="mt-3 text-lg font-bold text-slate-900 tracking-tight">Admin Workspace Login</h1>
              <p className="mt-1 text-xs text-slate-500">
                Please enter your administrative credentials to manage store orders, catalog, and invoices.
              </p>
            </div>

            {adminError && (
              <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-3 text-xs font-bold text-red-600">
                {adminError}
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="mt-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700">Admin Email / Username</label>
                <div className="relative mt-1">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={adminEmailInput}
                    onChange={(e) => setAdminEmailInput(e.target.value)}
                    placeholder="admin@ekedtronics.com"
                    className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-xs outline-none focus:border-[#f15a24] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700">Password</label>
                <div className="relative mt-1">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={adminPasswordInput}
                    onChange={(e) => setAdminPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-xs outline-none focus:border-[#f15a24] focus:bg-white"
                  />
                </div>
              </div>

              {/* Demo Credentials Helper */}
              <div className="rounded-2xl bg-orange-50 border border-orange-100 p-3 flex items-center justify-between text-[11px]">
                <div>
                  <p className="font-bold text-orange-950">Demo Credentials:</p>
                  <p className="text-orange-700 font-mono">admin@ekedtronics.com / admin123</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setAdminEmailInput('admin@ekedtronics.com')
                    setAdminPasswordInput('admin123')
                  }}
                  className="rounded-lg bg-orange-200/80 px-2.5 py-1 font-bold text-orange-950 hover:bg-orange-300"
                >
                  Auto-Fill
                </button>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#f15a24] py-3 text-xs font-bold text-white shadow-md shadow-orange-200 transition hover:bg-[#d94815] active:scale-98"
              >
                Sign In to Admin Dashboard →
              </button>
            </form>

            <div className="mt-6 border-t border-slate-100 pt-4 text-center">
              <Link href="/" className="text-xs font-bold text-slate-500 hover:text-slate-900">
                ← Return to Customer Storefront
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="h-screen w-full overflow-hidden bg-[#f8fafc] text-[#0f172a]">
      <div className="flex h-screen w-full overflow-hidden">
        {/* Mobile Backdrop */}
        {sidebarOpen && (
          <button
            aria-label="Close navigation"
            className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Fixed Stationary Left Sidebar - DOES NOT SCROLL (Matches Image 1) */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed inset-y-0 left-0 z-40 flex w-[270px] shrink-0 flex-col border-r border-slate-100 bg-white transition-transform lg:static lg:translate-x-0 h-screen select-none`}
        >
          {/* Logo Header */}
          <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6 shrink-0">
            <Logo height={44} />
            <button
              aria-label="Close navigation"
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Tabs - Exactly matching Image 1 */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <p className="px-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#94a3b8]">
              ADMIN WORKSPACE
            </p>
            <nav className="mt-3 flex flex-col gap-1.5">
              {navItems.map(({ label, icon: Icon, count }) => {
                const isActive = activeTab === label
                return (
                  <button
                    key={label}
                    onClick={() => {
                      setActiveTab(label as any)
                      setSidebarOpen(false)
                    }}
                    className={`flex items-center gap-3.5 rounded-2xl px-4 py-3 text-xs font-bold transition ${
                      isActive
                        ? 'bg-[#fff3ee] text-[#f15a24]'
                        : 'text-[#475569] hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon size={19} className={isActive ? 'text-[#f15a24]' : 'text-slate-400'} />
                    <span className="flex-1 text-left">{label}</span>
                    {count && (
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-black ${
                          isActive
                            ? 'bg-[#f15a24] text-white'
                            : 'bg-[#f1f5f9] text-[#64748b]'
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                )
              })}
            </nav>

            <p className="mt-8 px-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#94a3b8]">
              STOREFRONT
            </p>
            <nav className="mt-3 flex flex-col gap-1.5">
              <Link
                href="/"
                className="flex items-center gap-3.5 rounded-2xl px-4 py-3 text-xs font-bold text-[#475569] hover:bg-slate-50 hover:text-slate-900"
              >
                <PanelLeftClose size={19} className="text-slate-400" />
                <span>View Storefront</span>
              </Link>
            </nav>
          </div>

          {/* Admin User Profile & Sign Out */}
          <div className="border-t border-slate-100 p-4 shrink-0">
            <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#d94815] text-xs font-bold text-white shadow-xs">
                  ED
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-slate-900">Operations Desk</p>
                  <p className="text-[10px] text-slate-500">Store Administrator</p>
                </div>
              </div>
              <button
                onClick={handleAdminLogout}
                title="Sign Out of Admin"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </aside>

        {/* Right Content Section - Only this section scrolls! */}
        <section className="min-w-0 flex-1 h-screen overflow-y-auto flex flex-col">
          {/* Top Bar */}
          <header className="sticky top-0 z-20 flex h-16 sm:h-20 items-center gap-3 sm:gap-4 border-b border-slate-200 bg-white/95 px-3 sm:px-8 backdrop-blur">
            <button
              aria-label="Open navigation"
              className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>

            {/* Global Admin Search */}
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
              <input
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                placeholder="Search orders, customers, products..."
                className="h-9 sm:h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 sm:pl-10 pr-3 sm:pr-4 text-xs outline-none focus:border-[#d94815] focus:bg-white"
              />
              {adminSearch && (
                <button
                  onClick={() => setAdminSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              <button
                aria-label="Notifications"
                className="relative rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
              >
                <Bell size={17} />
                <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-[#d94815]" />
              </button>

              <div className="hidden h-6 w-px bg-slate-200 sm:block" />

              <button
                onClick={() => setIsAddProductOpen(true)}
                className="hidden sm:flex items-center gap-1.5 rounded-xl bg-[#d94815] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#c2410c]"
              >
                <Plus size={15} />
                <span>Add Product</span>
              </button>
            </div>
          </header>

          {/* Tab Content Wrapper */}
          <div className="flex-1 p-3 sm:p-8">
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'Overview' && (
              <div className="space-y-5 sm:space-y-6">
                <div className="flex flex-wrap items-end justify-between gap-3 sm:gap-4">
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#0f766e]">
                      Store Dashboard
                    </span>
                    <h1 className="mt-0.5 text-xl font-black text-slate-900 sm:text-3xl">
                      Store Performance Overview
                    </h1>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Real-time analytics for online celebration electronics orders.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded-xl border border-emerald-200 bg-emerald-50 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                      Online Gateway Live (No COD)
                    </span>
                  </div>
                </div>

                {/* KPI Cards */}
                <div className="grid gap-3 sm:gap-4 grid-cols-2 xl:grid-cols-4">
                  {[
                    {
                      label: 'Total Revenue',
                      value: `₹${totalRevenue.toLocaleString('en-IN')}`,
                      change: '+22.4%',
                      icon: CircleDollarSign,
                      color: 'text-emerald-700 bg-emerald-50'
                    },
                    {
                      label: 'Total Orders',
                      value: orders.length.toString(),
                      change: `+${orders.length} orders logged`,
                      icon: ShoppingCart,
                      color: 'text-[#d94815] bg-orange-50'
                    },
                    {
                      label: 'Verified Customers',
                      value: uniqueCustomers.toString(),
                      change: 'Verified client accounts',
                      icon: Users,
                      color: 'text-[#0f766e] bg-teal-50'
                    },
                    {
                      label: 'Catalog Products',
                      value: products.length.toString(),
                      change: 'Active in stock',
                      icon: Package,
                      color: 'text-violet-600 bg-violet-50'
                    }
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-5 shadow-xs">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-500">{stat.label}</p>
                          <p className="mt-2 text-2xl font-black text-slate-900">{stat.value}</p>
                        </div>
                        <span className={`grid size-11 place-items-center rounded-xl ${stat.color}`}>
                          <stat.icon size={22} />
                        </span>
                      </div>
                      <p className="mt-3 text-[11px] font-bold text-emerald-600">{stat.change}</p>
                    </div>
                  ))}
                </div>

                {/* Revenue Graph & Category Chart */}
                <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
                  {/* Revenue Curve */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-sm font-extrabold text-slate-900">Revenue Growth Trend</h2>
                        <p className="text-xs text-slate-500">Online payments authenticated</p>
                      </div>
                      <span className="rounded-lg bg-[#fff2ec] px-2.5 py-1 text-xs font-bold text-[#f15a24]">
                        ₹{totalRevenue.toLocaleString('en-IN')} Total
                      </span>
                    </div>

                    <div className="mt-6 h-48 w-full">
                      <svg viewBox="0 0 720 180" className="h-full w-full" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="adminGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#f15a24" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#f15a24" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0 140 C50 130 90 140 140 110 S220 120 280 85 S380 95 440 60 S540 70 600 35 S670 45 720 20 L720 180 L0 180 Z"
                          fill="url(#adminGrad)"
                        />
                        <path
                          d="M0 140 C50 130 90 140 140 110 S220 120 280 85 S380 95 440 60 S540 70 600 35 S670 45 720 20"
                          fill="none"
                          stroke="#f15a24"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="mt-2 flex justify-between text-[10px] font-bold text-slate-400">
                        <span>Day 1</span>
                        <span>Day 5</span>
                        <span>Day 10</span>
                        <span>Day 15</span>
                        <span>Today</span>
                      </div>
                    </div>
                  </div>

                  {/* Category Breakdown */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                    <h2 className="text-sm font-extrabold text-slate-900">Sales by Category</h2>
                    <p className="text-xs text-slate-500">Celebration & lifestyle mix</p>

                    <div className="mt-6 flex items-center gap-6">
                      <div
                        className="relative grid size-32 shrink-0 place-items-center rounded-full"
                        style={{
                          background: 'conic-gradient(#f15a24 0 40%, #167d6f 40% 65%, #f59e0b 65% 85%, #6366f1 85% 100%)'
                        }}
                      >
                        <div className="grid size-22 place-items-center rounded-full bg-white text-center">
                          <span className="text-[10px] font-bold text-slate-500">Online<br /><b className="text-sm font-black text-slate-900">100%</b></span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 text-xs font-semibold text-slate-600">
                        <span><i className="mr-2 inline-block size-2 rounded-full bg-[#f15a24]" />Smartphones & Laptops (40%)</span>
                        <span><i className="mr-2 inline-block size-2 rounded-full bg-[#167d6f]" />Party Audio & Vision (25%)</span>
                        <span><i className="mr-2 inline-block size-2 rounded-full bg-amber-500" />Smart Home (20%)</span>
                        <span><i className="mr-2 inline-block size-2 rounded-full bg-indigo-500" />Gaming & Cameras (15%)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Orders Table Preview */}
                <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                  <div className="flex items-center justify-between p-5 border-b border-slate-100">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm">Recent Orders (Real Client Records)</h3>
                      <p className="text-xs text-slate-500">Orders placed with verified client addresses and contacts</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('Orders')}
                      className="text-xs font-bold text-[#f15a24] hover:underline"
                    >
                      View All Orders ({orders.length}) →
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                        <tr>
                          <th className="py-3 px-4">Order ID</th>
                          <th className="py-3 px-4">Customer Name</th>
                          <th className="py-3 px-4">City / PIN</th>
                          <th className="py-3 px-4">Amount</th>
                          <th className="py-3 px-4">Payment</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {orders.slice(0, 5).map((order) => (
                          <tr key={order.id} className="hover:bg-slate-50/80">
                            <td className="py-3.5 px-4 font-mono font-bold text-[#f15a24]">{order.id}</td>
                            <td className="py-3.5 px-4 font-bold text-slate-900">{order.customer.fullName}</td>
                            <td className="py-3.5 px-4 text-slate-600">{order.customer.city} ({order.customer.pincode})</td>
                            <td className="py-3.5 px-4 font-black text-slate-900">₹{order.totalAmount.toLocaleString('en-IN')}</td>
                            <td className="py-3.5 px-4">
                              <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                                {order.paymentMethod}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                                  order.orderStatus === 'Delivered'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : order.orderStatus === 'Shipped'
                                    ? 'bg-violet-100 text-violet-800'
                                    : order.orderStatus === 'Processing'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {order.orderStatus}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => setSelectedOrderForModal(order)}
                                className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-[#fff2ec] hover:text-[#f15a24]"
                              >
                                View Invoice
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 2. ORDERS TAB */}
            {activeTab === 'Orders' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900">Customer Orders & Deliveries</h1>
                    <p className="text-xs text-slate-500">
                      Manage order fulfillment, verify client shipping addresses, and send invoices.
                    </p>
                  </div>

                  {/* Order Status Filters */}
                  <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                    {['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setOrderFilter(st as any)}
                        className={`rounded-lg px-3 py-1.5 transition ${
                          orderFilter === st
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                  {filteredOrders.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center text-xs text-slate-500">
                      No orders found matching the filter.
                    </div>
                  ) : (
                    filteredOrders.map((order) => (
                      <div
                        key={order.id}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-slate-300"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-sm text-[#f15a24]">{order.id}</span>
                              <span className="text-slate-300">·</span>
                              <span className="font-mono text-xs text-slate-500">{order.invoiceNumber}</span>
                              <span className="text-slate-300">·</span>
                              <span className="text-xs text-slate-500">{order.date}</span>
                            </div>
                            <h3 className="mt-1 text-sm font-extrabold text-slate-900">{order.customer.fullName}</h3>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-base font-black text-slate-900">
                              ₹{order.totalAmount.toLocaleString('en-IN')}
                            </span>
                            {/* Status Change Dropdown */}
                            <select
                              value={order.orderStatus}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-800 outline-none focus:border-[#f15a24]"
                            >
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </div>
                        </div>

                        {/* Customer Address Details Row */}
                        <div className="mt-4 grid gap-4 sm:grid-cols-3 text-xs">
                          {/* Shipping Address */}
                          <div className="rounded-xl bg-slate-50 p-3">
                            <p className="font-bold text-slate-500 text-[10px] uppercase flex items-center gap-1">
                              <MapPin size={12} className="text-[#f15a24]" /> Client Shipping Address
                            </p>
                            <p className="mt-1 font-semibold text-slate-800">{order.customer.street}</p>
                            {order.customer.landmark && <p className="text-slate-500">Landmark: {order.customer.landmark}</p>}
                            <p className="text-slate-700 font-bold">
                              {order.customer.city}, {order.customer.state} - {order.customer.pincode}
                            </p>
                          </div>

                          {/* Contact Info */}
                          <div className="rounded-xl bg-slate-50 p-3">
                            <p className="font-bold text-slate-500 text-[10px] uppercase flex items-center gap-1">
                              <Phone size={12} className="text-[#167d6f]" /> WhatsApp & Email Contact
                            </p>
                            <p className="mt-1 font-semibold text-slate-800">
                              WhatsApp: <a href={`https://wa.me/${order.customer.whatsapp.replace(/[^\d]/g, '')}`} target="_blank" rel="noreferrer" className="text-emerald-700 font-bold hover:underline">{order.customer.whatsapp}</a>
                            </p>
                            <p className="text-slate-600">Email: {order.customer.email}</p>
                            <p className="text-slate-500 text-[11px]">Phone: {order.customer.phone}</p>
                          </div>

                          {/* Payment & Items */}
                          <div className="rounded-xl bg-slate-50 p-3">
                            <p className="font-bold text-slate-500 text-[10px] uppercase flex items-center gap-1">
                              <CreditCard size={12} className="text-amber-600" /> Online Transaction
                            </p>
                            <p className="mt-1 font-mono text-[11px] text-slate-700 font-bold truncate">
                              Ref: {order.transactionId}
                            </p>
                            <p className="text-slate-600">Method: {order.paymentMethod} (PAID)</p>
                            <p className="text-slate-500 text-[11px]">{order.items.length} items ordered</p>
                          </div>
                        </div>

                        {/* Order Actions */}
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
                          <div className="text-[11px] text-slate-500 font-medium">
                            Items: {order.items.map((i) => `${i.product.name} (x${i.quantity})`).join(', ')}
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => setSelectedOrderForModal(order)}
                              className="flex items-center gap-1 rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-800"
                            >
                              <FileText size={13} />
                              <span>View & Print Tax Invoice</span>
                            </button>
                            <a
                              href={`https://wa.me/${order.customer.whatsapp.replace(/[^\d]/g, '')}?text=Hello%20${encodeURIComponent(order.customer.fullName)}%2C%20your%20Ekedtronics%20order%20${order.id}%20is%20${order.orderStatus}!`}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-1 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700"
                            >
                              <span>WhatsApp Client</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* 3. PRODUCTS TAB */}
            {activeTab === 'Products' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900">Products Catalog Management</h1>
                    <p className="text-xs text-slate-500">
                      Manage product catalog ({products.length} active celebration models), pricing, and stock.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsAddProductOpen(true)}
                    className="flex items-center gap-1.5 rounded-xl bg-[#f15a24] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#d94815]"
                  >
                    <Plus size={16} />
                    <span>Add New Product</span>
                  </button>
                </div>

                {/* Filter Strip */}
                <div className="flex gap-2 overflow-x-auto pb-2 text-xs">
                  {['All', 'Smartphones', 'Laptops', 'Televisions', 'Audio', 'Cameras', 'Appliances', 'Gaming', 'Smart Home'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setProductCatFilter(cat)}
                      className={`rounded-xl px-3.5 py-1.5 font-bold transition ${
                        productCatFilter === cat
                          ? 'bg-[#167d6f] text-white'
                          : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Products Table */}
                <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                        <tr>
                          <th className="py-3 px-4">Item</th>
                          <th className="py-3 px-4">Category</th>
                          <th className="py-3 px-4">SKU</th>
                          <th className="py-3 px-4">Price (INR)</th>
                          <th className="py-3 px-4">Stock</th>
                          <th className="py-3 px-4">Tag</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredProducts.map((p) => (
                          <tr key={p.id} className="hover:bg-slate-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="size-11 rounded-lg bg-slate-100 object-contain p-1 border border-slate-100"
                                />
                                <div className="min-w-0 max-w-xs">
                                  <p className="truncate font-bold text-slate-900">{p.name}</p>
                                  <p className="text-[10px] text-slate-400">{p.brand}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 font-semibold text-slate-600">{p.category}</td>
                            <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{p.sku}</td>
                            <td className="py-3 px-4 font-extrabold text-slate-900">
                              ₹{p.price.toLocaleString('en-IN')}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                                  p.stockCount <= 5
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {p.stockCount} left
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              {p.tag && (
                                <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                                  {p.tag}
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => updateProduct({ ...p, stockCount: p.stockCount + 10 })}
                                  className="rounded-lg border border-slate-200 px-2 py-1 text-[10px] font-bold text-slate-600 hover:border-[#167d6f] hover:text-[#167d6f]"
                                >
                                  +10 Restock
                                </button>
                                <button
                                  onClick={() => deleteProduct(p.id)}
                                  className="rounded-lg p-1 text-slate-400 hover:text-red-500"
                                  title="Delete product"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 4. CUSTOMERS TAB */}
            {activeTab === 'Customers' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-black text-slate-900">Customer Directory</h1>
                  <p className="text-xs text-slate-500">
                    Registered buyers with verified shipping addresses and phone contacts.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                        <tr>
                          <th className="py-3 px-4">Customer Name</th>
                          <th className="py-3 px-4">WhatsApp / Phone</th>
                          <th className="py-3 px-4">Email</th>
                          <th className="py-3 px-4">Delivery City & State</th>
                          <th className="py-3 px-4">Total Spent</th>
                          <th className="py-3 px-4 text-right">Direct Contact</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {orders.map((o) => (
                          <tr key={o.id} className="hover:bg-slate-50">
                            <td className="py-3.5 px-4 font-bold text-slate-900">{o.customer.fullName}</td>
                            <td className="py-3.5 px-4 font-mono font-semibold text-slate-700">{o.customer.whatsapp}</td>
                            <td className="py-3.5 px-4 text-slate-500">{o.customer.email}</td>
                            <td className="py-3.5 px-4 text-slate-600">
                              {o.customer.city}, {o.customer.state} ({o.customer.pincode})
                            </td>
                            <td className="py-3.5 px-4 font-black text-slate-900">
                              ₹{o.totalAmount.toLocaleString('en-IN')}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <a
                                href={`https://wa.me/${o.customer.whatsapp.replace(/[^\d]/g, '')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-800 hover:bg-emerald-100"
                              >
                                💬 WhatsApp
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 5. INVOICES TAB */}
            {activeTab === 'Invoices' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-black text-slate-900">Tax Invoices & Online Receipts</h1>
                  <p className="text-xs text-slate-500">
                    Official GST invoices generated upon online checkout.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                        <tr>
                          <th className="py-3 px-4">Invoice #</th>
                          <th className="py-3 px-4">Date</th>
                          <th className="py-3 px-4">Customer</th>
                          <th className="py-3 px-4">Payment Method</th>
                          <th className="py-3 px-4">Transaction Ref</th>
                          <th className="py-3 px-4">Amount</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {orders.map((o) => (
                          <tr key={o.id} className="hover:bg-slate-50">
                            <td className="py-3.5 px-4 font-mono font-bold text-[#f15a24]">{o.invoiceNumber}</td>
                            <td className="py-3.5 px-4 text-slate-500">{o.date}</td>
                            <td className="py-3.5 px-4 font-bold text-slate-900">{o.customer.fullName}</td>
                            <td className="py-3.5 px-4">
                              <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-800">
                                {o.paymentMethod}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600 truncate max-w-[140px]">
                              {o.transactionId}
                            </td>
                            <td className="py-3.5 px-4 font-black text-slate-900">
                              ₹{o.totalAmount.toLocaleString('en-IN')}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => setSelectedOrderForModal(o)}
                                className="inline-flex items-center gap-1 rounded-lg bg-[#167d6f] px-2.5 py-1 text-[11px] font-bold text-white hover:bg-[#116257]"
                              >
                                <Printer size={13} /> View Invoice
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 6. ANALYTICS TAB */}
            {activeTab === 'Analytics' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-black text-slate-900">Sales & Operations Analytics</h1>
                  <p className="text-xs text-slate-500">Insights into online conversion and delivery performance.</p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                    <p className="text-xs font-bold text-slate-500 uppercase">Payment Modes</p>
                    <p className="mt-2 text-2xl font-black text-slate-900">100% Online</p>
                    <div className="mt-4 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>UPI / QR Code</span>
                        <span className="font-bold text-[#f15a24]">58%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cards (Visa/Master/RuPay)</span>
                        <span className="font-bold text-[#167d6f]">28%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Net Banking</span>
                        <span className="font-bold text-amber-600">14%</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Cash on Delivery (COD)</span>
                        <span className="font-bold text-red-500">0% (Disabled)</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                    <p className="text-xs font-bold text-slate-500 uppercase">Fulfillment SLA</p>
                    <p className="mt-2 text-2xl font-black text-emerald-600">99.2%</p>
                    <p className="mt-1 text-xs text-slate-500">On-time door delivery within 48 hours</p>
                    <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-600 space-y-1">
                      <p>• Metro Dispatch: 24 Hours</p>
                      <p>• Insured Courier Transit: Active</p>
                      <p>• RTO Rate: 0.1% (Zero COD loss)</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                    <p className="text-xs font-bold text-slate-500 uppercase">Average Order Value</p>
                    <p className="mt-2 text-2xl font-black text-slate-900">
                      ₹{orders.length ? Math.round(totalRevenue / orders.length).toLocaleString('en-IN') : '0'}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">Driven by celebration audio and 4K TV bundles</p>
                  </div>
                </div>
              </div>
            )}

            {/* 7. SETTINGS TAB */}
            {activeTab === 'Settings' && (
              <div className="max-w-2xl space-y-6">
                <div>
                  <h1 className="text-2xl font-black text-slate-900">Store Settings & Configuration</h1>
                  <p className="text-xs text-slate-500">Manage tax, invoicing details, and gateway preferences.</p>
                </div>

                <form onSubmit={handleSaveSettings} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700">Store Brand Name</label>
                    <input
                      type="text"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs outline-none focus:border-[#f15a24]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700">Official GSTIN Number</label>
                    <input
                      type="text"
                      value={gstNumber}
                      onChange={(e) => setGstNumber(e.target.value)}
                      className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs outline-none focus:border-[#f15a24]"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700">Support Helpline</label>
                      <input
                        type="text"
                        value={supportPhone}
                        onChange={(e) => setSupportPhone(e.target.value)}
                        className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs outline-none focus:border-[#f15a24]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700">Support Email</label>
                      <input
                        type="email"
                        value={supportEmail}
                        onChange={(e) => setSupportEmail(e.target.value)}
                        className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs outline-none focus:border-[#f15a24]"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 text-xs space-y-1">
                    <p className="font-bold text-amber-900">Payment Gateway Rules</p>
                    <p className="text-amber-800">
                      • Cash on Delivery (COD): <strong>PERMANENTLY DISABLED</strong>
                    </p>
                    <p className="text-amber-800">
                      • Online Modes (UPI, Cards, NetBanking): <strong>ACTIVE (Instant GST Invoice)</strong>
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="rounded-xl bg-[#f15a24] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#d94815]"
                  >
                    Save Store Settings
                  </button>

                  {settingsSaved && (
                    <p className="text-xs font-bold text-emerald-600">✓ Settings saved successfully!</p>
                  )}
                </form>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Add Product Modal */}
      {isAddProductOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-xs"
          onClick={() => setIsAddProductOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-extrabold text-slate-900 text-base">Add New Product to Catalog</h3>
              <button onClick={() => setIsAddProductOpen(false)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700">Product Name *</label>
                <input
                  type="text"
                  required
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  placeholder="e.g. Sony Bravia 75 Inch 4K Smart TV"
                  className="mt-1 h-9 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-[#f15a24]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700">Brand *</label>
                  <input
                    type="text"
                    required
                    value={newProd.brand}
                    onChange={(e) => setNewProd({ ...newProd, brand: e.target.value })}
                    placeholder="e.g. Sony"
                    className="mt-1 h-9 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-[#f15a24]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700">Category *</label>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value as any })}
                    className="mt-1 h-9 w-full rounded-xl border border-slate-200 bg-white px-2 outline-none focus:border-[#f15a24]"
                  >
                    {['Smartphones', 'Laptops', 'Televisions', 'Audio', 'Cameras', 'Appliances', 'Gaming', 'Smart Home'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700">Price (INR) *</label>
                  <input
                    type="number"
                    required
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                    className="mt-1 h-9 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-[#f15a24]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700">Original Price</label>
                  <input
                    type="number"
                    value={newProd.originalPrice}
                    onChange={(e) => setNewProd({ ...newProd, originalPrice: Number(e.target.value) })}
                    className="mt-1 h-9 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-[#f15a24]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700">Stock Count</label>
                  <input
                    type="number"
                    value={newProd.stockCount}
                    onChange={(e) => setNewProd({ ...newProd, stockCount: Number(e.target.value) })}
                    className="mt-1 h-9 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-[#f15a24]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700">Image URL</label>
                <input
                  type="url"
                  value={newProd.image}
                  onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                  className="mt-1 h-9 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-[#f15a24]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700">Description</label>
                <textarea
                  rows={2}
                  value={newProd.description}
                  onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-[#f15a24]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#f15a24] px-5 py-2 font-bold text-white hover:bg-[#d94815]"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Modal for Selected Order */}
      {selectedOrderForModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
          onClick={() => setSelectedOrderForModal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <FileText className="text-[#f15a24]" size={20} />
                <h3 className="font-extrabold text-slate-900">Tax Invoice: {selectedOrderForModal.invoiceNumber}</h3>
              </div>
              <button
                onClick={() => setSelectedOrderForModal(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div className="flex justify-between items-start rounded-2xl bg-slate-50 p-4">
                <div>
                  <p className="font-bold text-slate-900">{selectedOrderForModal.customer.fullName}</p>
                  <p className="text-slate-600">{selectedOrderForModal.customer.street}</p>
                  <p className="text-slate-600">
                    {selectedOrderForModal.customer.city}, {selectedOrderForModal.customer.state} - {selectedOrderForModal.customer.pincode}
                  </p>
                  <p className="mt-1 font-semibold text-emerald-700">WhatsApp: {selectedOrderForModal.customer.whatsapp}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-slate-800">{selectedOrderForModal.id}</p>
                  <p className="text-slate-500">{selectedOrderForModal.date}</p>
                  <span className="mt-1 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                    {selectedOrderForModal.paymentStatus} ({selectedOrderForModal.paymentMethod})
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="rounded-2xl border border-slate-100 p-4">
                <p className="font-bold text-slate-800 mb-2">Ordered Items:</p>
                {selectedOrderForModal.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between py-1.5 border-b border-slate-50 last:border-none">
                    <span>{item.product.name} (x{item.quantity})</span>
                    <span className="font-bold text-slate-900">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center text-sm font-black border-t border-slate-100 pt-3">
                <span>Grand Total Paid Online</span>
                <span className="text-[#f15a24]">₹{selectedOrderForModal.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                <Printer size={14} /> Print
              </button>
              <button
                onClick={() => setSelectedOrderForModal(null)}
                className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
