'use client'

import { useState } from 'react'
import { CaretDown, InstagramLogo, WhatsappLogo } from '@phosphor-icons/react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { FAQ_ITEMS } from '@/lib/data'

const EXTRA_FAQS = [
  { question: '¿Hacen factura?', answer: 'Actualmente emitimos boleta electrónica. Si necesitas factura para empresa, contáctanos por WhatsApp antes de hacer el pedido y lo coordinamos.' },
  { question: '¿Tienen tienda física?', answer: 'Somos una tienda 100% online. Ofrecemos retiro sin costo adicional en Ñuñoa, Santiago, coordinado por WhatsApp.' },
  { question: '¿Puedo pagar en cuotas?', answer: 'Sí, a través de MercadoPago puedes pagar en cuotas con tarjeta de crédito según las opciones disponibles de tu banco.' },
  { question: '¿Hacen envíos internacionales?', answer: 'Por ahora solo enviamos dentro de Chile. Si estás fuera de Chile, síguenos en Instagram para enterarte primero.' },
]

const ALL_FAQS = [...FAQ_ITEMS, ...EXTRA_FAQS]

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <PublicLayout>
      <div className="bg-[#F9D0DC] py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-[#2D2D2D] mb-2">
            Preguntas frecuentes
          </h1>
          <p className="text-[#6B6B6B]">Todo lo que necesitas saber antes de comprar</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-3">
        {ALL_FAQS.map((item, i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#FCE8EF] overflow-hidden shadow-sm">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-[#FFF0F5] transition-colors"
            >
              <span className="font-semibold text-sm text-[#2D2D2D]">{item.question}</span>
              <CaretDown size={18} className={`text-[#E8336D] shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
            </button>
            {open === i && (
              <div className="px-5 pb-5">
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-[#F9D0DC] rounded-2xl p-8">
          <h2 className="font-semibold text-[#2D2D2D] mb-2">¿No encontraste tu respuesta?</h2>
          <p className="text-sm text-[#6B6B6B] mb-5">Escríbenos por Instagram o WhatsApp y te respondemos al tiro.</p>
          <div className="flex gap-3">
            <a
              href="https://instagram.com/muyviajeraschile"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-sm"
            >
              <InstagramLogo size={16} weight="fill" />
              Instagram
            </a>
            <a
              href="https://wa.me/56900000000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2 text-sm"
            >
              <WhatsappLogo size={16} weight="fill" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
