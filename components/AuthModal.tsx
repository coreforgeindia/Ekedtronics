'use client'

import React, { useState, useEffect } from 'react'
import { X, UserRound, Mail, Lock, Phone, ArrowRight, CheckCircle2, LogOut, ShieldCheck } from 'lucide-react'
import { Logo } from './Logo'
import { useStore } from '@/lib/store'

export function AuthModal() {
  const { authUser, authModalOpen, setAuthModalOpen, loginUser, logoutUser, dismissAuthPrompt } = useStore()
  const [tab, setTab] = useState<'login' | 'signup'>('login')

  // Form states
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPhone, setSignupPhone] = useState('')
  const [signupPassword, setSignupPassword] = useState('')

  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismissAuthPrompt()
    }
    if (authModalOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [authModalOpen, dismissAuthPrompt])

  if (!authModalOpen) return null

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!loginEmail.trim()) return
    const nameDerived = loginEmail.split('@')[0] || 'Customer'
    const formattedName = nameDerived.charAt(0).toUpperCase() + nameDerived.slice(1)
    loginUser({
      name: formattedName,
      email: loginEmail,
      phone: '+91 8150077222'
    })
    setSuccessMsg(`Session authenticated. Welcome, ${formattedName}!`)
    setTimeout(() => {
      setSuccessMsg('')
      setAuthModalOpen(false)
    }, 1000)
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (!signupName.trim() || !signupEmail.trim()) return
    loginUser({
      name: signupName.trim(),
      email: signupEmail.trim(),
      phone: signupPhone.trim() || '+91 8150077222'
    })
    setSuccessMsg(`Account registered. Welcome, ${signupName}!`)
    setTimeout(() => {
      setSuccessMsg('')
      setAuthModalOpen(false)
    }, 1000)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
      onClick={dismissAuthPrompt}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-2xl border border-slate-200"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={dismissAuthPrompt}
          aria-label="Close authentication dialog"
          className="absolute right-4 top-4 z-20 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        >
          <X size={18} />
        </button>

        <div className="p-6 sm:p-7">
          {/* Header */}
          <div className="text-center">
            <div className="inline-block">
              <Logo height={42} />
            </div>
            <h2 id="auth-modal-title" className="mt-3 text-lg font-bold text-slate-900">
              {authUser ? 'Customer Account' : 'Sign In to Ekedtronics'}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              {authUser
                ? 'Manage active orders, warranty invoices, and shipping addresses'
                : 'Access order tracking, instant GST invoices, and saved catalog preferences'}
            </p>
          </div>

          {/* Success Banner */}
          {successMsg && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs font-semibold text-emerald-800">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Logged in state */}
          {authUser ? (
            <div className="mt-5 space-y-3.5">
              <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-4 border border-slate-200">
                <div className="grid size-10 place-items-center rounded-lg bg-[#d94815] text-base font-bold text-white shrink-0">
                  {authUser.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-900 text-xs truncate">{authUser.name}</p>
                  <p className="text-xs text-slate-500 truncate">{authUser.email}</p>
                  {authUser.phone && <p className="text-[11px] text-slate-500 font-mono">{authUser.phone}</p>}
                </div>
              </div>

              <div className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-xs text-slate-600 space-y-1">
                <p className="font-bold text-slate-800 text-[11px]">Direct Retail Customer Profile</p>
                <p className="text-[11px] text-slate-500">
                  Official GST tax invoices are automatically transmitted to your registered WhatsApp and email.
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAuthModalOpen(false)}
                  className="flex-1 rounded-lg bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800"
                >
                  Continue Shopping
                </button>
                <button
                  type="button"
                  onClick={logoutUser}
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 hover:border-red-200"
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="mt-5 flex rounded-lg bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setTab('login')}
                  className={`flex-1 rounded-md py-1.5 text-xs font-bold transition ${
                    tab === 'login'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setTab('signup')}
                  className={`flex-1 rounded-md py-1.5 text-xs font-bold transition ${
                    tab === 'signup'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Login Form */}
              {tab === 'login' && (
                <form onSubmit={handleLogin} className="mt-4 space-y-3">
                  <div>
                    <label htmlFor="auth-login-email" className="block text-xs font-bold text-slate-700">
                      Email Address or Phone *
                    </label>
                    <div className="relative mt-1">
                      <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        id="auth-login-email"
                        type="text"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="e.g. name@example.com"
                        className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs outline-none focus:border-[#d94815] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center">
                      <label htmlFor="auth-login-pwd" className="block text-xs font-bold text-slate-700">
                        Password *
                      </label>
                      <button
                        type="button"
                        onClick={() => alert('Password reset verification dispatched to email/phone.')}
                        className="text-[11px] font-semibold text-[#d94815] hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative mt-1">
                      <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        id="auth-login-pwd"
                        type="password"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs outline-none focus:border-[#d94815] focus:bg-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#d94815] py-2.5 text-xs font-bold text-white transition hover:bg-[#c2410c] active:scale-98"
                  >
                    <span>Sign In</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}

              {/* Signup Form */}
              {tab === 'signup' && (
                <form onSubmit={handleSignup} className="mt-4 space-y-3">
                  <div>
                    <label htmlFor="auth-signup-name" className="block text-xs font-bold text-slate-700">
                      Full Legal Name *
                    </label>
                    <div className="relative mt-1">
                      <UserRound size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        id="auth-signup-name"
                        type="text"
                        required
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        placeholder="e.g. Vikram Sharma"
                        className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs outline-none focus:border-[#d94815] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="auth-signup-email" className="block text-xs font-bold text-slate-700">
                      Email Address *
                    </label>
                    <div className="relative mt-1">
                      <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        id="auth-signup-email"
                        type="email"
                        required
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        placeholder="e.g. vikram@example.com"
                        className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs outline-none focus:border-[#d94815] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="auth-signup-phone" className="block text-xs font-bold text-slate-700">
                      Mobile / WhatsApp Number
                    </label>
                    <div className="relative mt-1">
                      <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        id="auth-signup-phone"
                        type="tel"
                        value={signupPhone}
                        onChange={(e) => setSignupPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs outline-none focus:border-[#d94815] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="auth-signup-pwd" className="block text-xs font-bold text-slate-700">
                      Create Password *
                    </label>
                    <div className="relative mt-1">
                      <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        id="auth-signup-pwd"
                        type="password"
                        required
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        placeholder="Minimum 6 characters"
                        className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs outline-none focus:border-[#d94815] focus:bg-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0f766e] py-2.5 text-xs font-bold text-white transition hover:bg-[#115e59] active:scale-98"
                  >
                    <span>Create Account</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}

              {/* Guest dismissal option */}
              <div className="mt-5 border-t border-slate-100 pt-3 text-center">
                <button
                  type="button"
                  onClick={dismissAuthPrompt}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                >
                  Continue as Guest →
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
