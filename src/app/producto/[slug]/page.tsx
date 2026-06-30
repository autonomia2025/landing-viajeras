'use client'

import { use, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ShoppingBag, Minus, Plus, CaretDown, Check, Truck, ShieldCheck,
  ArrowCounterClockwise, Heart, Lightning, CaretRight,
} from '@phosphor-icons/react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { ProductCard } from '@/components/product/ProductCard'
import { StarRating } from '@/components/ui/StarRating'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { PRODUCTS, REVIEWS } from '@/lib/data'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { useCartStore } from '@/lib/store'
import { useWishlistStore } from '@/lib/wishlistStore'

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const product = PRODUCTS.find((p) => p.slug === slug)
  if (!product) notFound()

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0])
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>('descripcion')
  const [mounted, setMounted] = useState(false)
  const { addItem } = useCartStore()
  const { toggle: toggleWishlist, has } = useWishlistStore()
  const wishlisted = mounted && has(product.id)

  useEffect(() => { setMounted(true) }, [])

  const productReviews = REVIEWS.filter((r) => r.productId === product.id)
  const related = PRODUCTS.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4)
  const discount = product.compareAtPrice ? calculateDiscount(product.price, product.compareAtPrice) : null
  const lowStock = product.stock <= 5 && product.stock > 0
  const freeShipping = product.price >= 25000

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(product, selectedVariant)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const accordionSections = [
    {
      id: 'descripcion',
      title: 'Descripción del producto',
      content: <p className="text-sm text-[#6B6B6B] leading-relaxed">{product.description}</p>,
    },
    {
      id: 'envio',
      title: 'Envío y devoluciones',
      content: (
        <div className="text-sm text-[#6B6B6B] space-y-2">
          <p><strong className="text-[#2D2D2D]">Envío a todo Chile</strong> vía Blue Express en 2–5 días hábiles.</p>
          <p><strong className="text-[#2D2D2D]">Envío gratis</strong> en compras sobre $25.000.</p>
          <p><strong className="text-[#2D2D2D]">Cambios</strong> dentro de 10 días, sin uso y con empaque original.</p>
          <p><strong className="text-[#2D2D2D]">Producto dañado</strong>: lo reponemos. Punto.</p>
        </div>
      ),
    },
    {
      id: 'garantia',
      title: 'Garantía y confianza',
      content: (
        <div className="text-sm text-[#6B6B6B] space-y-2">
          <p>Todos nuestros productos son verificados antes del despacho.</p>
          <p>Las fotos son del producto real, no renders ni ediciones engañosas.</p>
          <p>Si algo no está bien, nos escribes y lo solucionamos. Siempre.</p>
        </div>
      ),
    },
  ]

  const TRUST_SIGNALS = [
    { Icon: Truck, text: 'Envío a todo Chile' },
    { Icon: ShieldCheck, text: 'Compra segura' },
    { Icon: ArrowCounterClockwise, text: 'Garantía incluida' },
  ]

  return (
    <PublicLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[#9CA3AF] mb-6 flex-wrap">
          <Link href="/" className="hover:text-[#E8336D] transition-colors">Inicio</Link>
          <CaretRight size={11} />
          <Link href="/tienda" className="hover:text-[#E8336D] transition-colors">Tienda</Link>
          <CaretRight size={11} />
          <Link href={`/tienda?cat=${product.categorySlug}`} className="hover:text-[#E8336D] transition-colors">{product.category}</Link>
          <CaretRight size={11} />
          <span className="text-[#2D2D2D] truncate max-w-[150px]">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">
          {/* Gallery */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-3">
            <div className="group relative aspect-square rounded-3xl overflow-hidden bg-[#FFF0F5] shadow-[0_12px_40px_-12px_rgb(232_51_109/0.2)]">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 90vw, 45vw"
                priority
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {discount && (
                  <span className="bg-[#E8336D] text-white text-sm font-bold px-3 py-1 rounded-full shadow-sm">-{discount}%</span>
                )}
                {product.isNew && (
                  <span className="bg-white text-[#E8336D] text-xs font-bold px-3 py-1 rounded-full shadow-sm">Nuevo</span>
                )}
              </div>
              {lowStock && (
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  <Lightning size={12} weight="fill" /> Solo {product.stock}
                </div>
              )}
              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product)}
                aria-label="Guardar en favoritos"
                className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:scale-110 transition-transform"
              >
                <Heart size={20} weight={wishlisted ? 'fill' : 'regular'} className="text-[#E8336D]" />
              </button>
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2.5">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                      selectedImage === i ? 'border-[#E8336D] scale-105' : 'border-[#FCE8EF] hover:border-[#F0A8B5]'
                    }`}
                  >
                    <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <p className="font-script text-2xl text-[#E8336D] leading-none mb-1">{product.category.toLowerCase()}</p>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#2D2D2D] leading-[1.1] mb-3">
                {product.name}
              </h1>

              {product.reviewCount > 0 && (
                <a href="#resenas" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <StarRating rating={product.rating} size="md" />
                  <span className="text-sm font-semibold text-[#2D2D2D]">{product.rating}</span>
                  <span className="text-sm text-[#6B6B6B]">({product.reviewCount} reseñas)</span>
                </a>
              )}
            </div>

            {/* Price */}
            <div className="flex items-end gap-3">
              <span className="font-display text-4xl font-semibold text-[#E8336D] leading-none">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <div className="pb-0.5">
                  <span className="text-sm text-[#9CA3AF] line-through block leading-none">{formatPrice(product.compareAtPrice)}</span>
                  <span className="text-xs text-green-600 font-semibold">Ahorras {formatPrice(product.compareAtPrice - product.price)}</span>
                </div>
              )}
            </div>

            {freeShipping && (
              <div className="inline-flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-100 px-3 py-1.5 rounded-full">
                <Truck size={15} weight="fill" /> Este producto califica para envío gratis
              </div>
            )}

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-[#2D2D2D] mb-2">
                  {product.variants[0].name}: <span className="font-normal text-[#6B6B6B]">{selectedVariant?.value}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-2 rounded-full text-sm border-2 font-medium transition-all ${
                        selectedVariant?.id === variant.id
                          ? 'bg-[#E8336D] text-white border-[#E8336D]'
                          : 'bg-white text-[#6B6B6B] border-[#FCE8EF] hover:border-[#F0A8B5]'
                      }`}
                    >
                      {variant.value}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to cart */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white border border-[#FCE8EF] rounded-full px-2 py-1.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center hover:text-[#E8336D] transition-colors rounded-full"
                    aria-label="Disminuir cantidad"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center hover:text-[#E8336D] transition-colors rounded-full"
                    aria-label="Aumentar cantidad"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className={`text-xs font-medium ${lowStock ? 'text-amber-600' : 'text-green-600'}`}>
                  {product.stock > 5 ? '● En stock' : `● Solo quedan ${product.stock}`}
                </span>
              </div>

              <Button onClick={handleAddToCart} variant="primary" size="full" className="text-base py-4">
                {added ? (
                  <><Check size={18} weight="bold" /> Agregado al carrito</>
                ) : (
                  <><ShoppingBag size={18} weight="fill" /> Agregar al carrito · {formatPrice(product.price * quantity)}</>
                )}
              </Button>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-3 py-4 border-y border-[#FCE8EF]">
              {TRUST_SIGNALS.map(({ Icon, text }, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-1.5">
                  <div className="w-10 h-10 rounded-xl bg-[#F9D0DC] flex items-center justify-center">
                    <Icon size={18} weight="fill" className="text-[#E8336D]" />
                  </div>
                  <span className="text-[10px] text-[#6B6B6B] font-medium leading-tight">{text}</span>
                </div>
              ))}
            </div>

            {/* Accordion */}
            <div className="space-y-2">
              {accordionSections.map((section) => (
                <div key={section.id} className="border border-[#FCE8EF] rounded-2xl overflow-hidden bg-white">
                  <button
                    onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                    className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-semibold text-[#2D2D2D] hover:bg-[#FFF0F5] transition-colors"
                  >
                    {section.title}
                    <CaretDown
                      size={16}
                      className={`text-[#E8336D] transition-transform ${openSection === section.id ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openSection === section.id && <div className="px-4 pb-4">{section.content}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews section */}
        {productReviews.length > 0 && (
          <div id="resenas" className="mt-20 scroll-mt-24">
            <Reveal>
              <p className="font-script text-2xl text-[#E8336D] leading-none mb-1">opiniones reales</p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#2D2D2D] mb-6">Reseñas del producto</h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {productReviews.map((review, i) => (
                <Reveal key={review.id} delay={i * 0.06} className="h-full">
                  <div className="bg-white rounded-2xl p-5 border border-[#FCE8EF] h-full">
                    <StarRating rating={review.rating} className="mb-2" />
                    <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">{review.comment}</p>
                    <p className="text-xs font-semibold text-[#2D2D2D]">— {review.author}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20">
            <Reveal>
              <p className="font-script text-2xl text-[#E8336D] leading-none mb-1">combina con</p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#2D2D2D] mb-6">
                También te puede gustar
              </h2>
            </Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.05}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  )
}
