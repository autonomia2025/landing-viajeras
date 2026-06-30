import Image from 'next/image'
import { REVIEWS } from '@/lib/data'
import { StarRating } from '@/components/ui/StarRating'
import { Badge } from '@/components/ui/Badge'
import { Reveal } from '@/components/ui/Reveal'

export function Reviews() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="mb-10">
            <p className="font-script text-2xl text-[#E8336D] leading-none mb-1">testimonios</p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#2D2D2D]">
              Lo que dicen nuestras viajeras
            </h2>
            <div className="flex items-center gap-3 mt-3">
              <StarRating rating={4.9} size="lg" />
              <span className="font-bold text-[#2D2D2D]">4.9</span>
              <span className="text-[#6B6B6B] text-sm">· +500 reseñas verificadas</span>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {REVIEWS.map((review, i) => (
            <Reveal key={review.id} delay={i * 0.06} className="h-full">
              <div className="bg-[#FFF8FA] rounded-2xl p-5 border border-[#FCE8EF] shadow-[0_2px_12px_rgb(232_51_109/0.05)] hover:shadow-[0_8px_24px_-8px_rgb(232_51_109/0.16)] hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-[#F9D0DC] shrink-0">
                  {review.avatar ? (
                    <Image
                      src={review.avatar}
                      alt={review.author}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#E8336D] font-bold text-sm">
                      {review.author[0]}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-sm text-[#2D2D2D] truncate">{review.author}</p>
                    {review.verified && (
                      <Badge variant="success" className="text-[10px] px-2 py-0.5 shrink-0">Verificada</Badge>
                    )}
                  </div>
                  <StarRating rating={review.rating} size="sm" className="mt-0.5" />
                </div>
              </div>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">{review.comment}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
