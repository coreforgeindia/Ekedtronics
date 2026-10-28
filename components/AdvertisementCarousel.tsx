'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

const adSlides = [
  {
    id: 'ad-festive-1',
    src: '/advertisement_images/Ekedtronics_Festive_Banner_1_2172x724.png',
    mobileSrc: '/advertisement_images/mobile/Ekedtronics_Festive_Banner_1_mobile.png',
    alt: 'Ekedtronics Festive Electronics Offer Showcase - Television and Home Audio',
    href: '/products?category=Televisions',
    title: 'Festive Season Electronics - Direct Brand Warranties'
  },
  {
    id: 'ad-dussehra-3',
    src: '/advertisement_images/Ekedtronics_Dussehra_Banner_3_2172x724.png',
    mobileSrc: '/advertisement_images/mobile/Ekedtronics_Dussehra_Banner_3_mobile.png',
    alt: 'Ekedtronics Dussehra Campaign - High Output Audio & Party Sound',
    href: '/products?category=Audio',
    title: 'Dussehra Season Audio Upgrades'
  },
  {
    id: 'ad-diwali-2',
    src: '/advertisement_images/Ekedtronics_Diwali_Banner_2_2172x724.png',
    mobileSrc: '/advertisement_images/mobile/Ekedtronics_Diwali_Banner_2_mobile.png',
    alt: 'Ekedtronics Diwali Campaign - Smart Appliances and Home Electronics',
    href: '/products?category=Appliances',
    title: 'Diwali Home Appliances Catalog'
  },
  {
    id: 'ad-newyear-4',
    src: '/advertisement_images/Ekedtronics_NewYear_Banner_4_2172x724.png',
    mobileSrc: '/advertisement_images/mobile/Ekedtronics_NewYear_Banner_4_mobile.png',
    alt: 'Ekedtronics New Year Campaign - Flagship Smartphones and Computing',
    href: '/products?category=Smartphones',
    title: 'New Year Flagship Smartphone Showcase'
  },
  {
    id: 'ad-category-5',
    src: '/advertisement_images/Ekedtronics_Category_Banner_5_2172x724.png',
    mobileSrc: '/advertisement_images/mobile/Ekedtronics_Category_Banner_5_mobile.png',
    alt: 'Ekedtronics All Category Catalog - Certified Electronics with Express Delivery',
    href: '/products',
    title: 'All Electronics Categories'
  }
]

export function AdvertisementCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? adSlides.length - 1 : prev - 1))
  }, [])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % adSlides.length)
  }, [])

  // Auto-play interval with pause capability (WCAG 2.2.2)
  useEffect(() => {
    if (!isPlaying) return

    const timer = setInterval(() => {
      goToNext()
    }, 4500)

    return () => clearInterval(timer)
  }, [isPlaying, goToNext])

  // Keyboard navigation when carousel container is focused (WCAG 2.1.1)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goToPrev()
    } else if (e.key === 'ArrowRight') {
      goToNext()
    } else if (e.key === ' ') {
      e.preventDefault()
      setIsPlaying((prev) => !prev)
    }
  }

  // Touch gesture support
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const minSwipeDistance = 40

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > minSwipeDistance) {
      goToNext()
    } else if (distance < -minSwipeDistance) {
      goToPrev()
    }
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Promotional Banners"
      className="w-full bg-[#f8fafc] border-b border-slate-200 py-3 sm:py-5"
    >
      <div className="mx-auto max-w-[1280px] px-3 sm:px-6 lg:px-8">
        <div
          ref={carouselRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
          onFocus={() => setIsPlaying(false)}
          onBlur={() => setIsPlaying(true)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-xs focus:ring-2 focus:ring-[#d94815] outline-none"
        >
          {/* Viewport: perfectly matching mobile 2.25:1 framing and desktop 2172/724 widescreen */}
          <div
            className="relative w-full aspect-[2.25/1] sm:aspect-[2.6/1] lg:aspect-[2172/724] overflow-hidden bg-slate-900"
            aria-live={isPlaying ? 'off' : 'polite'}
          >
            {adSlides.map((slide, idx) => {
              const isActive = idx === currentIndex
              return (
                <div
                  key={slide.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${idx + 1} of ${adSlides.length}: ${slide.title}`}
                  aria-hidden={!isActive}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <Link
                    href={slide.href}
                    tabIndex={isActive ? 0 : -1}
                    className="relative block size-full overflow-hidden"
                    title={slide.title}
                  >
                    {/* Responsive Picture: serves 2.25:1 mobile banner on mobile, and 3:1 on desktop */}
                    <picture className="block size-full">
                      <source media="(max-width: 639px)" srcSet={slide.mobileSrc} />
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        className="size-full object-cover object-center"
                        loading={idx === 0 ? 'eager' : 'lazy'}
                      />
                    </picture>
                  </Link>
                </div>
              )
            })}

            {/* Left Chevron Button */}
            <button
              type="button"
              onClick={goToPrev}
              aria-label="Previous promotional slide"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 grid size-7 sm:size-9 place-items-center rounded-full bg-white/90 text-slate-800 shadow-sm backdrop-blur-xs transition hover:bg-white hover:text-slate-900 border border-slate-200 opacity-85 sm:opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="size-4 sm:size-5" />
            </button>

            {/* Right Chevron Button */}
            <button
              type="button"
              onClick={goToNext}
              aria-label="Next promotional slide"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 grid size-7 sm:size-9 place-items-center rounded-full bg-white/90 text-slate-800 shadow-sm backdrop-blur-xs transition hover:bg-white hover:text-slate-900 border border-slate-200 opacity-85 sm:opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="size-4 sm:size-5" />
            </button>

            {/* Bottom Controls Bar: Indicators + Accessible Pause/Play */}
            <div className="absolute bottom-2.5 sm:bottom-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2 rounded-full bg-slate-900/80 px-2.5 sm:px-3.5 py-1 text-white border border-white/10 backdrop-blur-xs">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Pause banner slideshow' : 'Play banner slideshow'}
                className="text-slate-300 hover:text-white p-0.5 mr-0.5 sm:mr-1"
              >
                {isPlaying ? <Pause size={11} className="sm:size-3" /> : <Play size={11} className="sm:size-3" />}
              </button>

              {adSlides.map((slide, idx) => {
                const isActive = idx === currentIndex
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Jump to slide ${idx + 1}: ${slide.title}`}
                    aria-current={isActive ? 'true' : 'false'}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-5 sm:w-6 bg-[#d94815]'
                        : 'w-1.5 bg-white/40 hover:bg-white/80'
                    }`}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
