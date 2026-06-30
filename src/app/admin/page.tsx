import { TrendUp, ShoppingBag, Users, Package, Warning, ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { PRODUCTS, REVIEWS } from '@/lib/data'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

const STATS = [
  { label: 'Ventas del mes', value: '$2.340.500', change: '+18%', icon: TrendUp, color: 'bg-[#E8336D]' },
  { label: 'Pedidos pendientes', value: '12', change: '3 nuevos hoy', icon: ShoppingBag, color: 'bg-[#F0A8B5]' },
  { label: 'Clientes totales', value: '1.247', change: '+32 esta semana', icon: Users, color: 'bg-[#F9D0DC]' },
  { label: 'Productos activos', value: `${PRODUCTS.length}`, change: '3 con stock bajo', icon: Package, color: 'bg-[#FFF0F5]' },
]

const RECENT_ORDERS = [
  { id: 'MV-10045', customer: 'Camila Torres', amount: 18900, status: 'enviado', date: '25/06/2026' },
  { id: 'MV-10044', customer: 'Ana García', amount: 34900, status: 'preparando', date: '25/06/2026' },
  { id: 'MV-10043', customer: 'Javiera López', amount: 9900, status: 'pagado', date: '24/06/2026' },
  { id: 'MV-10042', customer: 'Valentina Muñoz', amount: 22800, status: 'entregado', date: '24/06/2026' },
  { id: 'MV-10041', customer: 'Sofía Reyes', amount: 12900, status: 'nuevo', date: '23/06/2026' },
]

const STATUS_STYLES: Record<string, string> = {
  nuevo: 'bg-yellow-100 text-yellow-700',
  pagado: 'bg-green-100 text-green-700',
  preparando: 'bg-blue-100 text-blue-700',
  enviado: 'bg-purple-100 text-purple-700',
  entregado: 'bg-emerald-100 text-emerald-700',
  cancelado: 'bg-red-100 text-red-700',
}

const STATUS_LABELS: Record<string, string> = {
  nuevo: 'Nuevo',
  pagado: 'Pagado',
  preparando: 'Preparando',
  enviado: 'Enviado',
  entregado: 'Entregado',
  cancelado: 'Cancelado',
}

const lowStock = PRODUCTS.filter((p) => p.stock <= 5)

export default function AdminDashboard() {
  return (
    <div className="p-5 sm:p-8 pt-16 lg:pt-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#2D2D2D]">
          Buenos días
        </h1>
        <p className="text-[#6B6B6B] text-sm mt-1">
          Hoy es miércoles 25 de junio de 2026 · Panel de control
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-5 border border-[#FCE8EF] shadow-[0_2px_8px_rgb(232_51_109/0.05)] hover:shadow-[0_4px_16px_rgb(232_51_109/0.1)] transition-shadow"
          >
            <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
              <stat.icon size={18} className={i === 0 ? 'text-white' : 'text-[#E8336D]'} />
            </div>
            <p className="text-2xl font-bold text-[#2D2D2D] mb-0.5">{stat.value}</p>
            <p className="text-xs text-[#9CA3AF]">{stat.label}</p>
            <p className="text-xs text-green-600 font-medium mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Recent orders */}
        <div className="bg-white rounded-2xl border border-[#FCE8EF] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#FCE8EF]">
            <h2 className="font-semibold text-[#2D2D2D]">Pedidos recientes</h2>
            <Link href="/admin/pedidos" className="text-xs text-[#E8336D] font-medium hover:underline flex items-center gap-1">
              Ver todos <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#FFF8FA] text-xs text-[#9CA3AF] font-medium">
                  <th className="text-left px-5 py-3">Pedido</th>
                  <th className="text-left px-5 py-3">Clienta</th>
                  <th className="text-right px-5 py-3">Total</th>
                  <th className="text-left px-5 py-3">Estado</th>
                  <th className="text-left px-5 py-3">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FCE8EF]">
                {RECENT_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-[#FFF8FA] transition-colors">
                    <td className="px-5 py-3.5 text-sm font-semibold text-[#E8336D]">{order.id}</td>
                    <td className="px-5 py-3.5 text-sm text-[#2D2D2D]">{order.customer}</td>
                    <td className="px-5 py-3.5 text-sm font-bold text-[#2D2D2D] text-right">{formatPrice(order.amount)}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[order.status]}`}>
                        {STATUS_LABELS[order.status]}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-[#9CA3AF]">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Best sellers */}
          <div className="bg-white rounded-2xl border border-[#FCE8EF] p-5">
            <h2 className="font-semibold text-[#2D2D2D] mb-4 flex items-center gap-2">
              <TrendUp size={16} className="text-[#E8336D]" /> Más vendidos
            </h2>
            <div className="space-y-3">
              {PRODUCTS.filter((p) => p.featured).slice(0, 4).map((p, i) => (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="text-[#9CA3AF] font-bold text-sm w-4">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#2D2D2D] truncate">{p.name}</p>
                    <p className="text-xs text-[#9CA3AF]">{p.reviewCount} reseñas</p>
                  </div>
                  <span className="text-xs font-bold text-[#E8336D] shrink-0">{formatPrice(p.price)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stock alerts */}
          {lowStock.length > 0 && (
            <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5">
              <h2 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                <Warning size={16} /> Stock bajo
              </h2>
              <div className="space-y-2">
                {lowStock.map((p) => (
                  <div key={p.id} className="flex items-center justify-between text-sm">
                    <span className="text-amber-800 truncate flex-1">{p.name}</span>
                    <span className="text-amber-600 font-bold ml-2 shrink-0">{p.stock} uds.</span>
                  </div>
                ))}
              </div>
              <Link href="/admin/inventario" className="text-xs text-amber-700 font-medium hover:underline mt-3 block">
                Ver inventario →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
