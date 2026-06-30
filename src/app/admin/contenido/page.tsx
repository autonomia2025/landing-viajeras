'use client'

import { useState } from 'react'
import { FloppyDisk, Eye } from '@phosphor-icons/react/dist/ssr'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function AdminContenido() {
  const [saved, setSaved] = useState(false)
  const [hero, setHero] = useState({
    title: 'Viaja organizada,\nviaja con estilo',
    subtitle: 'Todo lo que necesitas para tu próximo viaje en un solo lugar. Accesorios femeninos, prácticos y lindos.',
    cta: 'Ver colección',
    badge: 'Envíos a todo Chile · Blue Express',
  })
  const [banner, setBanner] = useState({
    active: true,
    text: 'Envío GRATIS sobre $25.000 a todo Chile · Blue Express con seguimiento',
  })
  const [freeShipping, setFreeShipping] = useState('25000')

  const handleSave = async () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-5 sm:p-8 pt-16 lg:pt-8">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#2D2D2D]">Editor de contenido</h1>
          <p className="text-[#6B6B6B] text-sm mt-1">Edita el contenido de tu tienda sin tocar código</p>
        </div>
        <div className="flex gap-3">
          <Link href="/" target="_blank">
            <Button variant="secondary" size="md">
              <Eye size={15} /> Ver tienda
            </Button>
          </Link>
          <Button variant="primary" size="md" onClick={handleSave}>
            {saved ? 'Guardado' : <><FloppyDisk size={15} /> Guardar cambios</>}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Announcement bar */}
        <div className="bg-white rounded-2xl border border-[#FCE8EF] p-6">
          <h2 className="font-semibold text-[#2D2D2D] mb-4 flex items-center gap-2">
            Barra de anuncio
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#6B6B6B]">Activa</span>
              <button
                onClick={() => setBanner({ ...banner, active: !banner.active })}
                className={`w-10 h-5 rounded-full transition-colors ${banner.active ? 'bg-[#E8336D]' : 'bg-gray-200'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform mx-0.5 ${banner.active ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#6B6B6B] mb-1.5 block">Texto del banner</label>
              <input className="input-brand" value={banner.text} onChange={(e) => setBanner({ ...banner, text: e.target.value })} />
            </div>
          </div>
          {banner.active && (
            <div className="mt-4 p-3 bg-[#E8336D] text-white text-center text-xs rounded-xl font-medium">
              {banner.text}
            </div>
          )}
        </div>

        {/* Free shipping threshold */}
        <div className="bg-white rounded-2xl border border-[#FCE8EF] p-6">
          <h2 className="font-semibold text-[#2D2D2D] mb-4">Umbral de envío gratis</h2>
          <div>
            <label className="text-xs font-semibold text-[#6B6B6B] mb-1.5 block">Monto mínimo para envío gratis (CLP)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-sm">$</span>
              <input
                className="input-brand pl-7"
                type="number"
                value={freeShipping}
                onChange={(e) => setFreeShipping(e.target.value)}
              />
            </div>
            <p className="text-xs text-[#9CA3AF] mt-1.5">Actualmente: envío gratis sobre ${parseInt(freeShipping).toLocaleString('es-CL')}</p>
          </div>
        </div>

        {/* Hero section */}
        <div className="bg-white rounded-2xl border border-[#FCE8EF] p-6 lg:col-span-2">
          <h2 className="font-semibold text-[#2D2D2D] mb-5">Sección Hero (página de inicio)</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#6B6B6B] mb-1.5 block">Título principal</label>
              <textarea
                className="input-brand h-20 resize-none"
                value={hero.title}
                onChange={(e) => setHero({ ...hero, title: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#6B6B6B] mb-1.5 block">Subtítulo</label>
              <textarea
                className="input-brand h-20 resize-none"
                value={hero.subtitle}
                onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#6B6B6B] mb-1.5 block">Texto del botón CTA</label>
              <input className="input-brand" value={hero.cta} onChange={(e) => setHero({ ...hero, cta: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#6B6B6B] mb-1.5 block">Badge sobre el título</label>
              <input className="input-brand" value={hero.badge} onChange={(e) => setHero({ ...hero, badge: e.target.value })} />
            </div>
          </div>

          {/* Preview */}
          <div className="mt-5 p-6 bg-[#F9D0DC] rounded-2xl">
            <p className="text-xs font-semibold text-[#6B6B6B] mb-3">PREVIEW</p>
            <div className="inline-flex items-center gap-2 bg-[#E8336D] text-white text-xs font-semibold px-4 py-2 rounded-full mb-3">
              {hero.badge}
            </div>
            <h3 className="font-display text-3xl font-bold text-[#2D2D2D] mb-2 whitespace-pre-line">{hero.title}</h3>
            <p className="text-sm text-[#6B6B6B] mb-4">{hero.subtitle}</p>
            <span className="btn-primary inline-flex text-sm">{hero.cta}</span>
          </div>
        </div>

        {/* Testimonials quick edit */}
        <div className="bg-white rounded-2xl border border-[#FCE8EF] p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-[#2D2D2D]">Gestión de reseñas</h2>
            <button className="text-sm text-[#E8336D] font-medium hover:underline">+ Agregar reseña</button>
          </div>
          <p className="text-sm text-[#6B6B6B] bg-[#FFF8FA] rounded-xl p-4 border border-[#FCE8EF]">
            Las reseñas destacadas en el home se gestionan desde la sección de <strong>Productos → Reseñas del producto</strong>.
            Puedes marcar reseñas como "destacada" para que aparezcan en la página de inicio.
          </p>
        </div>
      </div>
    </div>
  )
}
