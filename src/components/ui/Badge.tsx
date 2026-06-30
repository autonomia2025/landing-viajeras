import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface BadgeProps {
  variant?: 'price' | 'new' | 'sale' | 'bestseller' | 'stock' | 'success' | 'neutral'
  children: ReactNode
  className?: string
}

export function Badge({ variant = 'neutral', children, className }: BadgeProps) {
  const base = 'inline-flex items-center font-semibold rounded-full px-3 py-1 text-sm leading-none whitespace-nowrap'

  const variants = {
    price: 'bg-[#E8336D] text-white text-[0.9375rem] font-bold',
    new: 'bg-[#F9D0DC] text-[#E8336D]',
    sale: 'bg-[#E8336D] text-white',
    bestseller: 'bg-[#FFF0F5] text-[#C42059] border border-[#F9D0DC]',
    stock: 'bg-amber-50 text-amber-700 border border-amber-200',
    success: 'bg-green-50 text-green-700 border border-green-200',
    neutral: 'bg-[#FFF8FA] text-[#6B6B6B] border border-[#FCE8EF]',
  }

  return (
    <span className={cn(base, variants[variant], className)}>
      {children}
    </span>
  )
}
