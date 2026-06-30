'use client'

import { useState } from 'react'
import { GearSix, FloppyDisk, Check, Warning, CreditCard, EnvelopeSimple, Package } from '@phosphor-icons/react/dist/ssr'

interface Config {
  storeName: string
  storeEmail: string
  whatsapp: string
  address: string
  freeShippingThreshold: string
  shippingCost: string
  mpAccessToken: string
  mpPublicKey: string
  blueExpressKey: string
  resendKey: string
}

export default function AdminConfiguracionPage() {
  const [saved, setSaved] = useState(false)
  const [config, setConfig] = useState<Config>({
    storeName: 'Muy Viajeras Chile',
    storeEmail: 'hola@muyviajeraschile.com',
    whatsapp: '+56912345678',
    address: 'Ñuñoa, Santiago, Chile',
    freeShippingThreshold: '25000',
    shippingCost: '3990',
    mpAccessToken: '',
    mpPublicKey: '',
    blueExpressKey: '',
    resendKey: '',
  })

  const update = (key: keyof Config, value: string) => setConfig((c) => ({ ...c, [key]: value }))

  const handleSave = () => {
    // In production: POST to /api/admin/config
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--pink)] rounded-xl flex items-center justify-center">
            <GearSix className="w-5 h-5 text-[var(--fuschia)]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Configuración</h1>
            <p className="text-sm text-gray-500">Ajustes de la tienda y credenciales</p>
          </div>
        </div>
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          {saved ? <><Check className="w-4 h-4" /> Guardado</> : <><FloppyDisk className="w-4 h-4" /> Guardar</>}
        </button>
      </div>

      <div className="space-y-6">
        {/* Store Info */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Package className="w-4 h-4 text-[var(--fuschia)]" /> Información de la tienda
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Nombre de la tienda</label>
                <input className="input-brand mt-1" value={config.storeName} onChange={(e) => update('storeName', e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email de contacto</label>
                <input className="input-brand mt-1" type="email" value={config.storeEmail} onChange={(e) => update('storeEmail', e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">WhatsApp</label>
                <input className="input-brand mt-1" value={config.whatsapp} onChange={(e) => update('whatsapp', e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Dirección</label>
                <input className="input-brand mt-1" value={config.address} onChange={(e) => update('address', e.target.value)} />
              </div>
            </div>
          </div>
        </section>

        {/* Shipping */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Package className="w-4 h-4 text-[var(--fuschia)]" /> Envíos
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Umbral de envío gratis (CLP)</label>
              <input
                className="input-brand mt-1"
                type="number"
                value={config.freeShippingThreshold}
                onChange={(e) => update('freeShippingThreshold', e.target.value)}
              />
              <p className="text-xs text-gray-400 mt-1">Pedidos sobre este monto tienen envío gratis</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Costo de envío (CLP)</label>
              <input
                className="input-brand mt-1"
                type="number"
                value={config.shippingCost}
                onChange={(e) => update('shippingCost', e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* MercadoPago */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[var(--fuschia)]" /> MercadoPago
            </h2>
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full flex items-center gap-1">
              <Warning className="w-3 h-3" /> No configurado
            </span>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-4">
            <p className="text-sm text-amber-800">
              Para activar MercadoPago necesitas crear una cuenta en{' '}
              <a href="https://www.mercadopago.cl" target="_blank" rel="noopener noreferrer" className="underline font-medium">
                mercadopago.cl
              </a>{' '}
              y obtener tus credenciales desde el panel de desarrolladores.
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Access Token (privado)</label>
              <input
                className="input-brand mt-1 font-mono text-sm"
                type="password"
                placeholder="APP_USR-..."
                value={config.mpAccessToken}
                onChange={(e) => update('mpAccessToken', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Public Key</label>
              <input
                className="input-brand mt-1 font-mono text-sm"
                placeholder="APP_USR-..."
                value={config.mpPublicKey}
                onChange={(e) => update('mpPublicKey', e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Blue Express */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2">
              <Package className="w-4 h-4 text-[var(--fuschia)]" /> Blue Express (Envíos)
            </h2>
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full flex items-center gap-1">
              <Warning className="w-3 h-3" /> No configurado
            </span>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">API Key</label>
            <input
              className="input-brand mt-1 font-mono text-sm"
              type="password"
              placeholder="Ingresa tu API key de Blue Express"
              value={config.blueExpressKey}
              onChange={(e) => update('blueExpressKey', e.target.value)}
            />
          </div>
        </section>

        {/* Resend (Emails) */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2">
              <EnvelopeSimple className="w-4 h-4 text-[var(--fuschia)]" /> Emails (Resend)
            </h2>
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full flex items-center gap-1">
              <Warning className="w-3 h-3" /> No configurado
            </span>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Resend API Key</label>
            <input
              className="input-brand mt-1 font-mono text-sm"
              type="password"
              placeholder="re_..."
              value={config.resendKey}
              onChange={(e) => update('resendKey', e.target.value)}
            />
            <p className="text-xs text-gray-400 mt-1">Para emails de confirmación y notificaciones de pedidos</p>
          </div>
        </section>

        <div className="flex justify-end">
          <button onClick={handleSave} className="btn-primary flex items-center gap-2">
            {saved ? <><Check className="w-4 h-4" /> ¡Guardado!</> : <><FloppyDisk className="w-4 h-4" /> Guardar configuración</>}
          </button>
        </div>
      </div>
    </div>
  )
}
