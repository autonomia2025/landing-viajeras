import { PublicLayout } from '@/components/layout/PublicLayout'
import { Hero } from '@/components/home/Hero'
import { Categories } from '@/components/home/Categories'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { KitBanner } from '@/components/home/KitBanner'
import { Benefits } from '@/components/home/Benefits'
import { Reviews } from '@/components/home/Reviews'
import { Newsletter } from '@/components/home/Newsletter'
import { FAQPreview } from '@/components/home/FAQPreview'

export default function HomePage() {
  return (
    <PublicLayout>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <KitBanner />
      <Benefits />
      <Reviews />
      <Newsletter />
      <FAQPreview />
    </PublicLayout>
  )
}
