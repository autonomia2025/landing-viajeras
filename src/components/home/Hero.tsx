'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { AirplaneTilt, Star, Truck, ShieldCheck } from '@phosphor-icons/react'

const SPRING = { type: 'spring' as const, stiffness: 80, damping: 20 }
const SPRING_FAST = { type: 'spring' as const, stiffness: 120, damping: 18 }

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] bg-[#FFF8FA] flex items-center overflow-hidden">
      {/* Subtle background texture — no heavy blur blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[55%] h-full bg-[#F9D0DC]/25" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(circle, #E8336D 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-20 pt-28">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">

          {/* LEFT — typographic block */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING, delay: 0.05 }}
              className="inline-flex items-center gap-2 bg-white border border-[#FCE8EF] text-[#E8336D] text-xs font-semibold px-4 py-2 rounded-full mb-7 shadow-sm"
            >
              <AirplaneTilt size={14} weight="fill" />
              Envíos a todo Chile · Blue Express
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING, delay: 0.12 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-[#2D2D2D] leading-[1.05] tracking-tight mb-6"
            >
              Viaja organizada,
              <span className="block italic text-[#E8336D]">viaja con estilo</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING, delay: 0.2 }}
              className="text-base sm:text-lg text-[#6B6B6B] leading-relaxed mb-9 max-w-[52ch]"
            >
              Accesorios femeninos, prácticos y lindos para tu próximo viaje.
              Porque viajar bien organizada es viajar feliz.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING, delay: 0.28 }}
              className="flex flex-wrap gap-3"
            >
              <Link href="/tienda" className="btn-primary text-base px-8 py-4">
                Ver colección
              </Link>
              <Link href="/kits" className="btn-secondary text-base px-8 py-4">
                Ver kits viajeros
              </Link>
            </motion.div>

            {/* Stats strip — moved below CTAs per skill rule */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ...SPRING, delay: 0.4 }}
              className="flex items-center gap-6 mt-10 pt-8 border-t border-[#FCE8EF]"
            >
              <div>
                <p className="text-2xl font-bold text-[#2D2D2D] leading-none">+1.200</p>
                <p className="text-xs text-[#6B6B6B] mt-1">viajeras felices</p>
              </div>
              <div className="w-px h-10 bg-[#FCE8EF]" />
              <div className="flex items-center gap-1.5">
                <Star size={20} weight="fill" className="text-[#E8336D]" />
                <div>
                  <p className="text-2xl font-bold text-[#2D2D2D] leading-none">4.9</p>
                  <p className="text-xs text-[#6B6B6B] mt-1">calificación</p>
                </div>
              </div>
              <div className="w-px h-10 bg-[#FCE8EF]" />
              <div>
                <p className="text-2xl font-bold text-[#2D2D2D] leading-none">2–5 días</p>
                <p className="text-xs text-[#6B6B6B] mt-1">a tu puerta</p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT — image block */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ ...SPRING_FAST, delay: 0.08 }}
              className="relative w-full max-w-[420px] lg:max-w-none"
            >
              {/* Main image */}
              <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden ring-1 ring-[#FCE8EF] shadow-[0_24px_60px_-12px_rgb(232_51_109/0.18)]">
                <Image
                  src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=90"
                  alt="Organizadores de viaje rosados"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 90vw, 42vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#E8336D]/10 to-transparent" />
              </div>

              {/* Floating card — bestseller */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...SPRING, delay: 0.45 }}
                className="absolute -left-6 top-[22%] bg-white rounded-2xl shadow-[0_8px_32px_rgb(0_0_0/0.12)] px-4 py-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F9D0DC] flex items-center justify-center shrink-0">
                  <Star size={18} weight="fill" className="text-[#E8336D]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#2D2D2D] leading-none">Más vendido</p>
                  <p className="text-xs text-[#6B6B6B] mt-0.5">Set organizadores</p>
                </div>
              </motion.div>

              {/* Floating card — free shipping */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...SPRING, delay: 0.55 }}
                className="absolute -right-4 bottom-[22%] bg-white rounded-2xl shadow-[0_8px_32px_rgb(0_0_0/0.12)] px-4 py-3"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#E8336D] flex items-center justify-center shrink-0">
                    <Truck size={18} weight="fill" className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#2D2D2D] leading-none">Envío gratis</p>
                    <p className="text-xs text-[#E8336D] font-medium mt-0.5">sobre $25.000</p>
                  </div>
                </div>
              </motion.div>

              {/* Small shield badge — top right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...SPRING, delay: 0.62 }}
                className="absolute top-5 right-5 bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-md"
              >
                <ShieldCheck size={20} weight="fill" className="text-[#E8336D]" />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
