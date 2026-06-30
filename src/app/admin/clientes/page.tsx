import { MagnifyingGlass, Users, TrendUp, ShoppingBag } from '@phosphor-icons/react/dist/ssr'
import { formatPrice } from '@/lib/utils'

const MOCK_CUSTOMERS = [
  { id: '1', name: 'Camila Torres', email: 'camila@email.com', orders: 5, spent: 89500, lastOrder: '25/06/2026', city: 'Santiago' },
  { id: '2', name: 'Ana García', email: 'ana@email.com', orders: 3, spent: 67800, lastOrder: '25/06/2026', city: 'Valparaíso' },
  { id: '3', name: 'Javiera López', email: 'javiera@email.com', orders: 8, spent: 156900, lastOrder: '24/06/2026', city: 'Concepción' },
  { id: '4', name: 'Valentina Muñoz', email: 'vale@email.com', orders: 2, spent: 22800, lastOrder: '24/06/2026', city: 'Santiago' },
  { id: '5', name: 'Sofía Reyes', email: 'sofia@email.com', orders: 1, spent: 12900, lastOrder: '23/06/2026', city: 'La Serena' },
  { id: '6', name: 'María Fernández', email: 'maria@email.com', orders: 6, spent: 94300, lastOrder: '22/06/2026', city: 'Santiago' },
]

export default function AdminClientes() {
  const total = MOCK_CUSTOMERS.reduce((s, c) => s + c.spent, 0)
  const totalOrders = MOCK_CUSTOMERS.reduce((s, c) => s + c.orders, 0)

  return (
    <div className="p-5 sm:p-8 pt-16 lg:pt-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#2D2D2D]">Clientas</h1>
        <p className="text-[#6B6B6B] text-sm mt-1">{MOCK_CUSTOMERS.length} clientas registradas</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: Users, label: 'Total clientas', value: MOCK_CUSTOMERS.length.toString(), color: 'bg-[#F9D0DC]' },
          { icon: ShoppingBag, label: 'Pedidos totales', value: totalOrders.toString(), color: 'bg-[#FFF0F5]' },
          { icon: TrendUp, label: 'Ingresos totales', value: formatPrice(total), color: 'bg-[#F9D0DC]' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-[#FCE8EF]">
            <div className={`w-9 h-9 ${s.color} rounded-xl flex items-center justify-center mb-2`}>
              <s.icon size={16} className="text-[#E8336D]" />
            </div>
            <p className="text-lg font-bold text-[#2D2D2D]">{s.value}</p>
            <p className="text-xs text-[#9CA3AF]">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#FCE8EF] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#FCE8EF]">
          <div className="relative max-w-xs">
            <MagnifyingGlass size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input placeholder="Buscar clienta..." className="input-brand pl-9 text-sm" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#FFF8FA] text-xs text-[#9CA3AF] font-semibold uppercase tracking-wide">
                <th className="text-left px-5 py-3.5">Clienta</th>
                <th className="text-center px-5 py-3.5">Pedidos</th>
                <th className="text-right px-5 py-3.5">Total gastado</th>
                <th className="text-left px-5 py-3.5">Ciudad</th>
                <th className="text-left px-5 py-3.5">Último pedido</th>
                <th className="text-center px-5 py-3.5">Segmento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FCE8EF]">
              {MOCK_CUSTOMERS.map((c) => {
                const segment = c.spent > 100000 ? 'VIP' : c.spent > 50000 ? 'Fiel' : 'Nueva'
                const segColor = c.spent > 100000 ? 'bg-yellow-100 text-yellow-700' : c.spent > 50000 ? 'bg-[#F9D0DC] text-[#E8336D]' : 'bg-[#FFF0F5] text-[#9CA3AF]'
                return (
                  <tr key={c.id} className="hover:bg-[#FFF8FA] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#F9D0DC] flex items-center justify-center text-sm font-bold text-[#E8336D]">
                          {c.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#2D2D2D]">{c.name}</p>
                          <p className="text-xs text-[#9CA3AF]">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-center text-sm font-semibold text-[#2D2D2D]">{c.orders}</td>
                    <td className="px-5 py-4 text-right text-sm font-bold text-[#E8336D]">{formatPrice(c.spent)}</td>
                    <td className="px-5 py-4 text-sm text-[#6B6B6B]">{c.city}</td>
                    <td className="px-5 py-4 text-xs text-[#9CA3AF]">{c.lastOrder}</td>
                    <td className="px-5 py-4 text-center">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${segColor}`}>{segment}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
