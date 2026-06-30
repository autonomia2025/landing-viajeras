import Link from 'next/link'
import {
  Briefcase,
  IdentificationCard,
  Drop,
  Sparkle,
  AirplaneTilt,
  Scales,
  BookOpen,
  Gift,
} from '@phosphor-icons/react/dist/ssr'
import { Reveal } from '@/components/ui/Reveal'

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  organizadores: Briefcase,
  'porta-pasaportes': IdentificationCard,
  neceseres: Drop,
  scrunchies: Sparkle,
  'accesorios-vuelo': AirplaneTilt,
  equipaje: Scales,
  'biblioteca-viajera': BookOpen,
  kits: Gift,
}

const CATEGORIES = [
  { id: '1', name: 'Organizadores', slug: 'organizadores' },
  { id: '2', name: 'Porta Pasaportes', slug: 'porta-pasaportes' },
  { id: '3', name: 'Neceseres', slug: 'neceseres' },
  { id: '4', name: 'Scrunchies', slug: 'scrunchies' },
  { id: '5', name: 'Accesorios Vuelo', slug: 'accesorios-vuelo' },
  { id: '6', name: 'Equipaje', slug: 'equipaje' },
  { id: '7', name: 'Biblioteca Viajera', slug: 'biblioteca-viajera' },
  { id: '8', name: 'Kits Viajeros', slug: 'kits' },
]

export function Categories() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="flex items-end justify-between mb-10 gap-4">
            <div>
              <p className="font-script text-2xl text-[#E8336D] leading-none mb-1">explora</p>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#2D2D2D]">
                ¿Qué necesitas para tu viaje?
              </h2>
            </div>
            <Link
              href="/tienda"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#E8336D] hover:gap-2.5 transition-all whitespace-nowrap"
            >
              Ver todo →
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {CATEGORIES.map((cat, i) => {
            const Icon = CATEGORY_ICONS[cat.slug] ?? Gift
            return (
              <Reveal key={cat.id} delay={i * 0.04}>
                <Link
                  href={`/tienda?cat=${cat.slug}`}
                  className="group flex flex-col items-center gap-3 p-3 sm:p-5 rounded-2xl bg-[#FFF8FA] border border-[#FCE8EF] hover:border-[#E8336D]/30 hover:shadow-[0_12px_28px_-8px_rgb(232_51_109/0.25)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-[#E8336D] flex items-center justify-center transition-all duration-300 shadow-sm group-hover:scale-110 group-hover:rotate-[-6deg]">
                    <Icon
                      size={22}
                      weight="duotone"
                      className="text-[#E8336D] group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold text-[#6B6B6B] group-hover:text-[#E8336D] text-center leading-tight transition-colors">
                    {cat.name}
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
