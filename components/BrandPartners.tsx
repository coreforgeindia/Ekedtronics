'use client'

import React from 'react'
import { ShieldCheck, CheckCircle2, Building } from 'lucide-react'
import { ScrollReveal } from './ScrollReveal'

const brandStrips = [
  {
    id: 'strip-2',
    src: '/brands/brand_strip_2.png',
    alt: 'Direct brand authorization for LG, Samsung, Sony, Haier, Panasonic',
    caption: 'Television, Acoustic Audio & Flagship Mobile Partners'
  },
  {
    id: 'strip-1',
    src: '/brands/brand_strip_1.png',
    alt: 'Direct brand authorization for Bosch, Godrej, Vu, Mi, TCL',
    caption: 'Display Panels, Connected Home Tech & Visual Media'
  },
  {
    id: 'strip-3',
    src: '/brands/brand_strip_3.png',
    alt: 'Direct brand authorization for Daikin, Voltas, Blue Star, Hitachi, Mitsubishi, Kelvinator',
    caption: 'High-Efficiency Climate Control & Air Purification'
  },
  {
    id: 'strip-4',
    src: '/brands/brand_strip_4.png',
    alt: 'Direct brand authorization for AO Smith, Atomberg, Bajaj, BlowHot, Butterfly, Crompton Greaves',
    caption: 'Smart Living, Kitchen Automation & Domestic Appliances'
  }
]

export function BrandPartners() {
  return (
    <section className="border-t border-slate-200 bg-white py-8 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#0f766e]">
              Direct OEM Partnerships
            </span>
            <h2 className="mt-0.5 text-xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Authorized Distribution for Leading Global Brands
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Ekedtronics sources units directly from authorized brand manufacturing lines. Every product includes genuine manufacturer warranties and direct access to company service centers across India.
            </p>
          </div>

          {/* Grid of brand strip images */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {brandStrips.map((strip) => (
              <div
                key={strip.id}
                className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 sm:p-5 transition duration-200 hover:border-slate-300 hover:bg-white"
              >
                <img
                  src={strip.src}
                  alt={strip.alt}
                  className="max-h-11 sm:max-h-16 w-auto max-w-full object-contain"
                  loading="lazy"
                />
                <p className="mt-2.5 sm:mt-3 text-[11px] font-semibold text-slate-500 text-center">
                  {strip.caption}
                </p>
              </div>
            ))}
          </div>

          {/* Quality Assurance Bar */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-100 pt-6 text-xs text-slate-600">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={16} className="text-[#d94815] shrink-0" aria-hidden="true" />
              <span>100% Sealed Factory Packaging</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck size={16} className="text-[#0f766e] shrink-0" aria-hidden="true" />
              <span>Official Indian Manufacturer Warranty</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Building size={16} className="text-slate-500 shrink-0" aria-hidden="true" />
              <span>Nationwide Authorized Service Network</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
