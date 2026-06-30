import Image from 'next/image'
import Link from 'next/link'
import { Sparkle, AirplaneTilt, UsersThree } from '@phosphor-icons/react/dist/ssr'
import { PublicLayout } from '@/components/layout/PublicLayout'

const VALUES = [
  {
    Icon: Sparkle,
    title: 'Feminidad auténtica',
    text: 'No somos "accesorios de viaje con un poco de rosa". Somos girly de verdad, construido por y para mujeres que aman el estilo.',
  },
  {
    Icon: AirplaneTilt,
    title: 'Practicidad que no sacrifica',
    text: 'Cada producto funciona perfectamente y se ve increíble. Porque elegir entre bonito y funcional es un mito.',
  },
  {
    Icon: UsersThree,
    title: 'Comunidad primero',
    text: 'Somos más que una tienda. Somos una comunidad de viajeras chilenas que se apoyan, comparten y viajan juntas.',
  },
]

export default function SobreNosotrasPage() {
  return (
    <PublicLayout>
      <div className="bg-[#F9D0DC] py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-[#2D2D2D] mb-2">
            Nuestra historia
          </h1>
          <p className="text-[#6B6B6B]">De una maleta desorganizada a la tienda de las viajeras chilenas</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 gap-10 items-center mb-16">
          <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1521791055366-0d553872952f?w=600&q=80"
              alt="Muy Viajeras Chile"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2D2D2D] mb-4 leading-tight">
              Muy Viajeras nació de una maleta mal organizada
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              Todo empezó antes de un viaje. La maleta abierta, cosas por todas partes, el maquillaje
              mezclado con los documentos, y los organizadores de viaje que encontraba en el mercado
              eran todos iguales: neutros, genéricos, sin personalidad.
            </p>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              Así que decidimos hacer algo al respecto. Creamos <strong className="text-[#2D2D2D]">Muy Viajeras Chile</strong>,
              la tienda de accesorios de viaje diseñada para la mujer chilena que ama viajar
              y que se niega a sacrificar el estilo por la practicidad.
            </p>
            <p className="text-[#6B6B6B] leading-relaxed">
              Porque viajar cómoda, organizada y bonita no son tres cosas distintas.
              Pueden ser lo mismo.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {VALUES.map(({ Icon, title, text }, i) => (
            <div key={i} className="p-6 bg-[#FFF8FA] rounded-2xl border border-[#FCE8EF]">
              <div className="w-12 h-12 bg-[#E8336D] rounded-xl flex items-center justify-center mb-4">
                <Icon size={22} weight="fill" className="text-white" />
              </div>
              <h3 className="font-semibold text-[#2D2D2D] mb-2">{title}</h3>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-[#F9D0DC] rounded-3xl p-10">
          <h2 className="font-display text-4xl font-bold text-[#2D2D2D] mb-3">
            Gracias por apoyar a Muy Viajeras Chile
          </h2>
          <p className="text-[#6B6B6B] mb-6">
            Cada compra es un apoyo directo a un emprendimiento chileno hecho con amor.
          </p>
          <Link href="/tienda" className="btn-primary inline-flex text-base px-8 py-4">
            Ver todos los productos
          </Link>
        </div>
      </div>
    </PublicLayout>
  )
}
