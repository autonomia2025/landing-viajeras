'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, ShoppingBag, Minus, Plus, Trash, Package, Truck, Check } from '@phosphor-icons/react'
import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from '@/lib/data'

export function CartSidebar() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, total, itemCount } = useCartStore()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [isOpen])

  const cartTotal = mounted ? total() : 0
  const count = mounted ? itemCount() : 0
  const mountedItems = mounted ? items : []
  const freeShippingLeft = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal)
  const shippingFree = cartTotal >= FREE_SHIPPING_THRESHOLD
  const progressPct = Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100)

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={closeCart}
          aria-hidden
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 bottom-0 z-50 w-full max-w-[420px] bg-[#FFF8FA] shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#FCE8EF]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#E8336D]" />
            <span className="font-semibold text-[#2D2D2D]">
              Tu carrito
              {count > 0 && (
                <span className="ml-1.5 text-sm font-normal text-[#6B6B6B]">({count} {count === 1 ? 'ítem' : 'ítems'})</span>
              )}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-[#FFF0F5] rounded-full transition-colors"
            aria-label="Cerrar carrito"
          >
            <X size={18} className="text-[#6B6B6B]" />
          </button>
        </div>

        {/* Free shipping progress */}
        {mountedItems.length > 0 && (
          <div className="px-5 py-3 bg-[#FFF0F5] border-b border-[#FCE8EF]">
            {shippingFree ? (
              <p className="text-sm font-medium text-green-600 flex items-center gap-1.5">
                <Check size={14} weight="bold" />
                Tienes envío GRATIS
              </p>
            ) : (
              <>
                <p className="text-xs text-[#6B6B6B] mb-1.5 flex items-center gap-1">
                  <Truck size={13} className="text-[#E8336D]" />
                  Agrega <strong className="text-[#E8336D]">{formatPrice(freeShippingLeft)}</strong> más para envío gratis
                </p>
                <div className="h-1.5 bg-[#FCE8EF] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#E8336D] rounded-full transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
              <div className="w-20 h-20 rounded-full bg-[#F9D0DC] flex items-center justify-center">
                <Package size={32} className="text-[#E8336D]" />
              </div>
              <div>
                <p className="font-semibold text-[#2D2D2D] mb-1">Tu carrito está vacío</p>
                <p className="text-sm text-[#6B6B6B]">Encuentra todo lo que necesitas para tu próximo viaje</p>
              </div>
              <Button onClick={closeCart} variant="primary" size="md" className="mt-2">
                Ver tienda
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-[#FCE8EF] px-5">
              {mountedItems.map((item) => (
                <li key={`${item.product.id}-${item.variant?.id}`} className="py-4 flex gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F9D0DC] shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#2D2D2D] line-clamp-2 leading-tight mb-0.5">
                      {item.product.name}
                    </p>
                    {item.variant && (
                      <p className="text-xs text-[#6B6B6B] mb-2">{item.variant.value}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 bg-white border border-[#FCE8EF] rounded-full px-1 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variant?.id)}
                          className="w-6 h-6 flex items-center justify-center hover:text-[#E8336D] transition-colors rounded-full"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variant?.id)}
                          className="w-6 h-6 flex items-center justify-center hover:text-[#E8336D] transition-colors rounded-full"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-[#E8336D]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id, item.variant?.id)}
                    className="p-1 text-[#9CA3AF] hover:text-red-500 transition-colors self-start"
                    aria-label="Eliminar"
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
          <div className="border-t border-[#FCE8EF] px-5 py-5 space-y-3 bg-white">
            <div className="flex justify-between text-sm text-[#6B6B6B]">
              <span>Subtotal</span>
              <span className="font-medium text-[#2D2D2D]">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-[#6B6B6B]">
              <span>Envío</span>
              {shippingFree ? (
                <span className="text-green-600 font-medium">GRATIS</span>
              ) : (
                <span className="font-medium text-[#2D2D2D]">{formatPrice(SHIPPING_COST)}</span>
              )}
            </div>
            <div className="flex justify-between font-bold text-[#2D2D2D] pt-2 border-t border-[#FCE8EF]">
              <span>Total</span>
              <span className="text-[#E8336D] text-lg">
                {formatPrice(cartTotal + (shippingFree ? 0 : SHIPPING_COST))}
              </span>
            </div>
            <Link href="/checkout" onClick={closeCart}>
              <Button variant="primary" size="full" className="text-base py-4 mt-1">
                Ir al pago
              </Button>
            </Link>
            <button
              onClick={closeCart}
              className="w-full text-sm text-[#6B6B6B] hover:text-[#E8336D] transition-colors py-1"
            >
              Seguir comprando
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
