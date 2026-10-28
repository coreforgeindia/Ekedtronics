'use client'

import React, { useState, useEffect } from 'react'
import { X, MapPin, Check } from 'lucide-react'
import { useStore } from '@/lib/store'

interface PincodeModalProps {
  isOpen: boolean
  onClose: () => void
}

const popularCities = [
  { city: 'Bengaluru', pincode: '560001' },
  { city: 'Mumbai', pincode: '400001' },
  { city: 'Delhi NCR', pincode: '110001' },
  { city: 'Hyderabad', pincode: '500001' },
  { city: 'Chennai', pincode: '600001' },
  { city: 'Pune', pincode: '411001' },
  { city: 'Kolkata', pincode: '700001' },
  { city: 'Ahmedabad', pincode: '380001' }
]

export function PincodeModal({ isOpen, onClose }: PincodeModalProps) {
  const { deliveryLocation, setDeliveryLocation } = useStore()
  const [pincodeInput, setPincodeInput] = useState('')
  const [cityInput, setCityInput] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^\d{6}$/.test(pincodeInput.trim())) {
      setError('Please enter a valid 6-digit Indian PIN code')
      return
    }
    setError('')
    setDeliveryLocation({
      city: cityInput.trim() || 'Selected Destination',
      pincode: pincodeInput.trim()
    })
    onClose()
  }

  const handleSelectCity = (city: string, pincode: string) => {
    setDeliveryLocation({ city, pincode })
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pincode-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl border border-slate-200"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-lg bg-orange-50 text-[#d94815]">
              <MapPin size={18} />
            </span>
            <div>
              <h2 id="pincode-modal-title" className="font-bold text-slate-900 text-sm sm:text-base">
                Delivery Postal Code
              </h2>
              <p className="text-xs text-slate-500">Check serviceability and logistics delivery SLA</p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={17} />
          </button>
        </div>

        {/* Custom Pincode Input */}
        <form onSubmit={handleApplyCustom} className="mt-4">
          <label htmlFor="pincode-custom-input" className="block text-xs font-bold text-slate-700">
            Enter 6-Digit Postal PIN Code
          </label>
          <div className="mt-1.5 flex flex-col sm:flex-row gap-2">
            <div className="flex gap-2 flex-1">
              <input
                id="pincode-custom-input"
                type="text"
                maxLength={6}
                value={pincodeInput}
                onChange={(e) => {
                  setPincodeInput(e.target.value.replace(/\D/g, ''))
                  setError('')
                }}
                placeholder="6-digit PIN"
                className="h-9 w-1/2 sm:w-32 rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-[#d94815]"
              />
              <input
                id="pincode-city-input"
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="City (optional)"
                className="h-9 w-1/2 sm:flex-1 rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-[#d94815]"
              />
            </div>
            <button
              type="submit"
              className="h-9 rounded-lg bg-[#d94815] px-4 text-xs font-bold text-white hover:bg-[#c2410c] shrink-0"
            >
              Verify PIN
            </button>
          </div>
          {error && <p className="mt-1 text-[11px] font-semibold text-red-600">{error}</p>}
        </form>

        {/* Popular Metropolitan Hubs */}
        <div className="mt-5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Common Metropolitan Hubs</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {popularCities.map((item) => {
              const isSelected = deliveryLocation.pincode === item.pincode
              return (
                <button
                  key={item.pincode}
                  type="button"
                  onClick={() => handleSelectCity(item.city, item.pincode)}
                  className={`flex items-center justify-between rounded-lg border p-2.5 text-left text-xs transition ${
                    isSelected
                      ? 'border-[#d94815] bg-orange-50 font-bold text-[#d94815]'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div>
                    <p className="font-bold">{item.city}</p>
                    <p className="text-[10px] text-slate-400">PIN {item.pincode}</p>
                  </div>
                  {isSelected && <Check size={14} className="text-[#d94815]" />}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-5 flex justify-end border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  )
}
