import { Truck, LockKey, SealCheck, ChatsCircle } from '@phosphor-icons/react/dist/ssr'
import { Reveal } from '@/components/ui/Reveal'

const BENEFITS = [
  {
    Icon: Truck,
    title: 'Envío a todo Chile',
    description: 'Despachamos con Blue Express. Seguimiento en tiempo real directo a tu puerta.',
  },
  {
    Icon: LockKey,
    title: 'Compra 100% segura',
    description: 'Pago con tarjeta, débito o transferencia. Tus datos siempre protegidos.',
  },
  {
    Icon: SealCheck,
    title: 'Calidad verificada',
    description: 'Cada producto es probado por viajeras reales. Las fotos son del producto real.',
  },
  {
    Icon: ChatsCircle,
    title: 'Soporte cercano',
    description: 'Te respondemos por WhatsApp o Instagram. Somos personas reales, no bots.',
  },
]

export function Benefits() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="mb-10">
            <p className="font-script text-2xl text-[#E8336D] leading-none mb-1">por qué nosotras</p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#2D2D2D]">
              Comprar tranquila, viajar feliz
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {BENEFITS.map(({ Icon, title, description }, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="flex flex-col h-full p-5 sm:p-6 rounded-2xl bg-[#FFF8FA] border border-[#FCE8EF] hover:border-[#F0A8B5] hover:shadow-[0_8px_24px_-8px_rgb(232_51_109/0.18)] hover:-translate-y-1 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-[#E8336D] flex items-center justify-center mb-4 shrink-0">
                  <Icon size={22} weight="fill" className="text-white" />
                </div>
                <h3 className="font-semibold text-[#2D2D2D] text-sm mb-1.5">{title}</h3>
                <p className="text-xs text-[#6B6B6B] leading-relaxed">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
