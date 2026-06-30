'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Bag, List, X, MagnifyingGlass, Heart, AirplaneTilt } from '@phosphor-icons/react'
import { useCartStore } from '@/lib/store'
import { useWishlistStore } from '@/lib/wishlistStore'
import { WishlistDrawer } from '@/components/wishlist/WishlistDrawer'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Tienda', href: '/tienda' },
  { label: 'Kits Viajeros', href: '/kits' },
  { label: 'Novedades', href: '/tienda?filter=nuevo' },
  { label: 'Biblioteca', href: '/tienda?cat=biblioteca-viajera' },
  { label: 'Sobre Nosotras', href: '/sobre-nosotras' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { itemCount, openCart } = useCartStore()
  const { count: wishlistCount } = useWishlistStore()
  const count = mounted ? itemCount() : 0
  const wCount = mounted ? wishlistCount() : 0

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-[#E8336D] text-white text-center text-xs font-medium py-2 px-4">
        Envío GRATIS sobre $25.000 a todo Chile · Blue Express con seguimiento
      </div>

      {/* Main header */}
      <header
        className={cn(
          'sticky top-0 z-40 bg-[#FFF8FA]/95 backdrop-blur-md border-b border-[#FCE8EF] transition-shadow duration-300',
          scrolled && 'shadow-[0_2px_12px_rgb(232_51_109/0.1)]'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 rounded-full bg-[#E8336D] flex items-center justify-center text-white shadow-sm">
                <AirplaneTilt size={18} weight="fill" />
              </div>
              <div className="hidden sm:block">
                <span className="font-display text-2xl font-bold text-[#2D2D2D] leading-none">
                  Muy Viajeras
                </span>
                <span className="block text-[10px] font-semibold text-[#E8336D] tracking-widest uppercase -mt-0.5">
                  Chile
                </span>
              </div>
              <span className="font-display text-xl font-bold text-[#2D2D2D] sm:hidden">
                Muy Viajeras
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-[#6B6B6B] hover:text-[#E8336D] transition-colors duration-150 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#E8336D] group-hover:w-full transition-all duration-200 rounded-full" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                aria-label="Buscar"
                className="p-2 text-[#6B6B6B] hover:text-[#E8336D] hover:bg-[#FFF0F5] rounded-full transition-colors"
              >
                <MagnifyingGlass size={20} />
              </button>

              {/* Wishlist — visible on all sizes */}
              <button
                onClick={() => setWishlistOpen(true)}
                aria-label="Favoritos"
                className="relative p-2 text-[#6B6B6B] hover:text-[#E8336D] hover:bg-[#FFF0F5] rounded-full transition-colors"
              >
                <Heart size={20} weight={wCount > 0 ? 'fill' : 'regular'} className={wCount > 0 ? 'text-[#E8336D]' : ''} />
                {wCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#F9D0DC] text-[#E8336D] text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wCount > 9 ? '9+' : wCount}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={openCart}
                aria-label="Carrito"
                className="relative p-2 text-[#6B6B6B] hover:text-[#E8336D] hover:bg-[#FFF0F5] rounded-full transition-colors"
              >
                <Bag size={20} />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#E8336D] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Menú"
                className="p-2 text-[#6B6B6B] hover:text-[#E8336D] hover:bg-[#FFF0F5] rounded-full transition-colors lg:hidden ml-1"
              >
                <List size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Wishlist drawer */}
      <WishlistDrawer isOpen={wishlistOpen} onClose={() => setWishlistOpen(false)} />

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-[#FFF8FA] shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-[#FCE8EF]">
              <span className="font-display text-xl font-bold text-[#2D2D2D]">Menú</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 hover:bg-[#FFF0F5] rounded-full transition-colors"
              >
                <X size={20} className="text-[#6B6B6B]" />
              </button>
            </div>
            <nav className="flex-1 p-5 space-y-1 overflow-y-auto">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#2D2D2D] font-medium hover:bg-[#F9D0DC] hover:text-[#E8336D] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {/* Wishlist shortcut in mobile menu */}
              <button
                onClick={() => { setMobileOpen(false); setWishlistOpen(true) }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#2D2D2D] font-medium hover:bg-[#F9D0DC] hover:text-[#E8336D] transition-colors"
              >
                <Heart size={18} weight={wCount > 0 ? 'fill' : 'regular'} className={wCount > 0 ? 'text-[#E8336D]' : ''} />
                Mis favoritas
                {wCount > 0 && (
                  <span className="ml-auto text-xs font-bold bg-[#F9D0DC] text-[#E8336D] px-2 py-0.5 rounded-full">
                    {wCount}
                  </span>
                )}
              </button>
            </nav>
            <div className="p-5 border-t border-[#FCE8EF]">
              <p className="text-xs text-[#6B6B6B] text-center">Con amor desde Chile</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
