'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { ProductCard } from '@/components/product/ProductCard'
import { Reveal } from '@/components/ui/Reveal'
import { PRODUCTS } from '@/lib/data'
import { useCartStore } from '@/lib/store'
import { Check, Tag, ShoppingBag, Sparkle } from '@phosphor-icons/react'
import type { Product } from '@/types'

const KITS = [
  {
    id: 'kit-viajera-esencial',
    name: 'Kit Viajera Esencial',
    description: 'Todo lo que necesitas para tu primer viaje. Organizador, neceser y billetera viajera en un solo pack.',
    price: 49990,
    compareAtPrice: 65990,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=85',
    includes: ['Organizador de equipaje', 'Neceser transparente', 'Billetera de viaje'],
    badge: 'Más popular',
  },
  {
    id: 'kit-viajera-pro',
    name: 'Kit Viajera Pro',
    description: 'Para la viajera frecuente. Incluye todo el esencial más accesorios premium para viajar con estilo.',
    price: 79990,
    compareAtPrice: 105990,
    image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&q=85',
    includes: ['Organizador de equipaje', 'Neceser premium', 'Billetera RFID', 'Porta documentos', 'Cubierta de pasaporte'],
    badge: 'Mejor valor',
  },
  {
    id: 'kit-mochilera',
    name: 'Kit Mochilera',
    description: 'Diseñado para las que viajan ligero pero sin olvidar nada. Compacto, funcional y muy viajero.',
    price: 34990,
    compareAtPrice: 44990,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=85',
    includes: ['Mini organizador', 'Billetera compacta', 'Porta auriculares'],
    badge: 'Nuevo',
  },
]

const formatPrice = (n: number) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n)

export default function KitsPage() {
  const { addItem } = useCartStore()

  const addKit = (kit: (typeof KITS)[number]) => {
    const product: Product = {
      id: kit.id,
      name: kit.name,
      slug: kit.id,
      description: kit.description,
      price: kit.price,
      compareAtPrice: kit.compareAtPrice,
      images: [kit.image],
      category: 'Kits Viajeros',
      categorySlug: 'kits',
      stock: 20,
      tags: ['kit'],
      featured: true,
      isNew: false,
      rating: 5,
      reviewCount: 0,
      sku: kit.id.toUpperCase(),
    }
    addItem(product)
  }

  return (
    <PublicLayout>
      {/* Hero — asymmetric, editorial */}
      <section className="relative overflow-hidden bg-[#2D2D2D]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=85"
            alt="Viajera preparando su equipaje"
            fill
            priority
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2D2D2D] via-[#2D2D2D]/80 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 90, damping: 20 }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 bg-[#E8336D] text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6">
              <Sparkle size={13} weight="fill" />
              Combos especiales
            </div>
            <p className="font-script text-4xl text-[#F9D0DC] leading-none mb-3">todo en uno</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] mb-5">
              Kits Viajeras
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-md">
              Packs curados especialmente para ti. Ahorra hasta un 30% comprando en combo
              y viaja con todo lo que necesitas, sin tener que pensar en nada.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="bg-[#FFF8FA]">
        {/* Kits Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20">
            {KITS.map((kit, i) => {
              const discount = Math.round((1 - kit.price / kit.compareAtPrice) * 100)
              return (
                <Reveal key={kit.id} delay={i * 0.1}>
                  <div className="group bg-white rounded-3xl overflow-hidden border border-[#FCE8EF] shadow-[0_2px_16px_rgb(232_51_109/0.06)] hover:shadow-[0_16px_40px_-12px_rgb(232_51_109/0.22)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full">
                    <div className="relative overflow-hidden">
                      <Image
                        src={kit.image}
                        alt={kit.name}
                        width={800}
                        height={520}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <span className="absolute top-4 left-4 bg-[#E8336D] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                        {kit.badge}
                      </span>
                      <span className="absolute top-4 right-4 bg-white text-[#E8336D] text-xs font-bold px-2.5 py-1.5 rounded-full shadow-sm">
                        -{discount}%
                      </span>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-display text-2xl font-semibold text-[#2D2D2D] mb-2">{kit.name}</h3>
                      <p className="text-[#6B6B6B] text-sm mb-5 leading-relaxed">{kit.description}</p>

                      <div className="mb-6">
                        <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">Incluye</p>
                        <ul className="space-y-2">
                          {kit.includes.map((item, j) => (
                            <li key={j} className="flex items-center gap-2.5 text-sm text-[#2D2D2D]">
                              <span className="w-5 h-5 rounded-full bg-[#F9D0DC] flex items-center justify-center shrink-0">
                                <Check size={11} className="text-[#E8336D]" weight="bold" />
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-auto pt-5 border-t border-[#FCE8EF]">
                        <div className="flex items-end gap-2 mb-4">
                          <span className="font-display text-3xl font-semibold text-[#E8336D] leading-none">{formatPrice(kit.price)}</span>
                          <span className="text-sm text-[#9CA3AF] line-through mb-0.5">{formatPrice(kit.compareAtPrice)}</span>
                        </div>
                        <button
                          onClick={() => addKit(kit)}
                          className="btn-primary w-full"
                        >
                          <ShoppingBag size={16} weight="bold" />
                          Agregar al carrito
                        </button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>

          {/* Value strip */}
          <Reveal>
            <div className="grid sm:grid-cols-3 gap-4 mb-20">
              {[
                { Icon: Tag, title: 'Ahorra hasta 30%', text: 'Comprando en combo vs. por separado' },
                { Icon: Check, title: 'Productos curados', text: 'Seleccionados por viajeras reales' },
                { Icon: Sparkle, title: 'Listo para regalar', text: 'Llega en empaque bonito y cuidado' },
              ].map(({ Icon, title, text }, i) => (
                <div key={i} className="flex items-start gap-3 bg-white rounded-2xl p-5 border border-[#FCE8EF]">
                  <div className="w-10 h-10 rounded-xl bg-[#E8336D] flex items-center justify-center shrink-0">
                    <Icon size={18} weight="fill" className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#2D2D2D] text-sm">{title}</p>
                    <p className="text-xs text-[#6B6B6B] mt-0.5">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Also sell individually */}
          <Reveal>
            <div className="mb-8">
              <p className="font-script text-2xl text-[#E8336D] leading-none mb-1">o arma el tuyo</p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#2D2D2D]">Elige por separado</h2>
              <p className="text-[#6B6B6B] mt-1 text-sm">Arma tu propio kit eligiendo los productos que necesitas</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {PRODUCTS.slice(0, 4).map((product, i) => (
              <Reveal key={product.id} delay={i * 0.05}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
