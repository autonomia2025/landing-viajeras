'use client'

import { useState } from 'react'
import { Warning, Package, TrendDown, PencilSimple } from '@phosphor-icons/react/dist/ssr'
import { PRODUCTS } from '@/lib/data'
import { formatPrice } from '@/lib/utils'

export default function AdminInventario() {
  const [products, setProducts] = useState([...PRODUCTS])
  const [editing, setEditing] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  const lowStock = products.filter((p) => p.stock <= 5)
  const outOfStock = products.filter((p) => p.stock === 0)
  const totalUnits = products.reduce((s, p) => s + p.stock, 0)
  const totalValue = products.reduce((s, p) => s + p.price * p.stock, 0)

  const saveStock = (id: string) => {
    const val = parseInt(editValue)
    if (!isNaN(val) && val >= 0) {
      setProducts((prev) => prev.map((p) => p.id === id ? { ...p, stock: val } : p))
    }
    setEditing(null)
  }

  return (
    <div className="p-5 sm:p-8 pt-16 lg:pt-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#2D2D2D]">Inventario</h1>
        <p className="text-[#6B6B6B] text-sm mt-1">Control de stock en tiempo real</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Package, label: 'Total unidades', value: totalUnits.toString(), color: 'bg-[#F9D0DC]' },
          { icon: TrendDown, label: 'Valor inventario', value: formatPrice(totalValue), color: 'bg-[#FFF0F5]' },
          { icon: Warning, label: 'Stock bajo (≤5)', value: lowStock.length.toString(), color: 'bg-amber-100', urgent: lowStock.length > 0 },
          { icon: Package, label: 'Agotados', value: outOfStock.length.toString(), color: 'bg-red-100', urgent: outOfStock.length > 0 },
        ].map((s, i) => (
          <div key={i} className={`bg-white rounded-2xl p-4 border-2 ${s.urgent ? 'border-amber-200' : 'border-[#FCE8EF]'}`}>
            <div className={`w-9 h-9 ${s.color} rounded-xl flex items-center justify-center mb-2`}>
              <s.icon size={16} className={s.urgent ? 'text-amber-600' : 'text-[#E8336D]'} />
            </div>
            <p className={`text-xl font-bold ${s.urgent && parseInt(s.value) > 0 ? 'text-amber-600' : 'text-[#2D2D2D]'}`}>{s.value}</p>
            <p className="text-xs text-[#9CA3AF]">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Alerts */}
      {lowStock.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
          <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
            <Warning size={16} /> Productos con stock bajo — reponer pronto
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {lowStock.map((p) => (
              <div key={p.id} className="bg-white rounded-xl p-3 border border-amber-200 text-sm">
                <p className="font-medium text-[#2D2D2D] line-clamp-1">{p.name}</p>
                <p className="text-amber-600 font-bold">Solo {p.stock} uds.</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full inventory table */}
      <div className="bg-white rounded-2xl border border-[#FCE8EF] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#FCE8EF]">
          <h2 className="font-semibold text-[#2D2D2D]">Todos los productos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#FFF8FA] text-xs text-[#9CA3AF] font-semibold uppercase tracking-wide">
                <th className="text-left px-5 py-3.5">Producto</th>
                <th className="text-left px-5 py-3.5">SKU</th>
                <th className="text-left px-5 py-3.5">Categoría</th>
                <th className="text-right px-5 py-3.5">Precio</th>
                <th className="text-center px-5 py-3.5">Stock</th>
                <th className="text-right px-5 py-3.5">Valor total</th>
                <th className="text-center px-5 py-3.5">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FCE8EF]">
              {products.map((p) => (
                <tr key={p.id} className={`hover:bg-[#FFF8FA] transition-colors ${p.stock === 0 ? 'opacity-60' : ''}`}>
                  <td className="px-5 py-3.5 text-sm font-medium text-[#2D2D2D]">{p.name}</td>
                  <td className="px-5 py-3.5 text-xs text-[#9CA3AF] font-mono">{p.sku}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs bg-[#F9D0DC] text-[#E8336D] px-2 py-0.5 rounded-full">{p.category}</span>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-right text-[#2D2D2D]">{formatPrice(p.price)}</td>
                  <td className="px-5 py-3.5 text-center">
                    {editing === p.id ? (
                      <div className="flex items-center justify-center gap-1">
                        <input
                          autoFocus
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => saveStock(p.id)}
                          onKeyDown={(e) => e.key === 'Enter' && saveStock(p.id)}
                          className="w-16 text-center text-sm border border-[#E8336D] rounded-lg py-1 outline-none"
                        />
                      </div>
                    ) : (
                      <button
                        onClick={() => { setEditing(p.id); setEditValue(p.stock.toString()) }}
                        className={`flex items-center justify-center gap-1.5 mx-auto hover:text-[#E8336D] transition-colors ${p.stock <= 5 ? 'text-amber-600' : 'text-[#2D2D2D]'}`}
                      >
                        <span className="font-bold">{p.stock}</span>
                        <PencilSimple size={11} />
                      </button>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-right text-[#6B6B6B]">
                    {formatPrice(p.price * p.stock)}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    {p.stock === 0 ? (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">Agotado</span>
                    ) : p.stock <= 5 ? (
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Stock bajo</span>
                    ) : (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">OK</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
