'use client'

import { useState } from 'react'
import { MagnifyingGlass, CaretDown } from '@phosphor-icons/react'
import { formatPrice } from '@/lib/utils'

type OrderStatus = 'nuevo' | 'pagado' | 'preparando' | 'enviado' | 'entregado' | 'cancelado'

const MOCK_ORDERS = [
  { id: 'MV-10045', customer: 'Camila Torres', email: 'camila@email.com', items: 2, amount: 18900, status: 'enviado' as OrderStatus, date: '25/06/2026', payment: 'MercadoPago' },
  { id: 'MV-10044', customer: 'Ana García', email: 'ana@email.com', items: 4, amount: 34900, status: 'preparando' as OrderStatus, date: '25/06/2026', payment: 'Webpay' },
  { id: 'MV-10043', customer: 'Javiera López', email: 'javiera@email.com', items: 1, amount: 9900, status: 'pagado' as OrderStatus, date: '24/06/2026', payment: 'MercadoPago' },
  { id: 'MV-10042', customer: 'Valentina Muñoz', email: 'vale@email.com', items: 3, amount: 22800, status: 'entregado' as OrderStatus, date: '24/06/2026', payment: 'Transferencia' },
  { id: 'MV-10041', customer: 'Sofía Reyes', email: 'sofia@email.com', items: 1, amount: 12900, status: 'nuevo' as OrderStatus, date: '23/06/2026', payment: 'MercadoPago' },
  { id: 'MV-10040', customer: 'María Fernández', email: 'maria@email.com', items: 2, amount: 15800, status: 'cancelado' as OrderStatus, date: '22/06/2026', payment: 'Webpay' },
]

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; next?: OrderStatus }> = {
  nuevo: { label: 'Nuevo', color: 'bg-yellow-100 text-yellow-700', next: 'pagado' },
  pagado: { label: 'Pagado', color: 'bg-green-100 text-green-700', next: 'preparando' },
  preparando: { label: 'Preparando', color: 'bg-blue-100 text-blue-700', next: 'enviado' },
  enviado: { label: 'Enviado', color: 'bg-purple-100 text-purple-700', next: 'entregado' },
  entregado: { label: 'Entregado', color: 'bg-emerald-100 text-emerald-700' },
  cancelado: { label: 'Cancelado', color: 'bg-red-100 text-red-700' },
}

export default function AdminPedidos() {
  const [orders, setOrders] = useState(MOCK_ORDERS)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('todos')

  const filtered = orders.filter((o) => {
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'todos' || o.status === filterStatus
    return matchSearch && matchStatus
  })

  const advanceStatus = (id: string) => {
    setOrders((prev) => prev.map((o) => {
      if (o.id !== id) return o
      const next = STATUS_CONFIG[o.status].next
      return next ? { ...o, status: next } : o
    }))
  }

  return (
    <div className="p-5 sm:p-8 pt-16 lg:pt-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#2D2D2D]">Pedidos</h1>
        <p className="text-[#6B6B6B] text-sm mt-1">{orders.length} pedidos totales</p>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
        {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
          const count = orders.filter((o) => o.status === key).length
          return (
            <button
              key={key}
              onClick={() => setFilterStatus(filterStatus === key ? 'todos' : key)}
              className={`rounded-xl p-3 text-center border-2 transition-all ${
                filterStatus === key ? 'border-[#E8336D] shadow-sm' : 'border-[#FCE8EF] bg-white hover:border-[#F9D0DC]'
              }`}
            >
              <p className="text-xl font-bold text-[#2D2D2D]">{count}</p>
              <p className="text-[10px] text-[#6B6B6B] capitalize">{key}</p>
            </button>
          )
        })}
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-[#FCE8EF] p-4 mb-5 flex gap-3">
        <div className="relative flex-1">
          <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por cliente o número de pedido..." className="input-brand pl-9" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#FCE8EF] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#FFF8FA] text-xs text-[#9CA3AF] font-semibold uppercase tracking-wide">
                <th className="text-left px-5 py-3.5">Pedido</th>
                <th className="text-left px-5 py-3.5">Clienta</th>
                <th className="text-center px-5 py-3.5">Ítems</th>
                <th className="text-right px-5 py-3.5">Total</th>
                <th className="text-left px-5 py-3.5">Pago</th>
                <th className="text-left px-5 py-3.5">Estado</th>
                <th className="text-left px-5 py-3.5">Fecha</th>
                <th className="text-center px-5 py-3.5">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FCE8EF]">
              {filtered.map((order) => {
                const cfg = STATUS_CONFIG[order.status]
                return (
                  <tr key={order.id} className="hover:bg-[#FFF8FA] transition-colors">
                    <td className="px-5 py-4 text-sm font-bold text-[#E8336D]">{order.id}</td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-[#2D2D2D]">{order.customer}</p>
                      <p className="text-xs text-[#9CA3AF]">{order.email}</p>
                    </td>
                    <td className="px-5 py-4 text-center text-sm text-[#6B6B6B]">{order.items}</td>
                    <td className="px-5 py-4 text-right text-sm font-bold text-[#2D2D2D]">{formatPrice(order.amount)}</td>
                    <td className="px-5 py-4 text-xs text-[#6B6B6B]">{order.payment}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${cfg.color}`}>{cfg.label}</span>
                    </td>
                    <td className="px-5 py-4 text-xs text-[#9CA3AF]">{order.date}</td>
                    <td className="px-5 py-4 text-center">
                      {cfg.next && (
                        <button
                          onClick={() => advanceStatus(order.id)}
                          className="text-xs text-[#E8336D] font-medium hover:underline"
                        >
                          → {cfg.next}
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-10 text-[#9CA3AF] text-sm">Sin pedidos que coincidan</div>
        )}
      </div>
    </div>
  )
}
