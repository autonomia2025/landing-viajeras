'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  SquaresFour, Package, ShoppingBag, Users, ChartBar,
  Tag, GearSix, FileImage, List, X, AirplaneTilt, ArrowLeft
} from '@phosphor-icons/react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const NAV = [
  { label: 'Dashboard', href: '/admin', icon: SquaresFour, exact: true },
  { label: 'Productos', href: '/admin/productos', icon: Package },
  { label: 'Pedidos', href: '/admin/pedidos', icon: ShoppingBag },
  { label: 'Clientes', href: '/admin/clientes', icon: Users },
  { label: 'Inventario', href: '/admin/inventario', icon: ChartBar },
  { label: 'Descuentos', href: '/admin/descuentos', icon: Tag },
  { label: 'Contenido', href: '/admin/contenido', icon: FileImage },
  { label: 'Configuración', href: '/admin/configuracion', icon: GearSix },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (item: typeof NAV[0]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href)

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[#FCE8EF]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#E8336D] flex items-center justify-center text-white shadow-sm shrink-0">
            <AirplaneTilt size={18} weight="fill" />
          </div>
          <div>
            <p className="font-display text-lg font-bold text-[#2D2D2D] leading-none">Muy Viajeras</p>
            <p className="text-[10px] text-[#E8336D] font-medium tracking-wide">Panel Admin</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV.map((item) => {
          const active = isActive(item)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                active
                  ? 'bg-[#E8336D] text-white shadow-sm'
                  : 'text-[#6B6B6B] hover:bg-[#F9D0DC] hover:text-[#E8336D]'
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-[#FCE8EF]">
        <Link href="/" className="text-xs text-[#9CA3AF] hover:text-[#E8336D] transition-colors flex items-center gap-1.5">
          <ArrowLeft size={12} /> Ver tienda
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-56 flex-col bg-white border-r border-[#FCE8EF] shrink-0 sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      {/* Mobile toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-[#FCE8EF] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#E8336D] flex items-center justify-center text-white">
            <AirplaneTilt size={14} weight="fill" />
          </div>
          <span className="font-display text-base font-bold text-[#2D2D2D]">Admin</span>
        </div>
        <button onClick={() => setOpen(!open)} className="p-2 hover:bg-[#FFF0F5] rounded-lg transition-colors">
          {open ? <X size={20} /> : <List size={20} />}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-56 bg-white shadow-2xl">
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  )
}
