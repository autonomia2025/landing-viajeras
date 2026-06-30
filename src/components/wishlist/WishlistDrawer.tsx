'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, Heart, ShoppingBag, Trash } from '@phosphor-icons/react'
import { useWishlistStore } from '@/lib/wishlistStore'
import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

interface WishlistDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function WishlistDrawer({ isOpen, onClose }: WishlistDrawerProps) {
  const [mounted, setMounted] = useState(false)
  const { items, toggle } = useWishlistStore()
  const { addItem } = useCartStore()

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [isOpen])

  const mountedItems = mounted ? items : []

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden
        />
      )}

      <aside
        className={`fixed right-0 top-0 bottom-0 z-50 w-full max-w-[420px] bg-[#FFF8FA] shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#FCE8EF]">
          <div className="flex items-center gap-2">
            <Heart size={20} weight="fill" className="text-[#E8336D]" />
            <span className="font-semibold text-[#2D2D2D]">
              Mis favoritas
              {mountedItems.length > 0 && (
                <span className="ml-1.5 text-sm font-normal text-[#6B6B6B]">
                  ({mountedItems.length} {mountedItems.length === 1 ? 'producto' : 'productos'})
                </span>
              )}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#FFF0F5] rounded-full transition-colors"
            aria-label="Cerrar favoritos"
          >
            <X size={18} className="text-[#6B6B6B]" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {mountedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
              <div className="w-20 h-20 rounded-full bg-[#F9D0DC] flex items-center justify-center">
                <Heart size={32} className="text-[#E8336D]" />
              </div>
              <div>
                <p className="font-semibold text-[#2D2D2D] mb-1">Aún no tienes favoritas</p>
                <p className="text-sm text-[#6B6B6B]">Guarda los productos que más te gustan con el corazón</p>
              </div>
              <Button onClick={onClose} variant="primary" size="md" className="mt-2">
                Explorar tienda
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-[#FCE8EF] px-5">
              {mountedItems.map((product) => (
                <li key={product.id} className="py-4 flex gap-3">
                  <Link
                    href={`/producto/${product.slug}`}
                    onClick={onClose}
                    className="w-16 h-16 rounded-xl overflow-hidden bg-[#F9D0DC] shrink-0 hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/producto/${product.slug}`}
                      onClick={onClose}
                      className="text-sm font-medium text-[#2D2D2D] line-clamp-2 leading-tight mb-1 hover:text-[#E8336D] transition-colors block"
                    >
                      {product.name}
                    </Link>
                    <p className="text-sm font-bold text-[#E8336D] mb-2">{formatPrice(product.price)}</p>
                    <button
                      onClick={() => { addItem(product); onClose() }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#E8336D] text-white px-3 py-1.5 rounded-full hover:bg-[#C42059] transition-colors"
                    >
                      <ShoppingBag size={12} /> Agregar al carrito
                    </button>
                  </div>
                  <button
                    onClick={() => toggle(product)}
                    className="p-1 text-[#9CA3AF] hover:text-red-500 transition-colors self-start"
                    aria-label="Quitar de favoritos"
                  >
                    <Trash size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {mountedItems.length > 0 && (
          <div className="border-t border-[#FCE8EF] px-5 py-4 bg-white">
            <Link href="/tienda" onClick={onClose}>
              <Button variant="secondary" size="full">
                Seguir explorando
              </Button>
            </Link>
          </div>
        )}
      </aside>
    </>
  )
}
