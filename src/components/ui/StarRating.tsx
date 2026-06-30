import { Star } from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function StarRating({ rating, max = 5, size = 'md', className }: StarRatingProps) {
  const sizes = { sm: 12, md: 14, lg: 16 }
  const px = sizes[size]

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={px}
          weight={i < Math.floor(rating) ? 'fill' : i < rating ? 'duotone' : 'regular'}
          className={i < rating ? 'text-amber-400' : 'text-gray-200'}
        />
      ))}
    </div>
  )
}
