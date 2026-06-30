'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { ProductCard } from '@/components/product/ProductCard'
import { PRODUCTS, CATEGORIES } from '@/lib/data'
import { X } from '@phosphor-icons/react'

const SORT_OPTIONS = [
  { label: 'Más vendidos', value: 'bestseller' },
  { label: 'Novedades', value: 'new' },
  { label: 'Precio: menor a mayor', value: 'price-asc' },
  { label: 'Precio: mayor a menor', value: 'price-desc' },
]

function TiendaContent() {
  const searchParams = useSearchParams()
  const catParam = searchParams.get('cat') ?? 'todas'

  const [selectedCat, setSelectedCat] = useState<string>(catParam)
  const [sort, setSort] = useState('bestseller')

  // Keep state in sync when navigating from a category link
  useEffect(() => {
    setSelectedCat(catParam)
  }, [catParam])

  const activeCat = CATEGORIES.find((c) => c.slug === selectedCat)

  const filtered = useMemo(() => {
    let list = [...PRODUCTS]
    if (selectedCat !== 'todas') {
      list = list.filter((p) => p.categorySlug === selectedCat)
    }
    switch (sort) {
      case 'new':
        list = list.filter((p) => p.isNew).concat(list.filter((p) => !p.isNew))
        break
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }
    return list
  }, [selectedCat, sort])

  return (
    <>
      {/* Header */}
      <div className="relative bg-gradient-to-br from-[#FFF0F5] via-[#F9D0DC] to-[#FFE0EC] py-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, #E8336D 1.2px, transparent 1.2px)',
            backgroundSize: '26px 26px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <p className="font-script text-3xl text-[#E8336D] leading-none mb-2">
            {activeCat ? activeCat.name.toLowerCase() : 'nuestra colección'}
          </p>
          <h1 className="font-display text-5xl sm:text-6xl font-semibold text-[#2D2D2D] mb-3">
            {activeCat ? activeCat.name : 'Toda la tienda'}
          </h1>
          <p className="text-[#6B6B6B]">
            {filtered.length} {filtered.length === 1 ? 'producto' : 'productos'} para tu próximo viaje
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Controls */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          {/* Category chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 flex-1 -mx-1 px-1">
            <button
              onClick={() => setSelectedCat('todas')}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                selectedCat === 'todas'
                  ? 'bg-[#E8336D] text-white border-[#E8336D] shadow-sm'
                  : 'bg-white text-[#6B6B6B] border-[#FCE8EF] hover:border-[#F0A8B5]'
              }`}
            >
              Todas
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCat(cat.slug)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  selectedCat === cat.slug
                    ? 'bg-[#E8336D] text-white border-[#E8336D] shadow-sm'
                    : 'bg-white text-[#6B6B6B] border-[#FCE8EF] hover:border-[#F0A8B5]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="input-brand w-auto text-sm pr-8 cursor-pointer shrink-0"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Active filter tag */}
        {selectedCat !== 'todas' && (
          <div className="flex items-center gap-2 mb-5">
            <span className="text-sm text-[#6B6B6B]">Filtrando por:</span>
            <button
              onClick={() => setSelectedCat('todas')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F9D0DC] text-[#E8336D] text-sm font-medium rounded-full hover:bg-[#F0A8B5] transition-colors"
            >
              {activeCat?.name}
              <X size={13} />
            </button>
          </div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-[#F9D0DC] flex items-center justify-center mx-auto mb-4">
              <X size={28} className="text-[#E8336D]" />
            </div>
            <p className="font-semibold text-[#2D2D2D] mb-1">Sin productos en esta categoría</p>
            <p className="text-sm text-[#6B6B6B] mb-5">Pronto sumaremos más novedades aquí</p>
            <button
              onClick={() => setSelectedCat('todas')}
              className="btn-primary inline-flex text-sm"
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default function TiendaPage() {
  return (
    <PublicLayout>
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <TiendaContent />
      </Suspense>
    </PublicLayout>
  )
}
