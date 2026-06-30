import Link from 'next/link'
import { InstagramLogo, WhatsappLogo, EnvelopeSimple, MapPin, Package, AirplaneTilt } from '@phosphor-icons/react/dist/ssr'

const SHOP_LINKS = [
  { label: 'Organizadores de maleta', href: '/tienda/organizadores' },
  { label: 'Porta pasaportes', href: '/tienda/porta-pasaportes' },
  { label: 'Neceseres', href: '/tienda/neceseres' },
  { label: 'Kits Viajeros', href: '/kits' },
  { label: 'Biblioteca Viajera', href: '/tienda/biblioteca-viajera' },
]

const HELP_LINKS = [
  { label: 'Preguntas frecuentes', href: '/faq' },
  { label: 'Envíos y devoluciones', href: '/faq#envios' },
  { label: 'Seguir mi pedido', href: '/seguir-pedido' },
  { label: 'Contáctanos', href: '/contacto' },
  { label: 'Sobre nosotras', href: '/sobre-nosotras' },
]

export function Footer() {
  return (
    <footer className="bg-[#FFF0F5] border-t border-[#FCE8EF] mt-20">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#E8336D] flex items-center justify-center text-white shadow-sm">
                <AirplaneTilt size={18} weight="fill" />
              </div>
              <div>
                <span className="font-display text-2xl font-bold text-[#2D2D2D] block leading-none">
                  Muy Viajeras
                </span>
                <span className="text-[10px] font-semibold text-[#E8336D] tracking-widest uppercase">
                  Chile
                </span>
              </div>
            </div>
            <p className="text-sm text-[#6B6B6B] leading-relaxed mb-5">
              Todo lo que necesitas para viajar cómoda, organizada y con estilo.
              Hecho con amor desde Chile para viajeras como tú.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/muyviajeraschile"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#E8336D] flex items-center justify-center text-white hover:bg-[#C42059] transition-colors shadow-sm"
                aria-label="Instagram"
              >
                <InstagramLogo size={16} weight="fill" />
              </a>
              <a
                href="https://wa.me/56900000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white hover:bg-[#1fb659] transition-colors shadow-sm"
                aria-label="WhatsApp"
              >
                <WhatsappLogo size={16} weight="fill" />
              </a>
              <a
                href="mailto:hola@muyviajeraschile.cl"
                className="w-9 h-9 rounded-full bg-[#F9D0DC] flex items-center justify-center text-[#E8336D] hover:bg-[#F0A8B5] transition-colors"
                aria-label="Email"
              >
                <EnvelopeSimple size={16} weight="bold" />
              </a>
            </div>
          </div>

          {/* Tienda */}
          <div>
            <h3 className="font-semibold text-[#2D2D2D] mb-4 flex items-center gap-2">
              <Package size={16} className="text-[#E8336D]" />
              Tienda
            </h3>
            <ul className="space-y-2.5">
              {SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6B6B6B] hover:text-[#E8336D] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h3 className="font-semibold text-[#2D2D2D] mb-4">Ayuda</h3>
            <ul className="space-y-2.5">
              {HELP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6B6B6B] hover:text-[#E8336D] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold text-[#2D2D2D] mb-4">Información</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-[#6B6B6B]">
                <MapPin size={15} className="text-[#E8336D] shrink-0 mt-0.5" />
                <span>Retiro en Ñuñoa, Santiago.<br />Lun–Vie 10:00–18:00</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-[#6B6B6B]">
                <Package size={15} className="text-[#E8336D] shrink-0 mt-0.5" />
                <span>Envíos a todo Chile vía Blue Express con número de seguimiento</span>
              </div>
            </div>
            <div className="mt-5 p-3 bg-white rounded-xl border border-[#FCE8EF]">
              <p className="text-xs text-[#6B6B6B]">Pagos seguros con</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs font-semibold bg-[#009EE3] text-white px-2 py-0.5 rounded">MercadoPago</span>
                <span className="text-xs font-semibold bg-[#003087] text-white px-2 py-0.5 rounded">Webpay</span>
                <span className="text-xs font-semibold bg-[#2D2D2D] text-white px-2 py-0.5 rounded">TF</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#FCE8EF] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#9CA3AF]">
          <span>© 2026 Muy Viajeras Chile. Con amor desde Chile.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacidad" className="hover:text-[#E8336D] transition-colors">Privacidad</Link>
            <Link href="/terminos" className="hover:text-[#E8336D] transition-colors">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
