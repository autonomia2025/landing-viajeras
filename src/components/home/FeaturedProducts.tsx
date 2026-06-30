import Link from 'next/link'
import { PRODUCTS } from '@/lib/data'
import { ProductCard } from '@/components/product/ProductCard'
import { Reveal } from '@/components/ui/Reveal'

export function FeaturedProducts() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 4)

  return (
    <section className="py-16 sm:py-20 bg-[#FFF8FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="flex items-end justify-between mb-10 gap-4">
            <div>
              <p className="font-script text-2xl text-[#E8336D] leading-none mb-1">las más queridas</p>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#2D2D2D]">
                Las favoritas de nuestras viajeras
              </h2>
            </div>
            <Link
              href="/tienda"
              className="hidden sm:inline-flex text-sm font-semibold text-[#E8336D] hover:gap-2.5 transition-all items-center gap-1.5 whitespace-nowrap"
            >
              Ver todos →
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {featured.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.06}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link href="/tienda" className="btn-secondary inline-flex">
            Ver todos los productos →
          </Link>
        </div>
      </div>
    </section>
  )
}
