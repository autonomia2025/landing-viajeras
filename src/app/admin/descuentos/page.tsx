'use client'

import { useState } from 'react'
import { Tag, Plus, Trash, Copy, Check } from '@phosphor-icons/react'

interface DiscountCode {
  id: string
  code: string
  type: 'porcentaje' | 'fijo'
  value: number
  minOrder: number
  uses: number
  maxUses: number | null
  active: boolean
  expiresAt: string | null
}

const MOCK_CODES: DiscountCode[] = [
  { id: '1', code: 'VIAJERAS10', type: 'porcentaje', value: 10, minOrder: 0, uses: 47, maxUses: null, active: true, expiresAt: null },
  { id: '2', code: 'BIENVENIDA', type: 'porcentaje', value: 15, minOrder: 20000, uses: 12, maxUses: 100, active: true, expiresAt: '2026-12-31' },
  { id: '3', code: 'VERANO2026', type: 'fijo', value: 5000, minOrder: 30000, uses: 100, maxUses: 100, active: false, expiresAt: '2026-03-31' },
]

export default function AdminDescuentosPage() {
  const [codes, setCodes] = useState<DiscountCode[]>(MOCK_CODES)
  const [showModal, setShowModal] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [form, setForm] = useState({
    code: '',
    type: 'porcentaje' as 'porcentaje' | 'fijo',
    value: '',
    minOrder: '',
    maxUses: '',
    expiresAt: '',
  })

  const formatPrice = (n: number) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n)

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(code)
    setTimeout(() => setCopied(null), 2000)
  }

  const toggleActive = (id: string) => {
    setCodes((c) => c.map((dc) => dc.id === id ? { ...dc, active: !dc.active } : dc))
  }

  const deleteCode = (id: string) => {
    setCodes((c) => c.filter((dc) => dc.id !== id))
  }

  const createCode = () => {
    if (!form.code || !form.value) return
    const newCode: DiscountCode = {
      id: Date.now().toString(),
      code: form.code.toUpperCase(),
      type: form.type,
      value: parseInt(form.value),
      minOrder: parseInt(form.minOrder) || 0,
      uses: 0,
      maxUses: form.maxUses ? parseInt(form.maxUses) : null,
      active: true,
      expiresAt: form.expiresAt || null,
    }
    setCodes((c) => [newCode, ...c])
    setShowModal(false)
    setForm({ code: '', type: 'porcentaje', value: '', minOrder: '', maxUses: '', expiresAt: '' })
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--pink)] rounded-xl flex items-center justify-center">
            <Tag className="w-5 h-5 text-[var(--fuschia)]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Descuentos</h1>
            <p className="text-sm text-gray-500">Códigos de descuento y promociones</p>
          </div>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Nuevo código
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-xs text-gray-500">Códigos activos</p>
          <p className="text-2xl font-bold text-[var(--fuschia)]">{codes.filter((c) => c.active).length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-xs text-gray-500">Usos totales</p>
          <p className="text-2xl font-bold">{codes.reduce((s, c) => s + c.uses, 0)}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-xs text-gray-500">Expirados / Agotados</p>
          <p className="text-2xl font-bold text-amber-500">{codes.filter((c) => !c.active || (c.maxUses && c.uses >= c.maxUses)).length}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left">Código</th>
              <th className="px-4 py-3 text-left">Descuento</th>
              <th className="px-4 py-3 text-left">Mínimo</th>
              <th className="px-4 py-3 text-left">Usos</th>
              <th className="px-4 py-3 text-left">Vence</th>
              <th className="px-4 py-3 text-left">Estado</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {codes.map((dc) => (
              <tr key={dc.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[var(--fuschia)] bg-[var(--pink)] px-2 py-0.5 rounded text-xs">
                      {dc.code}
                    </span>
                    <button
                      onClick={() => copyCode(dc.code)}
                      className="text-gray-400 hover:text-[var(--fuschia)] transition-colors"
                    >
                      {copied === dc.code ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 font-medium">
                  {dc.type === 'porcentaje' ? `${dc.value}%` : formatPrice(dc.value)}
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {dc.minOrder > 0 ? `Mín. ${formatPrice(dc.minOrder)}` : 'Sin mínimo'}
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {dc.uses}{dc.maxUses ? `/${dc.maxUses}` : ''}
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {dc.expiresAt ? new Date(dc.expiresAt).toLocaleDateString('es-CL') : 'Sin vencimiento'}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleActive(dc.id)}
                    className={`text-xs font-medium px-2 py-1 rounded-full transition-colors
                      ${dc.active ? 'bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-700' : 'bg-gray-100 text-gray-500 hover:bg-green-100 hover:text-green-700'}`}
                  >
                    {dc.active ? 'Activo' : 'Inactivo'}
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => deleteCode(dc.id)} className="text-red-400 hover:text-red-600">
                    <Trash className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold mb-4">Nuevo código de descuento</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Código</label>
                <input
                  className="input-brand mt-1 uppercase"
                  placeholder="VIAJERAS10"
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Tipo</label>
                  <select
                    className="input-brand mt-1"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value as 'porcentaje' | 'fijo' })}
                  >
                    <option value="porcentaje">Porcentaje (%)</option>
                    <option value="fijo">Monto fijo ($)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Valor</label>
                  <input
                    className="input-brand mt-1"
                    type="number"
                    placeholder={form.type === 'porcentaje' ? '10' : '5000'}
                    value={form.value}
                    onChange={(e) => setForm({ ...form, value: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Mínimo de compra</label>
                  <input
                    className="input-brand mt-1"
                    type="number"
                    placeholder="0"
                    value={form.minOrder}
                    onChange={(e) => setForm({ ...form, minOrder: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Usos máx.</label>
                  <input
                    className="input-brand mt-1"
                    type="number"
                    placeholder="Sin límite"
                    value={form.maxUses}
                    onChange={(e) => setForm({ ...form, maxUses: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Fecha de vencimiento</label>
                <input
                  className="input-brand mt-1"
                  type="date"
                  value={form.expiresAt}
                  onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancelar</button>
                <button onClick={createCode} className="btn-primary flex-1">Crear código</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
