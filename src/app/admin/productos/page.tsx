'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Plus, MagnifyingGlass, PencilSimple, Trash, Eye, ToggleLeft, ToggleRight, X, Link as LinkIcon, ArrowUp, ArrowDown } from '@phosphor-icons/react'
import { PRODUCTS } from '@/lib/data'
import { formatPrice } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Product } from '@/types'

export default function AdminProductos() {
  const [products, setProducts] = useState([...PRODUCTS])
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [formImages, setFormImages] = useState<string[]>([''])
  const [newImageUrl, setNewImageUrl] = useState('')

  useEffect(() => {
    if (showForm) {
      setFormImages(editing?.images?.length ? [...editing.images] : [''])
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [showForm, editing])

  const addImageUrl = () => {
    const trimmed = newImageUrl.trim()
    if (!trimmed) return
    setFormImages((prev) => [...prev, trimmed])
    setNewImageUrl('')
  }

  const removeImage = (idx: number) => {
    setFormImages((prev) => prev.filter((_, i) => i !== idx))
  }

  const moveImage = (idx: number, dir: -1 | 1) => {
    setFormImages((prev) => {
      const next = [...prev]
      const swap = idx + dir
      if (swap < 0 || swap >= next.length) return prev
      ;[next[idx], next[swap]] = [next[swap], next[idx]]
      return next
    })
  }

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  const toggleFeatured = (id: string) => {
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, featured: !p.featured } : p))
  }

  return (
    <div className="p-5 sm:p-8 pt-16 lg:pt-8">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#2D2D2D]">Productos</h1>
          <p className="text-[#6B6B6B] text-sm mt-1">{products.length} productos en la tienda</p>
        </div>
        <Button variant="primary" size="md" onClick={() => { setEditing(null); setShowForm(true) }}>
          <Plus size={16} /> Nuevo producto
        </Button>
      </div>

      {/* Search + filters */}
      <div className="bg-white rounded-2xl border border-[#FCE8EF] p-4 mb-6 flex gap-3 items-center flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar producto..."
            className="input-brand pl-9"
          />
        </div>
        <p className="text-xs text-[#9CA3AF]">{filtered.length} resultados</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#FCE8EF] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#FFF8FA] text-xs text-[#9CA3AF] font-semibold uppercase tracking-wide">
                <th className="text-left px-5 py-3.5">Producto</th>
                <th className="text-left px-5 py-3.5">Categoría</th>
                <th className="text-right px-5 py-3.5">Precio</th>
                <th className="text-center px-5 py-3.5">Stock</th>
                <th className="text-center px-5 py-3.5">Destacado</th>
                <th className="text-center px-5 py-3.5">Estado</th>
                <th className="text-right px-5 py-3.5">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FCE8EF]">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-[#FFF8FA] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#F9D0DC] shrink-0">
                        <Image src={product.images[0]} alt={product.name} width={40} height={40} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#2D2D2D] line-clamp-1">{product.name}</p>
                        <p className="text-xs text-[#9CA3AF]">SKU: {product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs bg-[#F9D0DC] text-[#E8336D] px-2.5 py-1 rounded-full font-medium">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <p className="text-sm font-bold text-[#2D2D2D]">{formatPrice(product.price)}</p>
                    {product.compareAtPrice && (
                      <p className="text-xs text-[#9CA3AF] line-through">{formatPrice(product.compareAtPrice)}</p>
                    )}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`text-sm font-bold ${product.stock <= 5 ? 'text-amber-600' : 'text-[#2D2D2D]'}`}>
                      {product.stock}
                    </span>
                    {product.stock <= 5 && (
                      <p className="text-[10px] text-amber-500">Bajo</p>
                    )}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <button onClick={() => toggleFeatured(product.id)} className="transition-colors">
                      {product.featured
                        ? <ToggleRight size={24} className="text-[#E8336D]" />
                        : <ToggleLeft size={24} className="text-[#9CA3AF]" />
                      }
                    </button>
                  </td>
                  <td className="px-5 py-4 text-center">
                    {product.stock > 0
                      ? <Badge variant="success" className="text-xs">Activo</Badge>
                      : <Badge variant="stock" className="text-xs">Agotado</Badge>
                    }
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <a href={`/producto/${product.slug}`} target="_blank" className="p-2 hover:bg-[#FFF0F5] rounded-lg transition-colors" title="Ver en tienda">
                        <Eye size={15} className="text-[#6B6B6B]" />
                      </a>
                      <button onClick={() => { setEditing(product); setShowForm(true) }} className="p-2 hover:bg-[#FFF0F5] rounded-lg transition-colors" title="Editar">
                        <PencilSimple size={15} className="text-[#6B6B6B]" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar">
                        <Trash size={15} className="text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[92vh] flex flex-col shadow-2xl">
            {/* Sticky header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#FCE8EF] shrink-0">
              <h2 className="font-semibold text-[#2D2D2D]">
                {editing ? 'Editar producto' : 'Nuevo producto'}
              </h2>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-[#FFF0F5] rounded-full transition-colors text-[#6B6B6B]">
                <X size={18} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1">
              <form id="product-form" className="p-6 space-y-5" onSubmit={(e) => { e.preventDefault(); setShowForm(false) }}>

                {/* Basic info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-xs font-semibold text-[#6B6B6B] mb-1.5 block">Nombre del producto *</label>
                    <input className="input-brand" defaultValue={editing?.name} placeholder="Ej: Set Organizadores x6" required />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#6B6B6B] mb-1.5 block">Precio *</label>
                    <input className="input-brand" type="number" defaultValue={editing?.price} placeholder="18900" required />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#6B6B6B] mb-1.5 block">Precio tachado</label>
                    <input className="input-brand" type="number" defaultValue={editing?.compareAtPrice} placeholder="24900" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#6B6B6B] mb-1.5 block">Stock *</label>
                    <input className="input-brand" type="number" defaultValue={editing?.stock} placeholder="15" required />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#6B6B6B] mb-1.5 block">SKU</label>
                    <input className="input-brand" defaultValue={editing?.sku} placeholder="ORG-001" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-semibold text-[#6B6B6B] mb-1.5 block">Descripción</label>
                    <textarea className="input-brand h-24 resize-none" defaultValue={editing?.description} placeholder="Descripción del producto..." />
                  </div>
                </div>

                {/* Images section */}
                <div>
                  <label className="text-xs font-semibold text-[#6B6B6B] mb-2 block">Imágenes del producto</label>

                  {/* Current images */}
                  {formImages.filter(Boolean).length > 0 && (
                    <div className="space-y-2 mb-3">
                      {formImages.filter(Boolean).map((url, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-[#FFF8FA] border border-[#FCE8EF] rounded-xl p-2">
                          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[#F9D0DC]">
                            <Image
                              src={url}
                              alt={`Imagen ${idx + 1}`}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                            />
                          </div>
                          <p className="text-xs text-[#6B6B6B] flex-1 truncate">{url}</p>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => moveImage(idx, -1)}
                              disabled={idx === 0}
                              className="p-1 hover:bg-[#FFF0F5] rounded-lg transition-colors disabled:opacity-30"
                              title="Subir"
                            >
                              <ArrowUp size={13} className="text-[#6B6B6B]" />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveImage(idx, 1)}
                              disabled={idx === formImages.filter(Boolean).length - 1}
                              className="p-1 hover:bg-[#FFF0F5] rounded-lg transition-colors disabled:opacity-30"
                              title="Bajar"
                            >
                              <ArrowDown size={13} className="text-[#6B6B6B]" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeImage(formImages.indexOf(url))}
                              className="p-1 hover:bg-red-50 rounded-lg transition-colors"
                              title="Eliminar"
                            >
                              <X size={13} className="text-red-400" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add new image URL */}
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                      <input
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addImageUrl() } }}
                        placeholder="https://images.unsplash.com/..."
                        className="input-brand pl-8 text-sm"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={addImageUrl}
                      disabled={!newImageUrl.trim()}
                      className="shrink-0 px-3 py-2 bg-[#F9D0DC] text-[#E8336D] rounded-xl font-semibold text-sm hover:bg-[#F0A8B5] transition-colors disabled:opacity-40"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <p className="text-[10px] text-[#9CA3AF] mt-1.5">La primera imagen es la principal. Arrastra para reordenar usando las flechas.</p>
                </div>

              </form>
            </div>

            {/* Sticky footer */}
            <div className="flex gap-3 px-6 py-4 border-t border-[#FCE8EF] shrink-0">
              <Button type="button" variant="secondary" size="md" onClick={() => setShowForm(false)}>Cancelar</Button>
              <Button form="product-form" type="submit" variant="primary" size="full">
                {editing ? 'Guardar cambios' : 'Crear producto'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
