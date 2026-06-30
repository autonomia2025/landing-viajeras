import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Tag } from '@phosphor-icons/react/dist/ssr'
import { Reveal } from '@/components/ui/Reveal'

export function KitBanner() {
  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6">
      <Reveal className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-[#2D2D2D] min-h-[320px] sm:min-h-[380px]">
          {/* Background image with dark overlay */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1400&q=80"
              alt="Kit viajero completo"
              fill
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2D2D2D]/90 via-[#2D2D2D]/60 to-transparent" />
          </div>

          {/* Content — left-aligned, asymmetric */}
          <div className="relative z-10 flex items-center min-h-[300px] sm:min-h-[360px]">
            <div className="px-8 sm:px-16 py-12 max-w-lg">
              <div className="inline-flex items-center gap-2 bg-[#E8336D] text-white text-xs font-bold px-4 py-1.5 rounded-full mb-5">
                <Tag size={12} weight="fill" />
                Ahorra hasta 20%
              </div>
              <p className="font-script text-3xl text-[#F9D0DC] leading-none mb-2">todo listo</p>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-white mb-4 leading-[1.1]">
                Lista para tu próximo viaje
              </h2>
              <p className="text-white/70 mb-8 leading-relaxed max-w-[38ch]">
                Arma tu kit completo y viaja con todo lo que necesitas,
                sin tener que pensar en nada más.
              </p>
              <Link
                href="/kits"
                className="inline-flex items-center gap-2 bg-white text-[#2D2D2D] font-semibold text-sm px-6 py-3 rounded-full hover:bg-[#F9D0DC] hover:text-[#E8336D] transition-colors duration-200"
              >
                Ver kits viajeros
                <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </div>

          {/* Right: decorative product image inset */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
            <div className="relative w-48 h-64 rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=400&q=80"
                alt="Accesorios del kit"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
