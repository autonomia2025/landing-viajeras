'use client'

import { useState } from 'react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { Package, MagnifyingGlass, CaretRight, Check } from '@phosphor-icons/react'

type OrderStatus = 'nuevo' | 'preparando' | 'enviado' | 'entregado'

interface MockOrder {
  orderNumber: string
  status: OrderStatus
  createdAt: string
  estimatedDelivery: string
  trackingNumber: string | null
  customer: string
  items: { name: string; quantity: number; price: number }[]
  total: number
  shippingAddress: string
}

const STATUS_STEPS: { key: OrderStatus; label: string; description: string }[] = [
  { key: 'nuevo', label: 'Pedido recibido', description: 'Tu pedido fue confirmado' },
  { key: 'preparando', label: 'Preparando', description: 'Estamos empacando tu pedido con amor' },
  { key: 'enviado', label: 'En camino', description: 'Tu pedido está en camino' },
  { key: 'entregado', label: 'Entregado', description: 'Tu pedido llegó' },
]

const STATUS_ORDER: OrderStatus[] = ['nuevo', 'preparando', 'enviado', 'entregado']

const MOCK_ORDERS: Record<string, MockOrder> = {
  'MV-12345': {
    orderNumber: 'MV-12345',
    status: 'preparando',
    createdAt: '2026-06-24',
    estimatedDelivery: '2026-06-27',
    trackingNumber: null,
    customer: 'María González',
    items: [{ name: 'Organizador de Equipaje Floral', quantity: 1, price: 12990 }],
    total: 16980,
    shippingAddress: 'Las Condes, Santiago',
  },
}

export default function SeguirPedidoPage() {
  const [orderNumber, setOrderNumber] = useState('')
  const [email, setEmail] = useState('')
  const [order, setOrder] = useState<MockOrder | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(false)

  const formatPrice = (n: number) =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setNotFound(false)
    setOrder(null)

    await new Promise((r) => setTimeout(r, 800))

    const found = MOCK_ORDERS[orderNumber.toUpperCase()]
    if (found) {
      setOrder(found)
    } else {
      setNotFound(true)
    }
    setLoading(false)
  }

  const currentStep = order ? STATUS_ORDER.indexOf(order.status) : -1

  return (
    <PublicLayout>
      <div className="min-h-screen bg-[var(--cream)] py-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[var(--pink)] rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-[var(--fuschia)]" />
            </div>
            <h1 className="font-dancing text-4xl font-bold text-[var(--fuschia)] mb-2">Seguir mi pedido</h1>
            <p className="text-gray-500">Ingresa tu número de pedido y email para ver el estado</p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número de pedido</label>
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="Ej: MV-12345"
                  className="input-brand"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">Lo encuentras en el email de confirmación</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="input-brand"
                  required
                />
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2" disabled={loading}>
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <MagnifyingGlass className="w-4 h-4" />
                )}
                {loading ? 'Buscando...' : 'Buscar pedido'}
              </button>
            </div>
          </form>

          {/* Not Found */}
          {notFound && (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center">
              <p className="text-red-600 font-medium">No encontramos tu pedido</p>
              <p className="text-red-400 text-sm mt-1">Verifica el número de pedido y email. Puedes contactarnos por WhatsApp.</p>
            </div>
          )}

          {/* Order Found */}
          {order && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[var(--pink)] to-[var(--cream)] p-6 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Pedido</p>
                    <p className="font-bold text-xl text-[var(--fuschia)]">{order.orderNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-bold text-lg">{formatPrice(order.total)}</p>
                  </div>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="p-6 border-b">
                <div className="relative">
                  <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200" />
                  <div
                    className="absolute top-5 left-5 h-0.5 bg-[var(--fuschia)] transition-all duration-500"
                    style={{ right: `${(STATUS_STEPS.length - 1 - currentStep) * 25}%` }}
                  />
                  <div className="relative flex justify-between">
                    {STATUS_STEPS.map((step, i) => {
                      const completed = i <= currentStep
                      const active = i === currentStep
                      return (
                        <div key={step.key} className="flex flex-col items-center w-1/4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all
                            ${completed ? 'bg-[var(--fuschia)]' : 'bg-gray-200'}
                            ${active ? 'ring-4 ring-[var(--pink)]' : ''}`}>
                            {completed ? (
                              <Check className="w-5 h-5 text-white" />
                            ) : (
                              <span className="text-gray-400 text-sm font-bold">{i + 1}</span>
                            )}
                          </div>
                          <p className={`text-xs font-medium mt-2 text-center ${completed ? 'text-[var(--fuschia)]' : 'text-gray-400'}`}>
                            {step.label}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 mt-4 bg-[var(--cream)] rounded-lg py-2 px-4">
                  {STATUS_STEPS[currentStep]?.description}
                </p>
              </div>

              {/* Details */}
              <div className="p-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Fecha del pedido:</span>
                  <span className="font-medium">{new Date(order.createdAt).toLocaleDateString('es-CL')}</span>
                </div>
                {order.trackingNumber ? (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Número de seguimiento:</span>
                    <span className="font-medium text-[var(--fuschia)]">{order.trackingNumber}</span>
                  </div>
                ) : (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Entrega estimada:</span>
                    <span className="font-medium">{new Date(order.estimatedDelivery).toLocaleDateString('es-CL')}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Dirección:</span>
                  <span className="font-medium">{order.shippingAddress}</span>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Productos:</p>
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm py-1">
                      <span className="text-gray-600">{item.name} × {item.quantity}</span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2 border-t">
                  <a
                    href="https://wa.me/56912345678"
                    className="text-sm text-[var(--fuschia)] font-medium flex items-center gap-1 hover:underline"
                  >
                    ¿Tienes preguntas? WhatsApp <CaretRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  )
}
