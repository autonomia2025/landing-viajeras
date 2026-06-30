import type { Metadata, Viewport } from 'next'
import { Fraunces, Parisienne, Outfit } from 'next/font/google'
import './globals.css'

// Serif display — elegant, editorial headlines (replaces the generic cursive)
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

// Refined script — used ONLY for small accents/flourishes
const parisienne = Parisienne({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-parisienne',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Muy Viajeras Chile — Accesorios de Viaje Femeninos',
    template: '%s | Muy Viajeras Chile',
  },
  description:
    'Todo lo que necesitas para viajar cómoda, organizada y con estilo. Accesorios de viaje femeninos con envío a todo Chile.',
  keywords: [
    'accesorios de viaje',
    'viajera',
    'organizadores de maleta',
    'porta pasaporte',
    'neceser viaje',
    'chile',
    'girly',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Muy Viajeras Chile',
  },
}

export const viewport: Viewport = {
  themeColor: '#E8336D',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${fraunces.variable} ${parisienne.variable} ${outfit.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  )
}
