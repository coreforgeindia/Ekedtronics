'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

interface LogoProps {
  variant?: 'full' | 'compact' | 'light'
  className?: string
  height?: number
}

export function Logo({ variant = 'full', className = '', height = 54 }: LogoProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      router.push('/')
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 100)
    }
  }

  const logoSrc = variant === 'light' ? '/ekedtronics-logo-white.png' : '/ekedtronics-logo.png'

  return (
    <Link
      href="/"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 group transition-transform hover:scale-[1.02] cursor-pointer shrink-0 ${className}`}
      title="Ekedtronics - Go to top of Home Page"
    >
      <img
        src={logoSrc}
        alt="Ekedtronics"
        className="h-8 sm:h-11 md:h-13 w-auto max-w-[150px] sm:max-w-none object-contain drop-shadow-xs"
      />
    </Link>
  )
}
