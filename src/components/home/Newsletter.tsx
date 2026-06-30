'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { EnvelopeSimple, CheckCircle } from '@phosphor-icons/react'
import { Reveal } from '@/components/ui/Reveal'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section className="py-16 sm:py-20 bg-[#FFF8FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
        <div className="relative bg-gradient-to-br from-[#F9D0DC] to-[#FFE0EC] rounded-3xl px-6 sm:px-12 py-12 sm:py-16 overflow-hidden">
          {/* Background decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#F0A8B5]/40 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#E8336D]/10 blur-2xl" />

          <div className="relative z-10 max-w-lg">
            <div className="w-14 h-14 bg-[#E8336D] rounded-2xl flex items-center justify-center text-white mb-5 shadow-md">
              <EnvelopeSimple size={24} weight="bold" />
            </div>

            {submitted ? (
              <div className="fade-in">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle size={28} weight="fill" className="text-[#E8336D] shrink-0" />
                  <h2 className="section-title text-4xl sm:text-5xl">
                    Bienvenida a la comunidad
                  </h2>
                </div>
                <p className="text-[#6B6B6B]">
                  Ya eres parte de la comunidad de viajeras. Pronto recibirás tu 10% de descuento.
                </p>
              </div>
            ) : (
              <>
                <p className="font-script text-2xl text-[#E8336D] leading-none mb-1">hola viajera</p>
                <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#2D2D2D] mb-3">
                  Únete a la comunidad de viajeras
                </h2>
                <p className="text-[#6B6B6B] mb-2 text-sm sm:text-base">
                  Recibe novedades, tips de viaje y ofertas exclusivas directo en tu correo.
                </p>
                <p className="text-[#E8336D] font-semibold text-sm mb-7">
                  + 10% de descuento en tu primera compra
                </p>
                <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    className="input-brand flex-1 bg-white"
                  />
                  <Button type="submit" variant="primary" size="md" loading={loading}>
                    Unirme
                  </Button>
                </form>
                <p className="text-xs text-[#9CA3AF] mt-3">Sin spam. Puedes darte de baja cuando quieras.</p>
              </>
            )}
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  )
}
