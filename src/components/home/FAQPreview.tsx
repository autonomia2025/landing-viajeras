'use client'

import Link from 'next/link'
import { useState } from 'react'
import { CaretDown } from '@phosphor-icons/react'
import { FAQ_ITEMS } from '@/lib/data'
import { Reveal } from '@/components/ui/Reveal'

export function FAQPreview() {
  const [open, setOpen] = useState<number | null>(0)
  const preview = FAQ_ITEMS.slice(0, 5)

  return (
    <section className="py-16 sm:py-20 bg-[#FFF8FA]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="mb-10">
            <p className="font-script text-2xl text-[#E8336D] leading-none mb-1">¿dudas?</p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#2D2D2D]">
              Preguntas frecuentes
            </h2>
            <p className="text-[#6B6B6B] text-sm mt-1">Todo lo que necesitas saber antes de comprar</p>
          </div>
        </Reveal>

        <div className="space-y-3">
          {preview.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#FCE8EF] overflow-hidden shadow-[0_2px_8px_rgb(232_51_109/0.04)]"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-[#FFF0F5] transition-colors"
              >
                <span className="font-semibold text-sm text-[#2D2D2D]">{item.question}</span>
                <CaretDown
                  size={18}
                  className={`text-[#E8336D] shrink-0 transition-transform duration-200 ${
                    open === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-4">
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/faq"
            className="text-sm font-semibold text-[#E8336D] hover:text-[#C42059] transition-colors"
          >
            Ver todas las preguntas →
          </Link>
        </div>
      </div>
    </section>
  )
}
