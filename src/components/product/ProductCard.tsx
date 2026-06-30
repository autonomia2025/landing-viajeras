'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Heart, Check, Lightning } from '@phosphor-icons/react/dist/ssr'
import { useState, useEffect } from 'react'
import type { Product } from '@/types'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { StarRating } from '@/components/ui/StarRating'
import { useCartStore } from '@/lib/store'
import { useWishlistStore } from '@/lib/wishlistStore'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const [adding, setAdding] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { addItem } = useCartStore()
  const { toggle: toggleWishlist, has } = useWishlistStore()
  const wishlisted = mounted && has(product.id)

  useEffect(() => { setMounted(true) }, [])

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setAdding(true)
    addItem(product)
    await new Promise((r) => setTimeout(r, 600))
    setAdding(false)
  }

  const discount = product.compareAtPrice
    ? calculateDiscount(product.price, product.compareAtPrice)
    : null

  return (
    <Link
      href={`/producto/${product.slug}`}
      className={`group relative bg-white rounded-2xl overflow-hidden border border-[#FCE8EF] shadow-[0_2px_12px_rgb(232_51_109/0.06)] hover:shadow-[0_8px_24px_rgb(232_51_109/0.14)] hover:-translate-y-1 transition-all duration-200 flex flex-col ${className}`}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[#FFF0F5]">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {product.isNew && (
            <Badge variant="new" className="text-xs px-2.5 py-0.5">Nuevo</Badge>
          )}
          {discount && (
            <Badge variant="sale" className="text-xs px-2.5 py-0.5">-{discount}%</Badge>
          )}
          {product.featured && !product.isNew && (
            <Badge variant="bestseller" className="text-xs px-2.5 py-0.5">Favorito</Badge>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product) }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Guardar"
        >
          <Heart
            size={15}
            weight={wishlisted ? 'fill' : 'regular'}
            className={wishlisted ? 'text-[#E8336D]' : 'text-[#6B6B6B]'}
          />
        </button>

        {/* Quick add overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
          <button
            onClick={handleAddToCart}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              adding
                ? 'bg-green-500 text-white'
                : 'bg-[#E8336D] text-white hover:bg-[#C42059]'
            }`}
          >
            {adding ? (
              <>
                <Check size={15} weight="bold" /> Agregado
              </>
            ) : (
              <>
                <ShoppingBag size={15} /> Agregar
              </>
            )}
          </button>
        </div>

        {/* Stock warning */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-amber-500/90 text-white text-[10px] font-medium text-center py-1 flex items-center justify-center gap-1">
            <Lightning size={10} weight="fill" /> Solo quedan {product.stock}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3.5 flex flex-col flex-1">
        <p className="text-xs text-[#6B6B6B] mb-1">{product.category}</p>
        <h3 className="text-sm font-semibold text-[#2D2D2D] leading-snug mb-2 flex-1 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        {product.reviewCount > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <StarRating rating={product.rating} size="sm" />
            <span className="text-xs text-[#9CA3AF]">({product.reviewCount})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mt-auto">
          <Badge variant="price">{formatPrice(product.price)}</Badge>
          {product.compareAtPrice && (
            <span className="text-xs text-[#9CA3AF] line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
